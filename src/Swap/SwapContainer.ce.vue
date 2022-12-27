<template>
  <div class="container">
    <div class="swap-container">
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
            <button type="button" class="btn btn-config" @click="toggleConfig">
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
            <TxSettingsOverlay
              ref="settingsOverlay"
              v-model:isDefault="swapStore.slippageIsDefault"
              v-model="swapStore.slippage"
              :to-token="swapStore.toCurrency.token"
              :from-token="swapStore.fromCurrency.token"
            />
          </div>
        </div>
        <div class="swap__row">
          <SwapInput mode="from" />
        </div>
        <InputToggle :on-click="toggleSwap" />
        <div class="swap__row">
          <SwapInput mode="to" />
        </div>
        <div v-if="tokensChosen && !curveType" class="swap__row">
          <PInlineMessage class="mt-1" :class="'curve-warning'" severity="warn"
            >Caution: make sure the pair you are trading should be stable or
            uncorrelated. i.e USDC/USDT is stable and USDC/BTC is
            uncorrelated</PInlineMessage
          >
        </div>
        <div v-show="tokensChosen && !curveType" class="swap__row">
          <CurveSwitch mode="swap" />
        </div>
        <div
          v-if="
            !swapStore.isPoolAbsence &&
            swapStore.convertRate &&
            swapStore.toCurrency.amount &&
            swapStore.fromCurrency.amount
          "
          class="swap__row"
        >
          <SwapInfo />
        </div>
        <div v-if="curveType" class="swap__row">
          <CurveInfo :type="curveType" />
        </div>
        <div class="swap__row">
          <p-button
            v-if="!account"
            type="submit"
            tabindex="5"
            class="swap__button is-connect"
          >
            <span>Connect Wallet</span>
          </p-button>
          <p-button
            v-else
            type="submit"
            tabindex="5"
            class="swap__button"
            :class="{ 'p-disabled': buttonState.disabled }"
            :disabled="buttonState.disabled"
          >
            <span>{{ buttonState.text }}</span>
          </p-button>
        </div>
      </form>
    </div>
    <ReservesContainer type="swap" />
    <ImportTokenDialog
      ref="importFromDialog"
      :token="routeFromToken"
      store="swap"
      mode="from"
      @close="
        () => {
          routeFromToken = false;
          importToToken();
        }
      "
    />
    <ImportTokenDialog
      ref="importToDialog"
      :token="routeToToken"
      store="swap"
      mode="to"
      @close="routeToToken = false"
    />
  </div>
  <connect-wallet-dialog v-model:visible="mainStore.dialogs.connectWallet" />
  <swap-confirm-dialog v-model:visible="mainStore.dialogs.swapConfirm" />
</template>

<script setup lang="ts">
import { useWalletProviderStore } from '@pontem/aptos-wallet-adapter';
import { watchDebounced } from '@vueuse/shared';
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
import PInlineMessage from 'primevue/inlinemessage';
import PButton from 'primevue/button';

import { CurveInfo } from '@/components/CurveInfo';
import { CurveSwitch } from '@/components/CurveSwitch';
import { InputToggle } from '@/components/InputToggle';
import { ReservesContainer } from '@/components/ReservesContainer';
import { TxSettingsOverlay } from '@/components/TxSettingsOverlay';
import { useCurrentAccountBalance } from '@/composables/useAccountBalance';
import { useStore, useSwapStore, useTokensStore, usePoolsStore } from '@/store';
import { d } from '@/utils/utils';
import { ImportTokenDialog } from '@/components/ImportTokenDialog';
import SwapInfo from './SwapInfo.ce.vue';
import SwapInput from './SwapInput.ce.vue';
import { CURVE_STABLE, CURVE_UNCORRELATED } from '@/constants/constants';
import { ConnectWalletDialog } from '@/components/ConnectWalletDialog';
import { SwapConfirmDialog } from '@/components/SwapConfirmDialog';

// initialize stores
(async () => {
  const tokensStore = useTokensStore();
  await tokensStore.fetchCoinsList();
  const poolsStore = usePoolsStore();
  poolsStore.fetchPoolsList();
  useStore();
})();


const adapter = useWalletProviderStore();
const { account } = storeToRefs(adapter);
const mainStore = useStore();
const poolsStore = usePoolsStore();
const swapStore = useSwapStore();
const tokensStore = useTokensStore();

const curveType = computed(() =>
  poolsStore.getCurveType(
    swapStore.fromCurrency?.token,
    swapStore.toCurrency?.token,
  ),
);

watch(
  curveType,
  (curve) => {
    if (curve) {
      swapStore.curve =
        curve === CURVE_STABLE || curve === 'stable'
          ? CURVE_STABLE
          : CURVE_UNCORRELATED;
    }
  },
  {
    immediate: true,
  },
);

const fromBalance = useCurrentAccountBalance(
  computed(() => swapStore.fromCurrency?.token),
);
const toBalance = useCurrentAccountBalance(
  computed(() => swapStore.toCurrency?.token),
);
const settingsOverlay = ref();
const overlayAnchor = ref();
const importToDialog = ref();
const importFromDialog = ref();

const routeToToken = ref();
const routeFromToken = ref();

const tokensChosen = computed(
  () => !!swapStore.fromCurrency.token && !!swapStore.toCurrency.token,
);

const importFromToken = () => {
  if (!routeFromToken.value) return;
  const fromTokenParam = tokensStore.getToken(routeFromToken.value);
  if (!fromTokenParam) {
    if (!tokensStore.isReady) return;
    importFromDialog.value.show();
  } else {
    swapStore.fromCurrency.token = fromTokenParam.type;
    importToToken();
  }
};

const importToToken = () => {
  if (!routeToToken.value) return;
  const toTokenParam = tokensStore.getToken(routeToToken.value);
  if (!toTokenParam) {
    if (!tokensStore.isReady) return;
    importToDialog.value.show();
  } else {
    swapStore.toCurrency.token = toTokenParam.type;
  }
};

watchDebounced(
  () => [routeFromToken.value, routeToToken.value, tokensStore.isReady],
  () => {
    if (routeFromToken.value) {
      importFromToken();
    } else if (routeToToken.value) {
      importToToken();
    }
  },
  {
    debounce: 200,
  },
);

const buttonState = computed(() => {
  if (swapStore.isBusy.value) {
    return { disabled: true, text: '...' };
  }

  if (swapStore.convertError) {
    return { disabled: true, text: swapStore.convertError };
  }

  if (!swapStore.fromCurrency.token || !swapStore.toCurrency.token) {
    return { disabled: true, text: 'Select coin' };
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
      text: `Insufficient ${fromBalance.alias.value} balance`,
    };
  }

  if (
    !toBalance.isExists.value &&
    !(toBalance.isFetching.value && toBalance.isFirstFetching.value)
  ) {
    return {
      disabled: false,
      text: `Register ${toBalance.alias.value} and Swap`,
    };
  }

  return {
    disabled: false,
    text: `Swap ${fromBalance.alias.value} to ${toBalance.alias.value}`,
  };
});

function submitForm(e: Event) {
  const isNextButton = (e.target as HTMLElement)?.enterKeyHint === 'next';
  const isSubmitDisabled = buttonState.value.disabled;
  const accountValue = account.value;
  const cancelEvent = Boolean(
    (isNextButton || isSubmitDisabled) && accountValue,
  );
  if (cancelEvent) return;

  const handler = !accountValue ? onConnectWallet : showSwapDialog;
  handler();
}

function onConnectWallet() {
  console.log('connect wallet dialog');
  mainStore.showDialog('connectWallet');
}

function toggleSwap() {
  swapStore.toggleCurrencies();
}

function showSwapDialog() {
  console.log('swap sconfirm dialog');
  mainStore.showDialog('swapConfirm');
}

function toggleConfig(e: Event) {
  settingsOverlay?.value &&
    settingsOverlay.value.toggle(e, overlayAnchor.value);
}

swapStore.check();
</script>

<style scoped lang="scss">
::v-deep(.curve-warning) {
  .p-inline-message-icon {
    display: none;
  }
}
.btn-config {
  background: transparent;
  border: none;
  cursor: pointer;
  width: 30px;

  .config-icon {
    display: block;
    width: 100%;
    transition: 0.25s;
    stroke: var(--text-color);

    @media screen and (max-width: 768px) {
      width: 20px;
      height: 20px;
    }
  }

  &:hover {
    .config-icon {
      stroke: var(--primary-color);
    }
  }
}

.container {
  max-width: 480px;
  flex-direction: column;
}

.swap-container,
.carousel-container {
  max-width: 480px;
  border-radius: 24px;
  min-height: 200px;
  color: white;
  background: var(--surface-card);
  box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
    rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
  margin-bottom: 20px;
}

.carousel-heading {
  font-size: 20px;
  font-weight: 500;
}
.carousel-header {
  padding: 40px 50px 0px 50px;
}
.carousel-close-container {
  position: relative;
}
.carousel-close {
  position: absolute;
  right: -40px;
  top: -30px;
  background: none;
  border: none;
  width: 2.62rem;
  height: 2.62rem;
  margin: 0.18rem;
  color: #d4c4ed;
  &:hover {
    background: none;
    border: none;
    color: white;
    background: #24243a;
    border-radius: 50%;
  }
}

.swap,
.carousel {
  &__header {
    padding: 1rem 1.25rem 0.5rem;

    display: flex;
    align-items: center;
    justify-content: center;

    & > div:last-child {
      margin-left: auto;
    }

    .slippage-input {
      text-decoration: underline;
      text-decoration-style: dotted;
    }
  }

  &__anchor {
    height: 1px;
    max-width: 1px;
    margin-left: 120px;
  }

  &__row {
    padding: 0 8px 8px;
  }

  &__button {
    width: 100%;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    height: 54px;
    font-size: 1.1rem;
    font-weight: 500;

    &.p-disabled {
      background: #24243a !important;
      opacity: 1;
      color: var(--surface-400) !important;
    }
  }

  &__toggle {
    position: absolute;
    padding: 4px;
    border-radius: 12px;
    height: 32px;
    width: 32px;
    margin-top: -18px;
    margin-bottom: -18px;
    left: calc(50% - 16px);
    background-color: #24243a;
    border: 6px solid var(--surface-card);
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    i {
      font-size: 12px;
      color: var(--surface-400);
    }
  }
}
</style>
