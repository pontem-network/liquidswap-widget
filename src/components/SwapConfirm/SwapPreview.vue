<template>
  <div class="dialog-step">
    <DialogHeader title="Swap Tokens" @close="onClose" />
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
            {{ titleForTokenSymbol(fromToken) }}
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
            {{ titleForTokenSymbol(toToken) }}
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
import { titleForTokenSymbol } from '@/utils/tokens';

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
  { useBridge: false, useSuffix: false },
);
const toAmount = useCurrencyFormat(
  computed(() => swapStore.toCurrency.amount),
  computed(() => swapStore.toCurrency.token),
  { useBridge: false, useSuffix: false },
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
