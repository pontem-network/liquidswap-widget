import { Ref, reactive, watch } from 'vue';

import { ICreateToken, IPoolExist, TVersionType } from '@/types';
import { useStore } from '@/store';
import { VERSION_0, VERSION_0_5 } from '@/constants/constants';
import { getShortCurveFromFull } from '@/utils/contracts';

type CurveType = 'stable' | 'uncorrelated';

interface IPoolExistence {
  exists: boolean;
  isFetching: boolean;
}

function getPoolExistenceKey(params: IPoolExist, contract?: number) {
  return `${params.fromCoin}|${params.toCoin}|${params.curve}|${contract}`;
}

const poolExistenceMap = reactive<Record<string, IPoolExistence>>({});

export function usePoolExistence() {
  const mainStore = useStore();
  const sdk = mainStore.sdk;

  function getPoolExistenceEntity(params: IPoolExist, contract?: number) {
    const poolExistenceKey = getPoolExistenceKey(params, contract);

    return poolExistenceMap[poolExistenceKey] ?? {};
  }

  function poolExists(params: IPoolExist, contract?: number) {
    return getPoolExistenceEntity(params, contract).exists;
  }

  function isFetching(params: IPoolExist, contract?: number) {
    return getPoolExistenceEntity(params, contract).isFetching;
  }

  async function checkExistence(params: IPoolExist, contract?: number) {
    const poolExistenceKey = getPoolExistenceKey(params, contract);

    if (!poolExistenceMap[poolExistenceKey]) {
      poolExistenceMap[poolExistenceKey] = {
        exists: false,
        isFetching: false,
      };
    }

    poolExistenceMap[poolExistenceKey].isFetching = true;

    const shortCurve = getShortCurveFromFull(params.curve);
    const res = await sdk.value.Swap.getLiquidityPoolResource({
      fromToken: params.fromCoin,
      toToken: params.toCoin,
      curveType: shortCurve as CurveType,
      version: contract == VERSION_0 ? VERSION_0 : VERSION_0_5,
    });

    poolExistenceMap[poolExistenceKey].isFetching = false;
    return !!res.liquidityPoolResource;
  }

  async function check(params: IPoolExist, contract?: number) {
    const poolExistenceKey = getPoolExistenceKey(params, contract);

    if (!poolExistenceMap[poolExistenceKey]) {
      poolExistenceMap[poolExistenceKey] = {
        exists: false,
        isFetching: false,
      };
    }
    const res = await checkExistence(params, contract);
    poolExistenceMap[poolExistenceKey].exists = res;
  }

  function reset(params: IPoolExist, contract?: number) {
    const poolExistenceKey = getPoolExistenceKey(params, contract);

    if (!poolExistenceMap[poolExistenceKey]) {
      poolExistenceMap[poolExistenceKey] = {
        exists: false,
        isFetching: false,
      };
    }

    poolExistenceMap[poolExistenceKey].exists = false;
  }

  function watchChanges(
    from: ICreateToken,
    to: ICreateToken,
    curve: Ref<CurveType>,
    version: Ref<TVersionType>,
  ) {
    watch(
      [from.token, to.token, curve.value, version.value],
      async () => {
        if (!from.token || !to.token) {
          reset(
            {
              fromCoin: from.token ?? '',
              toCoin: to.token ?? '',
              curve: curve.value,
            },
            version?.value,
          );
        } else {
          await check(
            {
              fromCoin: from.token,
              toCoin: to.token,
              curve: curve.value,
            },
            version.value,
          );
        }
      },
      {
        immediate: true,
      },
    );
  }

  return {
    isFetching,
    poolExists,
    check,
    watch: watchChanges,
    reset,
  };
}
