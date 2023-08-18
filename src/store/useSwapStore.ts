import isFinite from 'lodash/isFinite';
import { defineStore } from 'pinia';
import { reactive, watch, computed, ref, onMounted } from 'vue';
import { watchDebounced, useStorage } from '@vueuse/core';

import { getPoolStr } from '@/utils/pools';
import { useStore } from '@/store/useStore';
import { is_sorted, d, decimalsMultiplier } from '@/utils/utils';
import { usePoolsStore, useTokensStore } from '@/store';
import { getFromCache } from '@/utils/cache';
import { DENOMINATOR, VERSION_0_5, VERSION_0 } from '@/constants/constants';
import { usePoolExistence } from '@/composables/usePoolExistence';
import { useContractVersion } from '@/composables/useContractVersion';
import { IStoredToken, TVersionType } from '@/types';
import { getCurve, getResourcesAccount, getShortCurveFromFull } from '@/utils/contracts';
import { PontemWalletName } from '@pontem/aptos-wallet-adapter';

const DEFAULT_SLIPPAGE = 0.005;

export const useSwapStore = defineStore('swapStore', () => {
  const from = reactive<IStoredToken>({
    token: undefined,
    amount: undefined,
    reserve: 0,
    usdEquivalent: undefined,
  });

  const to = reactive<IStoredToken>({
    token: undefined,
    amount: undefined,
    reserve: 0,
    usdEquivalent: undefined,
  });

  const { version } = useContractVersion();
  const poolsStore = usePoolsStore();

  const mainStore = useStore();
  const { sdk } = mainStore;

  const curve = ref<string>();

  const stableSwapType = ref<'high' | 'normal'>('normal');
  const poolExistence = usePoolExistence();

  const slippageIsDefault = ref(true);
  const slippage = ref(DEFAULT_SLIPPAGE);
  const convertRate = ref(0);
  const fee = ref(0); // integer
  const convertFee = ref(0); // float (in percents)
  const convertFeeAmount = ref(0); // float in from currency
  const interactiveField = ref<'from' | 'to'>('from');
  const lastInteractiveField = ref<'from' | 'to'>('from');
  const convertError = ref<string>();
  const isUpdatingRate = ref(false);
  const isFrontrunEnable = useStorage('is-frontrun-enable', false);

  const tokensStore = useTokensStore();
  const aptos = mainStore.client;

  const networkId = computed(() => mainStore.networkId);
  const predefinedCurve = computed(() => {
    return poolsStore.getCurveType(from.token, to.token, version.value as unknown as TVersionType);
  });

  watch(slippageIsDefault, (value) => {
    if (value) {
      slippage.value = DEFAULT_SLIPPAGE;
    }
  });

  watch([tokensStore.tokens], () => {
    from.token = tokensStore.getToken(from.token)?.type || mainStore.defaultToken.value;
    to.token =
      from.token !== tokensStore.getToken(to.token)?.type
        ? tokensStore.getToken(to.token)?.type
        : undefined;
  });

  onMounted(() => resetState());

  function resetState() {
    version.value = VERSION_0;
    from.token = mainStore.defaultToken.value;
    to.token = undefined;
    from.amount = undefined;
    from.reserve = 0;
    to.amount = undefined;
    to.reserve = 0;
    convertError.value = undefined;
    from.usdEquivalent = undefined;
    to.usdEquivalent = undefined;
  }

  function convertToDecimals(amt?: number, fromToken?: string, toToken?: string) {
    if (!amt || !fromToken || !toToken) {
      return amt;
    }
    const fromDecimals = tokensStore.tokens[fromToken].decimals;
    const toDecimals = tokensStore.tokens[toToken].decimals;

    const diff = toDecimals - fromDecimals;
    if (diff > 0) {
      return +d(amt).div(decimalsMultiplier(diff)).toFixed(0);
    } else if (diff < 0) {
      return +d(amt).mul(decimalsMultiplier(diff)).toFixed(0);
    }

    return amt;
  }

  function toggleCurrencies() {
    const _from = { ...from };

    from.token = to.token;
    from.amount = convertToDecimals(to.amount, _from.token, to.token);

    to.amount = convertToDecimals(_from.amount, to.token, _from.token);
    to.token = _from.token;

    interactiveField.value = interactiveField.value === 'from' ? 'to' : 'from';
  }

  async function refetchRates(silent = false): Promise<void> {
    if (from.token && to.token && curve.value) {
      lastInteractiveField.value = interactiveField.value;
      if (!silent) {
        isUpdatingRate.value = true;
      }
      const mode = lastInteractiveField.value;

      const isSorted = is_sorted(from.token, to.token);
      const [fromToken, toToken] = isSorted ? [from.token, to.token] : [to.token, from.token];

      const resourceType = getPoolStr(fromToken, toToken, curve.value, version.value as TVersionType);

      const resourcesAccount = getResourcesAccount(version.value);

      try {
        const response = await getFromCache(
          ['calc', resourcesAccount, resourceType].join('-'),
          () => aptos.getAccountResource(resourcesAccount, resourceType),
          { time: 2000 },
        );
        const coinXReserve = +response.data.coin_x_reserve.value;
        const coinYReserve = +response.data.coin_y_reserve.value;
        fee.value = response.data.fee;
        from.reserve = isSorted ? coinXReserve : coinYReserve;
        to.reserve = isSorted ? coinYReserve : coinXReserve;
      } catch (e) {
        from.reserve = 0;
        to.reserve = 0;
        fee.value = 0;
        isUpdatingRate.value = false;
        return;
      }

      let rate;
      if (!from.amount && !to.amount) {
        if (!silent) {
          isUpdatingRate.value = false;
        }
        return;
      }

      try {
        rate = await sdk.value.Swap.calculateRates({
          fromToken: from.token,
          toToken: to.token,
          interactiveToken: mode,
          curveType: getShortCurveFromFull(curve.value) as 'stable' | 'uncorrelated',
          amount: mode === 'from' ? from.amount! : to.amount!,
          version: version.value as unknown as TVersionType,
        });
      } catch (_e) {}

      convertError.value =
        to.amount && to.reserve < to.amount ? 'Insufficient funds in Liquidity Pool' : undefined;
      if (d(rate).lessThanOrEqualTo(0) || !isFinite(Number(rate))) {
        if (!silent) {
          isUpdatingRate.value = false;
        }
        return;
      }

      if (mode === 'from') {
        to.amount = +Number(Number(rate).toFixed(0));
        convertRate.value = (from.amount as number) / (to.amount as number);
      } else {
        from.amount = +Number(Number(rate).toFixed(0));
      }

      const toDec = d(to.amount).div(decimalsMultiplier(tokensStore.tokens[to.token].decimals));
      const fromDec = d(from.amount).div(decimalsMultiplier(tokensStore.tokens[from.token].decimals));

      convertRate.value = +Number(
        toDec.div(fromDec).mul(decimalsMultiplier(tokensStore.tokens[to.token].decimals)).toFixed(0),
      );
      convertFee.value = (fee.value * 100) / DENOMINATOR;
      convertFeeAmount.value =
        from?.amount && from.amount > 0 ? from.amount * convertFee.value * 0.01 : 0;
      if (!silent) {
        isUpdatingRate.value = false;
      }
    } else {
      from.reserve = 0;
      to.reserve = 0;
    }
  }

  async function check() {
    if (!from?.token || !to?.token || !curve.value) return;

    await poolExistence.check(
      {
        fromCoin: from.token,
        toCoin: to.token,
        curve: curve.value,
      },
      version.value,
    );
  }

  watchDebounced(
    () => [version, from.amount, from.reserve, from.token, to.amount, to.reserve, to.token, curve],
    async (_changed) => {
      await check();
      refetchRates(false);
    },
    {
      debounce: 500,
      maxWait: undefined,
      deep: true,
      immediate: true,
    },
  );

  const slippageAmount = computed(() => {
    const MULTIPLY = 10000;
    const slippagePercent = slippage.value * MULTIPLY;

    if (lastInteractiveField.value === 'from' && to.amount !== undefined) {
      return version.value === VERSION_0_5 || curve.value === getCurve('uncorrelated', version.value)
        ? to.amount - (to.amount * slippagePercent) / MULTIPLY
        : to.amount - 1;
    } else if (lastInteractiveField.value === 'to' && from.amount !== undefined) {
      return version.value === VERSION_0_5 || curve.value === getCurve('uncorrelated', version.value)
        ? from.amount + (from.amount * slippagePercent) / MULTIPLY
        : from.amount;
    }
    return 0;
  });

  /**
   * Pool is absence
   */
  const isPoolAbsence = computed(
    (): boolean =>
      !!from.token &&
      !!to.token &&
      !poolExistence.isFetching(
        {
          fromCoin: from.token,
          toCoin: to.token,
          curve: curve.value ?? '',
        },
        version.value,
      ) &&
      !poolExistence.poolExists(
        {
          fromCoin: from.token,
          toCoin: to.token,
          curve: curve.value ?? '',
        },
        version.value,
      ),
  );

  const isBusy = computed(() => poolExistence.isFetching || isUpdatingRate.value);

  const priceImpact = computed(() => {
    if (!from?.amount || !from.reserve || !to.reserve) return 0;
    const constantProduct = from.reserve * to.reserve;
    const reserveToAfter = constantProduct / (from.reserve + from.amount);
    const amountOut = to.reserve - reserveToAfter;
    const marketPrice = from.amount / amountOut;
    const midPrice = from.reserve / to.reserve;
    const pImpact = (1 - midPrice / marketPrice) * 100;
    return pImpact;
  });

  const formatter = Intl.NumberFormat('en', {
    notation: 'compact',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const priceImpactFormatted = computed(() => formatter.format(priceImpact.value));

  const priceImpactState = computed(() => {
    if (+priceImpactFormatted.value <= 10) return 'normal';
    if (+priceImpactFormatted.value >= 10 && +priceImpactFormatted.value < 20) return 'warning';
    return 'alert';
  });

  watch(
    () => mainStore.walletName.value,
    () => {
      if (mainStore.walletName.value !== PontemWalletName) {
        isFrontrunEnable.value = false;
      }
    },
    {
      immediate: true,
    },
  );

  return {
    check,
    isBusy,
    isPoolAbsence,
    convertRate,
    convertFee,
    convertFeeAmount,
    fromCurrency: from,
    interactiveField,
    isUpdatingRate,
    lastInteractiveField,
    networkId,
    slippage,
    slippageAmount,
    slippageIsDefault,
    toCurrency: to,
    curve,
    toggleCurrencies,
    refetchRates,
    poolExists: poolExistence.poolExists,
    convertError,
    stableSwapType,
    priceImpact,
    priceImpactFormatted,
    priceImpactState,
    version,
    predefinedCurve,
    isFrontrunEnable,
  };
});
