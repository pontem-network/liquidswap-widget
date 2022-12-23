import { Ref, ref, watch } from 'vue';

import { ICreateToken, IPoolExist } from '@/types';
import { useStore } from "@/store";

type CurveType = 'stable' | 'uncorrelated';

export function usePoolExistence() {
  const mainStore = useStore();
  const sdk = mainStore.sdk;

  const poolExists = ref<boolean>(false);
  const isFetching = ref<boolean>(false);

  async function checkExistence(params: IPoolExist): Promise<boolean> {
    isFetching.value = true;
    try {
      const {liquidityPoolResource} = await sdk.Swap.getLiquidityPoolResource({
        fromToken: params.fromCoin,
        toToken: params.toCoin,
        curveType: params.curve as CurveType,
        interactiveToken: 'from',
        amount: 5
      });
      isFetching.value = false;

      return !!liquidityPoolResource;
    } catch (error) {
      return false;
    }
  }

  async function check(params: IPoolExist) {
    poolExists.value = await checkExistence(params);
  }

  function reset() {
    poolExists.value = false;
  }

  function watchChanges(
    from: ICreateToken,
    to: ICreateToken,
    curve: Ref<string>,
  ) {
    watch(
      [from.token, to.token, curve.value],
      async () => {
        if (!from.token || !to.token) {
          reset();
        } else {
          await check({
            fromCoin: from.token,
            toCoin: to.token,
            curve: curve.value,
          });
        }
      },
      {
        immediate: true,
      },
    );
  }

  return {
    // data
    isFetching,
    poolExists,

    // methods
    check,
    watch: watchChanges,
    reset,
  };
}
