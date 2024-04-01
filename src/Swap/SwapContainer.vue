<template>
  <div class="container">
    <div class="swap-container" :class="[mainStore.insideNativeWallet.value && 'swap-container-wallet']">
      <form
        class="swap"
        action=""
        autocomplete="off"
        novalidate
        @submit.prevent="submitForm"
        @keyup.enter="submitForm"
      >
        <div class="swap__header">
          <span class="font-medium">Swap</span>
          <div ref="overlayAnchor" class="swap__anchor" />
          <div class="swap__settings">
            <button type="button" class="btn btn-config" @click="openSettingsDialog">
              <svg
                class="config-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="3" />
                <path
                  d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="swap__row">
          <SwapInput
              mode="from"
              :model="fromCurrency"
              :should-be-updated-flag="requireUpdateFromInput"
              @change:decimal-difference="
                setAmountByDecimalDifference($event, 'from')
              "
              @update:model="debouncedUpdateModelValue($event, 'from')"
              @click:max-balance="handleMaxBalance($event, 'from')"
              @focus:custom="setLocalLastChanges('from')"
              @input:custom="handleInput"
          />
<!--          <SwapInput mode="from" />-->
        </div>
        <InputToggle :on-click="toggleSwap" />
        <div class="swap__row">
          <SwapInput
              mode="to"
              :model="toCurrency"
              :should-be-updated-flag="requireUpdateToInput"
              @change:decimal-difference="
                setAmountByDecimalDifference($event, 'to')
              "
              @update:model="debouncedUpdateModelValue($event, 'to')"
              @click:max-balance="handleMaxBalance($event, 'to')"
              @focus:custom="setLocalLastChanges('to')"
              @input:custom="handleInput"
          />
<!--          <SwapInput mode="to" />-->
        </div>
        <div
          v-if="tokensChosen && !fullCurveOfDefaultPool"
          class="swap__row"
          :class="[mainStore.insideNativeWallet.value && 'swap__row--extra-padding']"
        >
          <PInlineMessage class="mt-1" :class="'curve-warning'" severity="warn"
            >Caution: make sure the pair you are trading should be stable or uncorrelated. i.e USDC/USDT
            is stable and USDC/BTC is uncorrelated</PInlineMessage
          >
        </div>
        <div
          v-show="tokensChosen && !fullCurveOfDefaultPool"
          class="swap__row"
          :class="[mainStore.insideNativeWallet.value && 'swap__row--extra-padding']"
        >
          <CurveSwitch :curve="swapStore.curve" :version="version" />
        </div>
        <div
          v-if="
            !swapStore.isPoolAbsence &&
            swapStore.convertRate &&
            swapStore.toCurrency.amount &&
            swapStore.fromCurrency.amount
          "
          class="swap__row swap__row--no-padding"
        >
          <SwapInfo />
        </div>
        <div v-if="fullCurveOfDefaultPool" class="swap__row">
          <CurveInfo :type="fullCurveOfDefaultPool" :version="version" />
        </div>
        <div v-show="canSwitchContract" class="swap__row -version">
          <ContractSwitch type="swap" />
        </div>
        <ReservesContainer type="swap" />
        <div class="swap__row">
          <p-button v-if="!connected" type="submit" tabindex="5" class="swap__button is-connect">
            <span>Connect Wallet</span>
          </p-button>
          <p-button
            v-else
            type="submit"
            tabindex="5"
            class="swap__button"
            :class="[{ 'p-disabled': buttonState.disabled }, priceImpactClass]"
            :disabled="buttonState.disabled"
          >
            <span>{{ buttonState.text }}</span>
          </p-button>
        </div>
      </form>
      <div class="full_version">
        <h4 class="full_version__header">More features in full-size version</h4>
        <p class="full_version__description">
          Go to the web dApp to add liquidity or stake LP tokens in farms
        </p>
        <a class="full_version__link" href="https://liquidswap.com" target="_blank">
          <img class="full_version__img" src="./../assets/expand.svg" />
          <span>liquidswap.com</span>
        </a>
        <span class="full_version__app">version {{ versionApp }}</span>
      </div>
    </div>
    <TxSettingsDialog
      ref="txSettingsDialog"
      v-model:isDefault="swapStore.slippageIsDefault"
      v-model="swapStore.slippage"
      :to-token="swapStore.toCurrency.token"
      :from-token="swapStore.fromCurrency.token"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import PInlineMessage from 'primevue/inlinemessage';
import PButton from 'primevue/button';
import { storeToRefs } from 'pinia';
import { useDebounceFn } from '@vueuse/core';
import isNil from 'lodash/isNil';

import { CurveInfo } from '@/components/CurveInfo';
import { CurveSwitch } from '@/components/CurveSwitch';
import { InputToggle } from '@/components/InputToggle';
import { ReservesContainer } from '@/components/ReservesContainer';
import { TxSettingsDialog } from '@/components/TxSettingsDialog';
import { ContractSwitch } from '@/components/ContractSwitch';
import { useCurrentAccountBalance } from '@/composables/useAccountBalance';
import { useStore, useSwapStore, usePoolsStore } from '@/store';
import { d, decimalsMultiplier } from '@/utils/utils';
import SwapInfo from './SwapInfo.vue';
import SwapInput from './SwapInput.vue';
import { getAmountInteger, getTokenDecimal } from '@/composables/useInputServices';
import {
  CURVE_STABLE_V05,
  CURVE_STABLE,
  VERSION_0,
  VERSION_0_5,
  CURVE_UNCORRELATED_V05,
  CURVE_UNCORRELATED,
} from '@/constants/constants';
import { getCurve, getShortCurveFromFull } from '@/utils/contracts';
import { TokenFiledType } from '@/types/coins';
import { IPersistedPool } from '@/types/pools';
import { TCurveType, TVersionType, TCustomEvent } from '@/types';
import { DOODOO } from '@/constants/constants';


const mainStore = useStore();
const poolsStore = usePoolsStore();
const swapStore = useSwapStore();

const requireUpdateInput = ref<TokenFiledType>();

const versionApp = computed(() => process.env.VERSION);
const { account } = mainStore;
const version = computed(() => swapStore.version);
const { fromCurrency, toCurrency } = storeToRefs(swapStore);

const stableCurve = computed(() => getCurve('stable', version.value));
const unstableCurve = computed(() => getCurve('unstable', version.value));

const connected = computed(() => Boolean(account.value));

const requireUpdateFromInput = computed(() => {
  return (
      requireUpdateInput.value == 'from' || requireUpdateInput.value == undefined
  );
});

const requireUpdateToInput = computed(() => {
  return (
      requireUpdateInput.value == 'to' || requireUpdateInput.value == undefined
  );
});

const curveType = computed(() =>
  poolsStore.getCurveType(
    swapStore.fromCurrency?.token,
    swapStore.toCurrency?.token,
    version.value as TVersionType,
  ),
);

/**
 * We call "default" pools - pools from the coins-registry.
 * Returns false if we don't know about the pool with the selected token pair.
 */
const fullCurveOfDefaultPool = computed(() => {
  // Now all known pools have version 0
  const isExistsDefaultPoolV0 = poolsStore.getCurveType(
    swapStore.fromCurrency?.token,
    swapStore.toCurrency?.token,
    VERSION_0,
  );

  const isExistsDefaultPoolV05 = poolsStore.getCurveType(
    swapStore.fromCurrency?.token,
    swapStore.toCurrency?.token,
    VERSION_0_5,
  );

  const hasDefaultPoolStableCurveV0 = [CURVE_STABLE, CURVE_STABLE_V05].includes(
    '' + isExistsDefaultPoolV0,
  );

  const hasDefaultPoolStableCurveV05 = [CURVE_STABLE, CURVE_STABLE_V05].includes(
    '' + isExistsDefaultPoolV05,
  );

  const hasDefaultPoolUncorrelatedCurveV0 = [CURVE_UNCORRELATED, CURVE_UNCORRELATED_V05].includes(
    '' + isExistsDefaultPoolV0,
  );

  const hasDefaultPoolUncorrelatedCurveV05 = [CURVE_UNCORRELATED, CURVE_UNCORRELATED_V05].includes(
    '' + isExistsDefaultPoolV05,
  );

  if (
    (isExistsDefaultPoolV0 || isExistsDefaultPoolV05) &&
    (hasDefaultPoolStableCurveV0 || hasDefaultPoolStableCurveV05)
  ) {
    return version.value === VERSION_0_5 ? CURVE_STABLE_V05 : CURVE_STABLE;
  }

  if (
    (isExistsDefaultPoolV0 || isExistsDefaultPoolV05) &&
    (hasDefaultPoolUncorrelatedCurveV0 || hasDefaultPoolUncorrelatedCurveV05)
  ) {
    return version.value === VERSION_0_5 ? CURVE_UNCORRELATED_V05 : CURVE_UNCORRELATED;
  }

  return false;
});

const fromTokenDecimal = computed(() =>
    getTokenDecimal(fromCurrency.value.token),
);
const toTokenDecimal = computed(() => getTokenDecimal(toCurrency.value.token));

function setAmountByDecimalDifference(
    event: TCustomEvent,
    _type: TokenFiledType,
) {
  const { value: diff, mode } = event;
  if (diff === undefined || mode === undefined) return;

  const model = _type == 'from' ? fromCurrency : toCurrency;
  if (diff > 0) {
    model.value.amount = +d(model.value.amount)
        .mul(decimalsMultiplier(diff))
        .toFixed(0);
  } else if (diff < 0) {
    model.value.amount = +d(model.value.amount)
        .div(decimalsMultiplier(diff))
        .toFixed(0);
  }
}

const debouncedUpdateModelValue = useDebounceFn(handleUpdateModelAmount, 2000);

function handleUpdateModelAmount(event: TCustomEvent, type: TokenFiledType) {
  swapStore.interactiveField = type;

  const tokenDecimals =
      type == 'from' ? fromTokenDecimal.value : toTokenDecimal.value;
  const tokenModel = type == 'from' ? fromCurrency : toCurrency;

  const { value } = event;

  if (isNil(tokenDecimals)) return;

  const amount = getAmountInteger(value, tokenDecimals);
  tokenModel.value.amount = amount;
}

function handleMaxBalance(event: TCustomEvent, type: TokenFiledType) {
  requireUpdateInput.value = undefined;

  const { value } = event;
  const decimal =
      type == 'from' ? fromTokenDecimal.value : toTokenDecimal.value;

  const formattedBalance = +d(value)
      .div(decimalsMultiplier(decimal))
      .toFixed(decimal);

  event.value = formattedBalance;

  handleUpdateModelAmount(event, type);
}

function setLocalLastChanges(type: TokenFiledType) {
  requireUpdateInput.value = type;
}

function handleInput(event: TCustomEvent) {
  requireUpdateInput.value = event.mode == 'from' ? 'to' : 'from';
}

const fromBalance = useCurrentAccountBalance(computed(() => swapStore.fromCurrency?.token));
const toBalance = useCurrentAccountBalance(computed(() => swapStore.toCurrency?.token));
const txSettingsDialog = ref();
const overlayAnchor = ref();

const tokensChosen = computed(() => !!swapStore.fromCurrency.token && !!swapStore.toCurrency.token);
const canSwitchContract = computed(() => {
  const isToTokenChosen = swapStore.toCurrency?.token;

  const isDefaultPool = !!fullCurveOfDefaultPool.value;
  const hasDefaultPoolStableCurve = [CURVE_STABLE_V05, CURVE_STABLE].includes(
    '' + fullCurveOfDefaultPool.value,
  );
  const isPoolUnknown = fullCurveOfDefaultPool.value === false;
  const canSwitch = (isDefaultPool && hasDefaultPoolStableCurve) || isPoolUnknown;

  return isToTokenChosen && canSwitch;
});

const buttonState = computed(() => {
  if (swapStore.isBusy.value) {
    return { disabled: true, text: '...' };
  }

  if (swapStore.convertError) {
    return { disabled: true, text: swapStore.convertError };
  }

  if (!swapStore.fromCurrency.token || !swapStore.toCurrency.token) {
    return { disabled: true, text: 'Select token' };
  }

  if (swapStore.isPoolAbsence) {
    return { disabled: true, text: 'Pool is not created' };
  }

  if (!swapStore.fromCurrency?.amount || !swapStore.toCurrency?.amount) {
    return { disabled: true, text: 'Enter an amount' };
  }

  let amount = d(swapStore.fromCurrency?.amount);
  let balance = d(fromBalance.balance.value);

  if (swapStore.interactiveField === 'to') {
    amount = amount.plus(amount.mul(swapStore.slippage));
  }

  if (swapStore.fromCurrency.token === mainStore.defaultToken.value) {
    // TODO: see it and maybe use gas estimation value
    // Bind 2000 tokens for gas
    balance = balance.minus(2000);
  }

  const haveBalance = amount.lte(balance);
  if (!haveBalance) {
    return {
      disabled: true,
      text: `Insufficient ${fromBalance.symbol.value} balance`,
    };
  }

  if (!toBalance.isExists.value && !(toBalance.isFetching.value && toBalance.isFirstFetching.value)) {
    return {
      disabled: false,
      text: `Register ${toBalance.symbol.value} and Swap`,
    };
  }

  return {
    disabled: false,
    text: `Swap`,
  };
});

const priceImpactClass = computed(() => {
  return swapStore.priceImpactState === 'normal'
    ? 'p-button-primary'
    : swapStore.priceImpactState === 'warning'
    ? 'p-button-warning_custom'
    : 'p-button-alert';
});

function submitForm(e: Event) {
  const isNextButton = (e.target as HTMLElement)?.enterKeyHint === 'next';
  const isSubmitDisabled = buttonState.value.disabled;
  const cancelEvent = Boolean((isNextButton || isSubmitDisabled) && connected.value);
  if (cancelEvent) return;

  const handler = !connected.value ? onConnectWallet : showSwapDialog;
  handler();
}

function onConnectWallet() {
  mainStore.showDialog('connectWallet');
}

function toggleSwap() {
  swapStore.toggleCurrencies();
  requireUpdateInput.value = undefined;
}

function showSwapDialog() {
  const isShowSwapWarningDialog =
    swapStore.priceImpactState === 'warning' || swapStore.priceImpactState === 'alert';

  if (isShowSwapWarningDialog) {
    mainStore.showDialog('priceImpact');
    return;
  }

  mainStore.showDialog('swapConfirm');
}

function openSettingsDialog() {
  txSettingsDialog.value.show();
}

swapStore.check();

//watchers

watch([curveType, stableCurve, unstableCurve], () => {
  if (curveType.value) {
    swapStore.curve =
        curveType.value === stableCurve.value || curveType.value === 'stable'
            ? stableCurve.value
            : unstableCurve.value;
  } else {
    const shortName = getShortCurveFromFull(swapStore.curve);
    const adaptedShortName = shortName === 'uncorrelated' ? 'unstable' : 'stable';
    swapStore.curve = getCurve(adaptedShortName, version.value);
  }
});

watch(
    () => [swapStore.fromCurrency.token, swapStore.toCurrency.token],
    async ([newFrom, newTo], [oldFrom, oldTo]) => {
      if (!newFrom || !newTo) return;

      // If the pair of tokens is the same, we don't need to set the curve
      if (oldFrom === newTo && oldTo == newFrom) {
        return;
      }

      // need to reset the version when changing a pair of tokens
      swapStore.version = VERSION_0;

      let resultCurve: string | undefined;
      let resultVersion: number = VERSION_0;
      let resultPool: IPersistedPool | undefined;

      for (const curveType of ['stable', 'unstable'] as TCurveType[]) {
        for (const version of [VERSION_0_5, VERSION_0]) {
          const curve = getCurve(curveType, version);

          let pool = undefined;
          try {
            pool = await poolsStore.getPool(newFrom, newTo, curve, version as TVersionType);
          } catch (error) {
            console.error('SwapContainer: getPool', error);
          }

          if (
              !resultPool ||
              ((pool?.reserveX ?? 0) > resultPool.reserveX && (pool?.reserveY ?? 0) > resultPool.reserveY)
          ) {
            resultPool = pool;
            resultCurve = getCurve(curveType, version);
            resultVersion = version;
          }
        }
      }

      // FIXME: need to do LS-1609 - coin registry pool priority
      if (
          swapStore.toCurrency?.token === DOODOO ||
          swapStore.fromCurrency?.token === DOODOO
      ) {
        resultCurve = getCurve('uncorrelated', VERSION_0_5);
        resultVersion = VERSION_0_5;
      }

      /**
       * Set uncorrelated pool version 0 as the default value.
       * In this case, the user chooses the curve and version himself.
       */
      swapStore.curve = resultCurve as string;
      swapStore.version = resultVersion;
    },
);
</script>
