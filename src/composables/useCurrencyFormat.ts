import { MaybeRef } from '@vueuse/core';
import { ref, computed, isRef, unref, watchEffect } from 'vue';
import { useTokensStore } from '@/store/useTokenStore';
import {providerForToken} from "@/utils/tokens";

const cutTrailingZerosFromString = (numberAsString: string) => {
  if (numberAsString.length === 1) return numberAsString;
  const arr = numberAsString.match(
    /^-?(((\d{1,3}),?)+\.*?)*?\d*?(?=\.?0*$)/,
  ) || [''];
  return arr[0];
};

export function useNumberFormat(
  amount: MaybeRef<string | number | undefined>,
  options: {
    decimals: MaybeRef<number>;
    suffix: MaybeRef<string | undefined>;
    bridge: MaybeRef<string | undefined>;
  } = { decimals: 1, suffix: '', bridge: '' },
) {
  const formatted = ref('');

  function formatCurrency(
    amount: undefined | string | number,
    decimals: number,
    suffix?: string,
    bridge?: string,
  ) {
    let value = +(amount || 0) / Math.pow(10, decimals);
    let fixed = decimals;
    let prefix = '';

    if (value > 10) {
      fixed = 2;
    } else if (value >= 1) {
      fixed = 4;
    } else if (value >= 0.1) {
      fixed = 6;
    }

    if (value === 0) {
      fixed = 0;
    } else if (value < 1 / Math.pow(10, decimals)) {
      fixed = decimals;
      value = +Number(1 / Math.pow(10, decimals));
      prefix = '~';
    }

    fixed = fixed > decimals ? decimals : fixed;

    const formatter = Intl.NumberFormat('en', {
      notation: 'standard',
      minimumFractionDigits: fixed,
      maximumFractionDigits: fixed,
    });

    const suffixWithBridge = [suffix, bridge].filter(Boolean).join(' • ');

    formatted.value = [
      prefix + cutTrailingZerosFromString(formatter.format(value)),
      suffixWithBridge,
    ]
      .filter(Boolean)
      .join(' ');
  }

  if (isRef(amount) || isRef(options.decimals) || isRef(options.suffix) || isRef(options.bridge)) {
    watchEffect(() => {
      formatCurrency(
        unref(amount),
        unref(options.decimals),
        unref(options.suffix),
        unref(options.bridge)
      );
    });
  } else {
    formatCurrency(
      unref(amount),
      unref(options.decimals),
      unref(options.suffix),
      unref(options.bridge)
    );
  }

  return formatted;
}

export function useCurrencyFormat(
  amount: MaybeRef<string | number | undefined>,
  token: MaybeRef<string | undefined>,
  options?: { useBridge?: boolean; _decimals?: number, useSuffix?: boolean },
) {
  const tokensStore = useTokensStore();
  const { useSuffix = true, useBridge = false, _decimals } = options || {};

  const symbol = computed(() => {
    const tokenEntity = unref(token)
      ? tokensStore.getToken(unref(token) as string)
      : undefined;

    return tokenEntity ? tokenEntity.symbol : '';
  });

  const source = computed(() => {
    const tokenEntity = unref(token)
      ? tokensStore.getToken(unref(token) as string)
      : undefined;

    return tokenEntity ? providerForToken(tokenEntity) : '';
  });

  const alias = computed(() => {
    const tokenEntity = unref(token)
      ? tokensStore.getToken(unref(token) as string)
      : undefined;

    return tokenEntity ? tokenEntity.alias : symbol.value;
  });

  const decimals = computed(() => {
    const tokenEntity = unref(token)
      ? tokensStore.getToken(unref(token) as string)
      : undefined;
    return tokenEntity ? tokenEntity.decimals : _decimals ? _decimals : 8;
  });

  const formatted = useNumberFormat(amount, {
    decimals,
    suffix: useSuffix ? symbol : '',
    bridge: useBridge ? source : ''
  });

  return {
    alias,
    symbol,
    decimals,
    formatted,
  };
}
