import { ref, reactive, onBeforeMount, watch, computed, unref } from 'vue';
import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

import { STATS_URL, CORRECT_CHAIN, VERSION_0, VALID_VERSIONS } from '@/constants/constants';
import CoinsRegistry from '@pontem/coins-registry';
import { is_sorted } from '@/utils/utils';
import { IPoolBase, IPersistedPool, IPoolInfo } from '@/types/pools';
import { IStorageBasic, TVersionType } from '@/types';
import { getCurve, getResourcesAccount, getContractVersionFromCurve } from '@/utils/contracts';

import {
  getPoolLpInfoStr,
  getPoolLpStr,
  getPoolStr,
  getTitleForPool,
  destructCoinStorePoolStr,
} from '@/utils/pools';

import { useStore } from './useStore';

interface IStorage extends IStorageBasic {
  pools: IPersistedPool[];
}

type Resource<T = any> = {
  type: string;
  data: T;
};

export const usePoolsStore = defineStore('poolsStore', () => {
  const mainStore = useStore();
  const { client: aptos } = mainStore;
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
  const poolsStorage = useStorage<IStorage>(
    'pontemPools',
    { pools: [], version: 1 },
    window.localStorage,
    { writeDefaults: true },
  );

  /**
   * Storage for all loaded pools
   */
  const pools = ref<IPersistedPool[]>([]);

  async function fetchPoolsList() {
    const pools = CoinsRegistry.getPoolsFor(CORRECT_CHAIN);
    registerPools(pools);
    fetchAndFillAPRs();
  }

  async function fetchAndFillAPRs() {
    const response = await fetch(`${STATS_URL}/api/apr`);
    let json;
    try {
      json = await response.json();
    } catch (e) {
      throw new Error('Bad json');
    }
    for (let index = 0; index < json.data?.length; index++) {
      const one = json.data[index] as {
        alias: { pair: string; curve: string };
        apr: number;
      };
      const { pair } = one.alias;
      let { curve } = one.alias;
      curve = curve.toLowerCase();
      const coins = pair.split('-');
      for (let i = 0; i < 2; i++) {
        if (['USDT', 'USDC', 'BTC', 'WETH', 'SOL'].includes(coins[i])) {
          coins[i] = `wh${coins[i]}`;
        }
        if (coins[i].indexOf('z') === 0) {
          coins[i] = coins[i].substring(1);
        }
      }
      const directTitle = `${coins[0]}/${coins[1]}-${curve}`;
      const reverseTitle = `${coins[1]}/${coins[0]}-${curve}`;
      const { apr } = one;
      [directTitle, reverseTitle].forEach((start) => {
        VALID_VERSIONS.forEach((end) => {
          const poolTitleKey = `${start}-${end}`;
          if (poolsTitleMap[poolTitleKey] !== undefined) {
            poolsMap[poolsTitleMap[poolTitleKey]].apr = apr;
          }
        });
      });
    }
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
    const resources = await aptos.getAccountResources(
      mainStore.account.value.address,
    );
    resources.forEach((element: any) => {
      if (
        element.type.indexOf('::stake::') !== -1 ||
        element.type.indexOf('lp_coin') === -1
      )
        return;
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
      poolsMap[poolStr].lp = +element.data.coin.value;
    });
  }

  /**
   * Persist pools list with added reserves only
   *
   * @param _pools
   * @param canClean
   * @returns
   */
  function persistToStorage(
    _pools: Record<string, IPersistedPool>,
    canClean?: boolean,
  ) {
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

    const response = await aptos.getAccountResource(
      resourceAccount,
      liquidityPool,
    ) as unknown as Promise<Resource | undefined> | any;

    if (!response) return;

    pool.reserveX = +response.data.coin_x_reserve.value;
    pool.reserveY = +response.data.coin_y_reserve.value;
  }

  async function fetchLp(lpCoin: string, pool: IPersistedPool, contract?: TVersionType) {
    try {
      const resourcesAccount = getResourcesAccount(contract);
      const response = await aptos.getAccountResource(
        resourcesAccount,
        lpCoin,
      )  as unknown as Promise<Resource | undefined> | any;

      if (!response || !response?.data?.supply?.vec[0]) return;

      pool.lp = +response.data.supply.vec[0].integer.vec[0].value;
    } catch (_e) {
      // mute error if there is no lp token found
    }
  }

  const loadPool = async (pool: IPersistedPool) => {
    const { coinX, coinY, curve, contract } = pool;
    const curveStable = getCurve('stable', contract);
    const curveType =
      curve === 'stable' || curve === curveStable
        ? curveStable
        : getCurve('uncorrelated', contract);

    const liquidityPool = getPoolStr(coinX, coinY, curveType, contract);
    const lpCoinInfo = getPoolLpInfoStr(getPoolLpStr(coinX, coinY, curveType, contract));
    await Promise.all([
      fetchReserves(liquidityPool, pool, contract),
      fetchLp(lpCoinInfo, pool, contract),
    ]);
    return pool;
  };

  async function registerPool(
    pool: IPoolBase,
    { rewrite = false, isDefault = false, lazy = true },
  ) {
    const { coinX, coinY, curve, networkId, contract = VERSION_0 } = pool as IPoolInfo;

    const isSorted = is_sorted(coinX, coinY);
    const [sortedX, sortedY] = isSorted ? [coinX, coinY] : [coinY, coinX];

    const curveType = ['stable', 'uncorrelated'].includes(curve)
      ? curve === 'stable'
        ? getCurve('stable', contract)
        : getCurve('uncorrelated', contract)
      : curve;

    const liquidityPool = getPoolStr(sortedX, sortedY, curveType, contract);
    if (!rewrite && poolsMap[liquidityPool]) {
      return poolsMap[liquidityPool];
    }

    if (isDefault && ['stable', 'uncorrelated'].includes(curve)) {
      predefinedCurves[curve as 'stable' | 'uncorrelated'].add(
        `${sortedX}-${sortedY}`,
      );
    }

    const title = getTitleForPool(sortedX, sortedY, curve, contract);
    const persistedPool: IPersistedPool = reactive({
      title,
      coinX: sortedX,
      coinY: sortedY,
      curve,
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
  function registerPools(list: IPoolInfo[]): void {
    if (!list || !Array.isArray(list)) return;
    const registerPoolOptions = { rewrite: true, isDefault: true };

    // register pools, if it is with selectable curve - register both pools
    list.map((poolInfo: IPoolInfo) => {
      const { coinX, coinY, curve, contract = VERSION_0 } = poolInfo;
      const curves =
        curve === 'selectable' ? ['stable', 'uncorrelated'] : [curve];

      for (const curveType of curves) {
        registerPool(
          {
            coinX,
            coinY,
            curve: curveType,
            contract,
          } as IPoolBase,
          registerPoolOptions,
        );
      }
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
  const getPool = computed(
    () =>
      async (
        coinX: string,
        coinY: string,
        curve: string,
        contract?: TVersionType,
      ): Promise<IPersistedPool> => {
        const liquidityPool = getPoolStr(coinX, coinY, curve, contract);
        let registeredPool = poolsMap[liquidityPool];
        if (!registeredPool) {
          const mainStore = useStore();
          const { networkId } = mainStore;
          registeredPool = await registerPool(
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
          );
        }
        return registeredPool;
      },
  );

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
  function getCurveType(
    coinX?: string,
    coinY?: string,
    version?: TVersionType,
  ): string | false {
    if (!coinX || !coinY) return false;
    const [sortedX, sortedY] = is_sorted(coinX, coinY)
      ? [coinX, coinY]
      : [coinY, coinX];
    const tokenPair = `${sortedX}-${sortedY}`;
    return predefinedCurves.stable.has(tokenPair)
      ? getCurve('stable', version)
      : predefinedCurves.uncorrelated.has(tokenPair)
        ? getCurve('uncorrelated', version)
        : false;
  }

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
  };
});
