import { ref, reactive, onBeforeMount, watch, computed, unref } from 'vue';
import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

import { CORRECT_CHAIN_ID } from '@/constants/constants';
import { is_sorted } from '@/utils/utils';
import { IPoolBase, IPersistedPool, IPoolInfo } from '@/types/pools';
import { IStorageBasic, TVersionType } from '@/types';
import { getCurve, getResourcesAccount, getContractVersionFromCurve } from '@/utils/contracts';

import { getPoolLpInfoStr, getPoolLpStr, getPoolStr, getTitleForPool, destructCoinStorePoolStr } from '@/utils/pools';

import { useStore } from './useStore';
import { CurveType } from '@pontem/liquidswap-sdk/dist/tsc/types/aptos';
import { getRegisteredPools } from '@/api/helpers';
import {Pool} from "@/api/types";

interface IStorage extends IStorageBasic {
  pools: IPersistedPool[];
}

type Resource<T = any> = {
  type: string;
  data: T;
};

export const usePoolsStore = defineStore('poolsStore', () => {
  const mainStore = useStore();
  const { client: aptos, sdk } = mainStore;
  const isLoading = ref(true);
  const poolsMap = reactive<Record<string, IPersistedPool>>({});
  const poolsTitleMap = reactive<Record<string, string>>({});
  const isReady = ref(false);
  const predefinedCurves = {
    stable: new Set<string>(),
    uncorrelated: new Set<string>(),
  };

  /**
   * To store added reserves
   */
  const poolsStorage = useStorage<IStorage>('pontemPools', { pools: [], version: 1 }, window.localStorage, { writeDefaults: true });

  /**
   * Storage for all loaded pools
   */
  const pools = ref<IPersistedPool[]>([]);

  async function fetchPoolsList() {
    const pools = await getRegisteredPools({ networkId: CORRECT_CHAIN_ID });

    if (!pools) {
      return;
    }

    registerPools(pools);

  }

  onBeforeMount(() => loadFromLocalStorage());

  /**
   * Load pools with added reserves from localStorage
   *
   * @returns
   */
  async function loadFromLocalStorage() {
    if (poolsStorage.value) {
      try {
        const { pools } = poolsStorage.value;
        if (!pools) return;

        for (const pool of pools) {
          // load only coins which can be persisted
          if (pool.addedX > 0 || pool.addedY > 0) {
            await loadPool(pool);
          }
        }
        isReady.value = true;
      } catch (_e) {
        //
      }
    }
  }

  async function fetchAccountLps() {
    if (!mainStore.account.value?.address) return;

    const { networkId } = mainStore;
    const resources = await aptos.getAccountResources(mainStore.account.value.address);
    resources.forEach((element: any) => {
      if (element.type.indexOf('::stake::') !== -1 || element.type.indexOf('lp_coin') === -1) return;
      const [coinX, coinY, curveType] = destructCoinStorePoolStr(element.type);
      const lpVersion = getContractVersionFromCurve(curveType);
      const poolStr = getPoolStr(coinX, coinY, curveType, lpVersion);
      if (!poolsMap[poolStr]) {
        registerPool(
          {
            coinX,
            coinY,
            curve: curveType,
            networkId: unref(networkId),
            contract: lpVersion,
          },
          {},
        );
      }

      if (poolsMap[poolStr]) {
        poolsMap[poolStr].lp = +element.data.coin.value;
      }
    });
  }

  /**
   * Persist pools list with added reserves only
   *
   * @param _pools
   * @param canClean
   * @returns
   */
  function persistToStorage(_pools: Record<string, IPersistedPool>, canClean?: boolean) {
    const persistingKeys = Object.keys(_pools).filter((key) => {
      return _pools[key].addedX > 0 || _pools[key].addedY > 0;
    });
    if (!canClean && persistingKeys.length == 0) return;
    let { version } = poolsStorage.value;
    // TODO: make an update logic while stored coins structure will be updated
    version = version ?? '1';
    poolsStorage.value = {
      version,
      pools: persistingKeys.map((key) => _pools[key]),
    };
  }

  watch(poolsMap, (_poolsMap) => persistToStorage(_poolsMap));

  async function fetchReserves(liquidityPool: string, pool: IPersistedPool, contract?: TVersionType) {
    const resourceAccount = getResourcesAccount(contract);

    const response = (await aptos.getAccountResource(resourceAccount, liquidityPool)) as unknown as Promise<Resource | undefined> | any;

    if (!response) return;

    pool.reserveX = +response.data.coin_x_reserve.value;
    pool.reserveY = +response.data.coin_y_reserve.value;
  }

  async function fetchLp(lpCoin: string, pool: IPersistedPool, contract?: TVersionType) {
    try {
      const resourcesAccount = getResourcesAccount(contract);
      const response = (await aptos.getAccountResource(resourcesAccount, lpCoin)) as unknown as Promise<Resource | undefined> | any;

      if (!response || !response?.data?.supply?.vec[0]) return;

      pool.lp = +response.data.supply.vec[0].integer.vec[0].value;
    } catch (_e) {
      // mute error if there is no lp token found
    }
  }

  const loadPool = async (pool: IPersistedPool) => {
    const { coinX, coinY, curve, contract } = pool;
    const curveStable = getCurve('stable', contract);
    const curveType = curve === 'stable' || curve === curveStable ? curveStable : getCurve('unstable', contract);

    const liquidityPool = getPoolStr(coinX, coinY, curveType, contract);
    const lpCoinInfo = getPoolLpInfoStr(getPoolLpStr(coinX, coinY, curveType, contract));
    await Promise.all([fetchReserves(liquidityPool, pool, contract), fetchLp(lpCoinInfo, pool, contract)]);
    return pool;
  };

  async function registerPool(pool: IPoolBase, { rewrite = false, isDefault = false, lazy = true }) {
    const { coinX, coinY, curve, networkId, contract } = pool as IPoolInfo;

    const isSorted = is_sorted(coinX, coinY);
    const [sortedX, sortedY] = isSorted ? [coinX, coinY] : [coinY, coinX];

    const curveType = ['stable', 'uncorrelated'].includes(curve)
      ? curve === 'stable'
        ? getCurve('stable', contract)
        : getCurve('unstable', contract)
      : curve;

    const liquidityPool = getPoolStr(sortedX, sortedY, curveType, contract);

    let isPoolExist = false;
    try {
      const response = await sdk.value.Swap.getLiquidityPoolResource({
        fromToken: sortedX,
        toToken: sortedY,
        curveType: curve as CurveType,
        version: contract,
      });
      if (response && response.liquidityPoolResource) {
        isPoolExist = true;
      }
    } catch (e) {
      console.error('Error loading the pool:', e);
    }

    /**
     * If the pool does not exist in the resource account,
     * then we don't need to register it.
     */
    if (!isPoolExist) {
      return undefined;
    }
    if (!rewrite && poolsMap[liquidityPool]) {
      return poolsMap[liquidityPool];
    }

    if (isDefault && ['stable', 'uncorrelated'].includes(curve)) {
      predefinedCurves[curve as 'stable' | 'uncorrelated'].add(`${sortedX}-${sortedY}-${contract}`);
    }

    const title = getTitleForPool(sortedX, sortedY);
    const persistedPool: IPersistedPool = reactive({
      title,
      coinX: sortedX,
      coinY: sortedY,
      curve: curveType,
      reserveX: 0,
      reserveY: 0,
      addedX: 0,
      addedY: 0,
      lp: 0,
      networkId,
      isDefault,
      contract,
    });

    poolsMap[liquidityPool] = persistedPool;
    const poolTitleKey = `${title}-${curve}-${contract}`;
    poolsTitleMap[poolTitleKey] = liquidityPool;

    if (lazy) {
      loadPool(persistedPool);
    } else {
      await loadPool(persistedPool);
    }
    return persistedPool;
  }

  /**
   * Load pools list in memory to get data about pools
   *
   * @param list
   */
  function registerPools(list: Pool[]): void {
    if (!list || !Array.isArray(list)) return;
    const registerPoolOptions = { rewrite: true, isDefault: true };
    const { networkId } = mainStore;

    // pools has 'stable' and remapped 'uncorrelated' curve from coin-registry
    list.map((poolInfo: Pool) => {
      const { coinX, coinY, curve, version } = poolInfo;
      registerPool(
        {
          coinX: coinX.type,
          coinY: coinY.type,
          curve,
          networkId: networkId.value,
          contract: Number(version),
        } as IPoolBase,
        registerPoolOptions,
      );
    });

    fetchAccountLps();
  }

  /**
   * Get registered pool or register-fetch data and return it
   *
   * @param coinX string
   * @param coinY string
   * @param curve string
   * @returns Promise<IPersistedPool>
   */
  const getPool = computed(() => async (coinX: string, coinY: string, curve: string, contract?: TVersionType): Promise<IPersistedPool> => {
    const liquidityPool = getPoolStr(coinX, coinY, curve, contract);
    let registeredPool = poolsMap[liquidityPool];
    if (!registeredPool) {
      const { networkId } = mainStore;
      registeredPool = (await registerPool(
        {
          coinX,
          coinY,
          curve,
          networkId: networkId.value,
          contract,
        },
        {
          rewrite: true,
          lazy: false,
        },
      )) as IPersistedPool;
    }
    return registeredPool;
  });

  const defaultPools = computed(() =>
    Object.keys(poolsMap)
      .filter((key) => poolsMap[key].isDefault)
      .map((key) => poolsMap[key]),
  );

  /**
   * Check whether this pair is in default pools and gets its type
   *
   * @param coinX
   * @param coinY
   * @param version - version of pools
   * @returns correct curve with correct moduleAddress according to version
   */
  function getCurveType(coinX?: string, coinY?: string, version?: number): string | false {
    if (!coinX || !coinY) return false;
    const [sortedX, sortedY] = is_sorted(coinX, coinY) ? [coinX, coinY] : [coinY, coinX];
    const tokenPair = `${sortedX}-${sortedY}-${version}`;
    return predefinedCurves.stable.has(tokenPair)
      ? getCurve('stable', version)
      : predefinedCurves.uncorrelated.has(tokenPair)
      ? getCurve('unstable', version)
      : false;
  }

  const poolsMapAsArray = computed(() => Object.values(poolsMap));

  return {
    isLoading,
    isReady,

    getPool,
    getCurveType,

    fetchPoolsList,
    pools,
    poolsMap,
    poolsTitleMap,
    defaultPools,
    poolsMapAsArray,
  };
});
