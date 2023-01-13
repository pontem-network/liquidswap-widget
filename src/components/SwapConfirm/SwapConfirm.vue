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
import PInlineMessage from 'primevue/inlinemessage';

import { SendTransaction } from '@/components/Steps';
import SwapPreview from './SwapPreview.vue';
import SwapInfo from './SwapInfo.vue';
import { AptosTxPayload } from '@/types/aptosResources';
import { composeType } from '@/utils/contracts';
import { useSwapStore, useStore } from '@/store';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import { useTimeoutPoll } from '@vueuse/core';
import { RECALCULATION_TIME } from '@/constants/constants';
import {TAptosTxPayload} from "@pontem/liquidswap-sdk/src/types/aptos";

const emits = defineEmits(['success', 'reject', 'back', 'close']);

const swapStore = useSwapStore();
const { modules, curves, sdk } = useStore();

const view = ref<'root' | 'tx'>('root');
const ratesHasChanged = ref(false);
const cachedPayload = ref<AptosTxPayload>();

const payload = computed<AptosTxPayload>(() => sdk.value.Swap.createSwapTransactionPayload({
  fromToken: swapStore.fromCurrency.token as string,
  toToken: swapStore.toCurrency.token as string,
  fromAmount: swapStore.fromCurrency.amount as number,
  toAmount: swapStore.toCurrency.amount as number,
  interactiveToken: swapStore.lastInteractiveField,
  slippage: swapStore.slippage,
  stableSwapType: swapStore.stableSwapType,
  curveType: swapStore.curve === curves.stable ? 'stable' : 'uncorrelated',
}));

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

const isCurveStabe = computed(() => swapStore.curve === curves.stable);

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
