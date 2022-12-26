<template>
  <SwapPreview
    v-if="view === 'root'"
    @confirm="onSwapConfirm"
    @close="onClose"
  ></SwapPreview>
  <SendTransaction
    v-if="view === 'tx'"
    title="Swap Coins"
    :payload="payload"
    :stable="isCurveStabe"
    @back="onBack"
    @close="onClose"
    @success="onSuccess"
    @reject="onRejected"
  >
    <template #tx-params>
      <SwapInfo />
      <PInlineMessage v-if="ratesHasChanged" class="mt-3" severity="warn"
        >The rate has changed, check it before sending the
        transaction</PInlineMessage
      >
    </template>
  </SendTransaction>
</template>

<script lang="ts" setup>
import { computed, ref, unref, watch } from 'vue';
import { SendTransaction } from '@/components/Dialogs/Steps';
import SwapPreview from './SwapPreview.vue';
import SwapInfo from './SwapInfo.vue';
import { AptosTxPayload } from '@/types/aptosResources';
import { composeType } from '@/utils/contracts';
import { useSwapStore } from '@/store';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import { useTimeoutPoll } from '@vueuse/core';
import { moduleAddress } from '@/utils/networkData';
import { CURVE_STABLE } from '@/constants/networks';
import { RECALCULATION_TIME } from '@/constants';

const emits = defineEmits(['success', 'reject', 'back', 'close']);

const swapStore = useSwapStore();

const view = ref<'root' | 'tx'>('root');
const ratesHasChanged = ref(false);
const cachedPayload = ref<AptosTxPayload>();
const payload = computed<AptosTxPayload>(() => {
  const isUnchecked =
    swapStore.curve === CURVE_STABLE && swapStore.stableSwapType === 'normal';

  const functionName = composeType(
    moduleAddress('Scripts'),
    isUnchecked
      ? 'swap_unchecked'
      : swapStore.lastInteractiveField === 'from'
      ? 'swap'
      : 'swap_into',
  );
  const typeArguments = [
    swapStore.fromCurrency.token as string,
    swapStore.toCurrency.token as string,
    swapStore.curve,
  ];
  if (
    (!swapStore.fromCurrency?.amount &&
      swapStore.lastInteractiveField === 'from') ||
    (!swapStore.toCurrency?.amount && swapStore.lastInteractiveField === 'to')
  )
    return;
  const fromAmount =
    swapStore.lastInteractiveField === 'from'
      ? (swapStore.fromCurrency.amount as number).toString()
      : swapStore.slippageAmount?.toFixed(0);
  const toAmount =
    swapStore.lastInteractiveField === 'to'
      ? (swapStore.toCurrency.amount as number).toString()
      : swapStore.slippageAmount?.toFixed(0);

  const args = [fromAmount, toAmount];

  return {
    type: 'entry_function_payload',
    function: functionName,
    typeArguments: typeArguments,
    arguments: args,
  };
});

watch(
  [payload, cachedPayload],
  () => {
    if (!payload.value || !cachedPayload.value) {
      ratesHasChanged.value = false;
      return;
    }

    ratesHasChanged.value = !isEqual(payload.value, cachedPayload.value);
  },
  { deep: true },
);

useTimeoutPoll(() => swapStore.refetchRates(true), RECALCULATION_TIME, {
  immediate: true,
});

const isCurveStabe = computed(() => swapStore.curve === CURVE_STABLE);

function onSwapConfirm() {
  cachedPayload.value = cloneDeep(unref(payload.value));
  view.value = 'tx';
}

function onBack() {
  view.value = 'root';
  cachedPayload.value = undefined;
}

function onClose() {
  onBack();
  emits('close');
}

function onSuccess() {
  emits('success');
}

function onRejected() {
  emits('reject');
}
</script>

<style scoped lang="scss"></style>
