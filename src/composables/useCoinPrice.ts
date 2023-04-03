import { PONTEM_API_URL } from '@/constants/constants';
import { d } from '@/utils/utils';
import { computedAsync, MaybeRef, useMemoize } from '@vueuse/core';
import { useTokensStore } from '@/store';
import { computed, unref } from 'vue';


type TFiatPricesResponse = {
  currency: string;
  price: number;
  lastUpdate: string;
}[];

export const getUSDEquivalent = (
  coinAmount: number | undefined,
  usdRate: number | undefined,
): number | undefined => {
  if (!coinAmount || !usdRate) return;
  return d(coinAmount).mul(d(usdRate)).toNumber();
};

const fetchPrices = async (
  coinSymbols: string | undefined,
): Promise<TFiatPricesResponse | undefined> => {
  if (!coinSymbols) return;
  try {
    const res = await fetch(
      `${PONTEM_API_URL}/integrations/fiat-prices?currencies=${coinSymbols.toLowerCase()}`,
      { cache: 'no-cache' },
    );

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('err', err);
    return;
  }
};


/**
 * New hook implementation for currency conversion with caching support
 */
export const useCurrencyConversionRate = (
  tokenType: MaybeRef<string | undefined>,
) => {
  const tokensStore = useTokensStore();

  const token = computed(() => tokensStore.getToken(unref(tokenType)));

  const fetchRate = useMemoize((symbol: string) => {
    return fetchPrices(symbol);
  });

  return {
    value: computedAsync(() =>
      token.value?.symbol ? fetchRate(token.value?.symbol) : undefined,
    ),
    refetch: () => token.value?.symbol && fetchRate.load(token.value?.symbol),
  };
};
