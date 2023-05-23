import { PONTEM_API_URL } from '@/constants/constants';
import { d } from '@/utils/utils';
import { knownTokens } from '@/constants/tokensList';
import { useMemoize } from '@vueuse/core';

type TFiatPricesResponse = {
  currency: string;
  price: number;
  lastUpdate: string;
};

export const getUSDEquivalent = (
  coinAmount: number | undefined,
  usdRate: number | undefined,
): number | undefined => {
  if (!coinAmount || !usdRate) return;
  return d(coinAmount).mul(d(usdRate)).toNumber();
};

const fetchPrice = async (): Promise<TFiatPricesResponse[] | undefined> => {
  try {
    const response = await fetch(
      `${PONTEM_API_URL}/integrations/fiat-prices?currencies=${knownTokens.join(',')}`,
    );
    return response.json() as unknown as TFiatPricesResponse[];
  } catch (e) {
    console.error(e);
  }
  return;
};

const fetchPriceMemo = useMemoize(fetchPrice);

export const getTokenPrice = async (
  coinSymbol: string | undefined,
): Promise<number | undefined> => {
  if (!coinSymbol) return;

  const prices = await fetchPriceMemo();

  return prices?.find((price) => price.currency === coinSymbol.toLowerCase())
    ?.price;
};
