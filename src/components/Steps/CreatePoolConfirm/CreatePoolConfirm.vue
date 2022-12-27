<template>
  <CreatePoolPreview
    v-if="view === 'root'"
    @confirm="onCreateConfirm"
    @close="onClose"
  ></CreatePoolPreview>
  <SendTransaction
    v-if="view === 'tx'"
    title="Create Pool"
    :payload="payload"
    :stable="isCurveStabe"
    @back="onBack"
    @close="onClose"
    @success="onSuccess"
    @reject="onRejected"
  >
    <template #tx-params>
      <CreatePoolInfo />
    </template>
  </SendTransaction>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { SendTransaction } from '@/components/Steps';
import CreatePoolPreview from './CreatePoolPreview.vue';
import CreatePoolInfo from './CreatePoolInfo.vue';
import { TxPayloadCallFunction } from '@/types/aptosResources';
import { composeType, withSlippage } from '@/utils/contracts';
import { useCreatePoolStore, useStore } from '@/store';
import { CURVE_STABLE } from '@/constants';

const emits = defineEmits(['success', 'reject', 'back', 'close']);

const createPoolStore = useCreatePoolStore();

const view = ref<'root' | 'tx'>('root');

const { modules } = useStore();

const payload = computed<TxPayloadCallFunction>((): TxPayloadCallFunction => {
  const functionName = composeType(
      modules.Scripts,
    'register_pool_and_add_liquidity',
  );

  const fromAmount = createPoolStore.fromCurrency.amount?.toString();
  const toAmount = createPoolStore.toCurrency.amount?.toString();
  const fromAmountWithSlippage = withSlippage(
    createPoolStore.slippage,
    createPoolStore.fromCurrency.amount as number,
  ).toFixed(0);
  const toAmountWithSlippage = withSlippage(
    createPoolStore.slippage,
    createPoolStore.toCurrency.amount as number,
  ).toFixed(0);

  const args = createPoolStore.isSorted
    ? ([
        fromAmount,
        fromAmountWithSlippage,
        toAmount,
        toAmountWithSlippage,
      ] as string[])
    : ([
        toAmount,
        toAmountWithSlippage,
        fromAmount,
        fromAmountWithSlippage,
      ] as string[]);
  const typeArguments = createPoolStore.isSorted
    ? [
        createPoolStore.fromCurrency.token,
        createPoolStore.toCurrency.token,
        createPoolStore.curve,
      ]
    : [
        createPoolStore.toCurrency.token,
        createPoolStore.fromCurrency.token,
        createPoolStore.curve,
      ];

  return {
    type: 'entry_function_payload',
    function: functionName,
    typeArguments,
    arguments: args,
  } as TxPayloadCallFunction;
});

const isCurveStabe = computed(() => createPoolStore.curve === CURVE_STABLE);

function onCreateConfirm() {
  view.value = 'tx';
}

function onBack() {
  view.value = 'root';
}

function onClose() {
  onBack();
  emits('close');
}

function onSuccess() {
  createPoolStore.check();
  emits('success');
}

function onRejected() {
  emits('reject');
}
</script>

<style scoped lang="scss"></style>
