import { useTokensStore } from '@/store';
import { getUSDEquivalent, useCurrencyConversionRate } from './useCoinPrice';
import { ICreateToken } from '@/types';
import { d, decimalsMultiplier } from '@/utils/utils';
import { useNumberFormat } from './useCurrencyFormat';

export const getTokenDecimal = (token: string | undefined) => {
  const tokensStore = useTokensStore();
  if (!token) return;
  const tokenEntity = tokensStore.getToken(token);

  return tokenEntity ? tokenEntity.decimals : 8;
};

export const getAmountWithDecimal = (
  amount: number | undefined,
  decimal: number,
) => {
  if (amount === undefined) return;

  return +d(amount).div(decimalsMultiplier(decimal)).toFixed(decimal);
};

export const getStoredTokenUsdEquivalent = async (
  storedToken: ICreateToken,
) => {

  const priceResponse = useCurrencyConversionRate(storedToken.token).value;
  if (!priceResponse.value?.length) return;

  const { price } = priceResponse.value[0];
  if (!price) return;

  const decimal = getTokenDecimal(storedToken.token);
  if (decimal === undefined) return;

  const usdEquivalent = getUSDEquivalent(
    getAmountWithDecimal(storedToken.amount, decimal),
    price,
  );

  return usdEquivalent;
};

/**
 * A function for converting e-notation values into short values.
 * Sample data:
 * '2.1331221321312331e+21' -> '>999.999 T'
 * '-2.1331221321312331e+21' -> '>-999.999 T'
 * '2.1331221321312331e+10' -> '21.331 B'
 * '2.1331221321312331e+8' -> '213.312 M'
 * '2.1331221321312331e+4' -> '21331.221'
 * '2.1331221321312331e-3' -> '0.002'
 * @param amount string
 * @param prefix string
 */
type TUsdEquivalentSuffix = 'M' | 'B' | 'T' | undefined;

export function amount2NoENotation(amount: string, prefix: string) {
  // because useNumberFormat doesn't accept negative
  const sign: '-' | '' = !amount[0] ? '' : amount[0] === '-' ? '-' : '';
  const _amount =
    sign === '-'
      ? amount.replace('-', '').replace('~', '')
      : amount.replace('~', '');

  const valueWithoutCommas = useNumberFormat(_amount, {
    decimals: 0,
    suffix: undefined,
    bridge: undefined,
  }).value.replaceAll(',', '');

  const isBeforeM = valueWithoutCommas.length <= 6;
  const isM = valueWithoutCommas.length > 6 && valueWithoutCommas.length <= 9;
  const isB = valueWithoutCommas.length > 9 && valueWithoutCommas.length <= 12;
  const isT = valueWithoutCommas.length > 12 && valueWithoutCommas.length <= 15;
  const decimal = 3;

  if (isBeforeM) {
    return `${prefix + sign}${(+_amount).toFixed(decimal)}`;
  }

  if (isM) {
    return getOrderedString(6, valueWithoutCommas, {
      decimal,
      prefix: prefix + sign,
      suffix: 'M',
    });
  }

  if (isB) {
    return getOrderedString(9, valueWithoutCommas, {
      decimal,
      prefix: prefix + sign,
      suffix: 'B',
    });
  }

  if (isT) {
    return getOrderedString(12, valueWithoutCommas, {
      decimal,
      prefix: prefix + sign,
      suffix: 'T',
    });
  }

  const tooLargeValue = `999.`;
  return `>${prefix}${sign}${addNines(tooLargeValue, decimal)} T`;
}

function getOrderedString(
  numberOrder: number,
  value: string,
  option: {
    decimal: number;
    prefix: string;
    suffix: TUsdEquivalentSuffix;
  },
) {
  const result = (+value / Math.pow(10, numberOrder)).toFixed(option.decimal);
  return `${option.prefix}${result} ${option.suffix}`;
}

function addNines(value: string, decimal: number) {
  const helperArray = Array.from(value);
  for (let i = 0; i < decimal; i++) {
    helperArray.push('9');
  }

  return helperArray.join('');
}
