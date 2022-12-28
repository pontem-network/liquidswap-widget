<template>
  <div class="dialog-step">
    <DialogHeader title="Swap Coins" @close="onClose" />
    <div class="dialog-step__content">
      <div class="swap-tokens">
        <div class="swap-tokens__token">
          <div class="swap-tokens__value">{{ fromAmount.formatted.value }}</div>
          <div class="swap-tokens__symbol">
            <TokenIcon
              :logo="fromToken?.logo"
              :type="fromToken?.type"
              class="img"
              size="24"
            />
            {{ fromAmount.alias.value }}
          </div>
        </div>
        <div class="swap-tokens__toggle">
          <div>
            <i class="pi pi-arrow-down" />
          </div>
        </div>
        <div class="swap-tokens__token">
          <div class="swap-tokens__value">{{ toAmount.formatted.value }}</div>
          <div class="swap-tokens__symbol">
            <TokenIcon
              :logo="toToken?.logo"
              :type="toToken?.type"
              class="img"
              size="24"
            />
            {{ toAmount.alias.value }}
          </div>
        </div>
      </div>
      <SwapGasSwitch />
      <SwapInfo />
    </div>
    <div class="dialog-step__footer mt-3">
      <p-button
        class="swap-tokens__button"
        :class="{
          'rate-changed': buttonState.rateChanged,
        }"
        @click="onConfirm"
      >
        <span> {{ buttonState.text }} </span>
        <div class="progress" :style="animation"></div>
      </p-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DialogHeader } from '@/components/DialogHeader';
import { TokenIcon } from '@/components/TokenIcon';
import { useCurrencyFormat } from '@/composables/useCurrencyFormat';
import { ANIMATION_PAUSE_TIME, LOADING_ANIMATION_TIME } from '@/constants/constants';
import { useSwapStore, useTokensStore } from '@/store';
import { computed, ref, watch } from 'vue';
import SwapGasSwitch from './SwapGasSwitch.vue';
import SwapInfo from './SwapInfo.vue';

import PButton from "primevue/button";

const emits = defineEmits(['close', 'confirm']);

const swapStore = useSwapStore();
const tokensStore = useTokensStore();

const ratesHasChanged = ref(false);
const animationPause = ref(false);

const inputTokens = computed(() => swapStore.fromCurrency.amount);
const outputTokens = computed(() => swapStore.toCurrency.amount);

const inputCache = ref(swapStore.fromCurrency.amount);
const outputCache = ref(swapStore.toCurrency.amount);

const fromToken = computed(() =>
  swapStore.fromCurrency.token
    ? tokensStore.getToken(swapStore.fromCurrency.token)
    : undefined,
);
const toToken = computed(() =>
  swapStore.toCurrency.token
    ? tokensStore.getToken(swapStore.toCurrency.token)
    : undefined,
);

const isDanger = computed(
  () =>
    (outputTokens.value &&
      outputCache.value &&
      outputTokens.value < outputCache.value) ||
    (inputTokens.value &&
      inputCache.value &&
      inputTokens.value > inputCache.value),
);

const buttonState = computed(() => {
  if (ratesHasChanged.value) {
    return { rateChanged: true, text: 'Note price significantly changed' };
  }
  return { text: 'Confirm Swap' };
});

const animation = ref(
  buttonState.value.rateChanged
    ? {
        animation: 'progress ' + LOADING_ANIMATION_TIME + 'ms ease 0s',
      }
    : undefined,
);

const fromAmount = useCurrencyFormat(
  computed(() => swapStore.fromCurrency.amount),
  computed(() => swapStore.fromCurrency.token),
  { useSuffix: false },
);
const toAmount = useCurrencyFormat(
  computed(() => swapStore.toCurrency.amount),
  computed(() => swapStore.toCurrency.token),
  { useSuffix: false },
);

function onClose() {
  emits('close');
}

function onConfirm() {
  emits('confirm');
}

watch(
  () => [outputTokens.value, inputTokens.value],
  () => {
    if (isDanger.value && !animationPause.value) {
      ratesHasChanged.value = true;
      animationPause.value = true;
      setTimeout(() => {
        ratesHasChanged.value = false;
      }, LOADING_ANIMATION_TIME);
      setTimeout(() => {
        animationPause.value = false;
      }, LOADING_ANIMATION_TIME + ANIMATION_PAUSE_TIME);
    }
    outputCache.value = outputTokens.value;
    inputCache.value = inputTokens.value;
  },
);
</script>

<style scoped lang="scss">
.swap-tokens {
  display: flex;
  width: 100%;
  flex-direction: column;

  &__token {
    display: flex;
    padding: 16px;
    background: #24243a;
    border-radius: 16px;
    align-items: center;

    &:first-child {
      margin-bottom: 8px;
    }
  }

  &__symbol {
    display: flex;
    margin-left: auto;
    align-items: center;

    font-size: 15px;
    letter-spacing: 0.05em;
    color: var(--text-color);
    font-weight: 500;

    img,
    .img {
      width: 24px;
      height: 24px;
      margin-right: 8px;
    }
  }

  &__value {
    color: var(--text-color);
    font-size: 30px;
    font-weight: 500;
    padding-right: 16px;

    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__toggle {
    position: relative;
    div {
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
        color: var(--text-color);
        font-weight: 800;
      }
    }
  }

  &__button {
    width: 100%;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    height: 44px;

    span {
      position: absolute;
      margin: auto;
      text-align: center;
      z-index: 2;
      opacity: 1;
    }

    .progress {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      width: 0%;
      background: #946bec;
      opacity: 0;
      transition: all 0.3s ease;
    }

    &.rate-changed {
      cursor: none;
      pointer-events: none;
    }

    &.rate-changed .progress {
      opacity: 1;
      animation: progress 2s linear 0s;
    }

    @keyframes progress {
      0% {
        width: 0%;
      }
      5% {
        width: 0%;
      }
      10% {
        width: 15%;
      }
      30% {
        width: 40%;
      }
      50% {
        width: 55%;
      }
      80% {
        width: 100%;
      }
      98% {
        width: 100%;
        opacity: 1;
      }
      100% {
        width: 100%;
        opacity: 0;
      }
    }
  }
}
</style>
