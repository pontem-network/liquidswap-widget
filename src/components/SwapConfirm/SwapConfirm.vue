<template>
  <SwapPreview
    v-if="view === 'root'"
    @confirm="onSwapConfirm"
    @close="onClose"
  >
  </SwapPreview>
  <SendTransaction
    v-if="view === 'tx'"
    title="Swap Tokens"
    :payload="payload"
    :stable="isCurveStable"
    @back="onBack"
    @close="onClose"
    @success="onSuccess"
    @reject="onRejected"
    :frontrun="isFrontrun"
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
import PInlineMessage from 'primevue/inlinemessage';

import { SendTransaction } from '@/components/Steps';
import SwapPreview from './SwapPreview.vue';
import SwapInfo from './SwapInfo.vue';
import { AptosTxPayload } from '@/types/aptosResources';
import { useSwapStore, useStore } from '@/store';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import { useTimeoutPoll } from '@vueuse/core';
import { RECALCULATION_TIME } from '@/constants/constants';
import { TVersionType } from "@/types";
import { getCurve, getShortCurveFromFull } from "@/utils/contracts";

const emits = defineEmits(['success', 'reject', 'back', 'close']);

const swapStore = useSwapStore();
const mainStore = useStore();
const { sdk } = mainStore;

const curveType = getShortCurveFromFull(swapStore.curve);

const isFrontrun = computed(() => swapStore.isFrontrunEnable);

const view = ref<'root' | 'tx'>('root');
const ratesHasChanged = ref(false);
const cachedPayload = ref<AptosTxPayload>();

const feeData = computed(() => mainStore.feeData.value);

const feeBasisPoint = computed( () => {
  if (feeData.value) {
    return feeData.value.feeBasisPoint;
  }
  return null;
})

const payload = computed<AptosTxPayload>(() => {
  const _payload = sdk.value.Swap.createSwapTransactionPayload({
    fromToken: swapStore.fromCurrency.token as string,
    toToken: swapStore.toCurrency.token as string,
    fromAmount: swapStore.fromCurrency.amount as number,
    toAmount: swapStore.toCurrency.amount as number,
    interactiveToken: swapStore.lastInteractiveField,
    slippage: swapStore.slippage,
    stableSwapType: swapStore.stableSwapType,
    curveType: curveType as 'stable' | 'uncorrelated',
    version: swapStore.version as TVersionType,
  })

  const clonedPayload = cloneDeep(_payload);

  if (feeData.value) {
      const [, router, fn] = clonedPayload.function.split('::');
      const key = `${router}::${fn}`;
      //@ts-ignore
      const struct = feeData.value?.feeStruct[key];
      clonedPayload.function = struct;
  }

  return clonedPayload;
});

watch(
  [cachedPayload, payload],
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

const isCurveStable = computed(() => swapStore.curve === getCurve('stable', swapStore.version));

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
