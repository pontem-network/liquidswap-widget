import { PONTEM_API_URL } from '@/constants/constants';
import { d } from '@/utils/utils';

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

export const fetchPrices = async (
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
