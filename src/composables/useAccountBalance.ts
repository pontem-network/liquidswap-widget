import { ref, computed, isRef, unref, watch } from 'vue';
import { useStore } from '@/store/useStore';
import {
  MaybeRef,
  tryOnScopeDispose,
  tryOnUnmounted,
  useTimeoutPoll,
} from '@vueuse/core';
import { useCurrencyFormat } from '@/composables/useCurrencyFormat';
import { getFromCache } from '@/utils/cache';
import { AptosCoinInfoResource } from '@/types';
import { composeType } from '@/utils/contracts';
import isEqual from 'lodash/isEqual';
import { RECALCULATION_BALANCE_TIME } from '@/constants/constants';

export function useAccountBalance(
  address: MaybeRef<string | undefined>,
  token: MaybeRef<string | undefined>,
) {
  let firstFetchFlag = false;
  const isFirstFetching = ref(true);
  const isFetching = ref(true);
  const isExists = ref(false);
  const balance = ref(0);
  const { pause, resume } = useTimeoutPoll(
    watchBalance,
    RECALCULATION_BALANCE_TIME,
    {
      immediate: false,
    },
  );

  const { client, modules } = useStore();

  tryOnUnmounted(() => pause());
  tryOnScopeDispose(() => pause());

  async function watchBalance() {
    isFetching.value = true;
    await fetchBalance(unref(address), unref(token));
    isFetching.value = false;
  }

  async function fetchBalance(
    fnAddress?: string,
    fnToken?: string,
  ): Promise<{ balance: number; isExists: boolean } | undefined> {
    if (!fnAddress || !fnToken) {
      return;
    }

    if (firstFetchFlag) {
      isFirstFetching.value = false;
    }

    firstFetchFlag = true;
    const cacheKey = `${fnAddress}-${fnToken}`;

    try {
      const resource = await getFromCache(
        cacheKey,
        () => {
          return client.getAccountResource(
            fnAddress,
            composeType(modules.CoinStore, [fnToken]),
          ) as unknown as Promise<AptosCoinInfoResource>;
        },
        { time: 5000 },
      );

      if (cacheKey === `${unref(address)}-${unref(token)}`) {
        if (resource) {
          isExists.value = true;
          balance.value = +resource.data.coin.value;
        } else {
          isExists.value = false;
          balance.value = 0;
        }
      }
    } catch (_e) {}

    return {
      balance: balance.value,
      isExists: isExists.value,
    };
  }

  async function refetch() {
    isFetching.value = true;
    const result = await fetchBalance(unref(address), unref(token));
    isFetching.value = false;

    return result;
  }

  resume();
  if (isRef(address) || isRef(token)) {
    watch(
      () => [unref(address), unref(token)],
      async (a, b) => {
        if (isEqual(a, b)) {
          return;
        }

        // Reset fetching state after arguments is changed
        pause();
        firstFetchFlag = false;
        isFirstFetching.value = true;
        isFetching.value = true;
        await fetchBalance(unref(address), unref(token)).then(() => {
          resume();
          isFetching.value = false;
        });
      },
    );
  } else {
    isFirstFetching.value = true;
    fetchBalance(unref(address), unref(token));
  }

  return {
    isFetching,
    isFirstFetching,
    isExists,
    balance,
    refetch,
  };
}

export function useCurrentAccountBalance(
  token: MaybeRef<string | undefined>,
  options?: { useSuffix?: boolean; _decimals?: number },
) {
  const { account } = useStore();
  const address = computed(() => account.value?.address);

  const balance = useAccountBalance(address as unknown as string, token);
  const currencyFormat = useCurrencyFormat(balance.balance, token, options);

  return {
    ...balance,
    ...currencyFormat,
  };
}
