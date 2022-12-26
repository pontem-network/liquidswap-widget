<template>
  <ConfirmTransaction
    v-if="view === 'confirm'"
    :tx="tx"
    :max-gas-amount="gas"
    @close="onClose"
    @submitted="onSubmitted"
    @rejected="onRejected"
  />
  <SubmitTransaction
    v-else-if="view === 'submit'"
    :state="txState"
    @close="onClose"
    @success="onSuccess"
    @reject="onError"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import ConfirmTransaction from './ConfirmTransaction.vue';
import SubmitTransaction from './SubmitTransaction.vue';
import { AptosCreateTx, AptosTxPayload } from '@/types/aptosResources';
import { useStore } from '@/store';
import { useWatchTransaction } from '@/composables/useWatchTransaction';

interface IProps {
  payload: AptosTxPayload;
  title?: string;
  description?: string;
  gas?: number;
  maxGas?: number;
  minGas?: number;
  gasPrice?: number;
  maxGasPrice?: number;
  minGasPrice?: number;
  stable?: boolean;
}

const props = defineProps<IProps>();
const emits = defineEmits(['close', 'back', 'success', 'reject']);

const mainStore = useStore();

const view = ref<'params' | 'confirm' | 'submit'>('confirm');

const txHash = ref<string | undefined>();
const txState = ref();

useWatchTransaction(txHash, {
  onComplete(state) {
    txState.value = {
      tx: state,
      status: state.success ? 'success' : 'failed',
    };
    view.value = 'submit';
  },
});

const tx = computed<AptosCreateTx>(() => {
  return {
    sender: mainStore.account?.value?.address,
    payload: props.payload,
  } as AptosCreateTx;
});

function resetState() {
  view.value = 'confirm';
  txState.value = undefined;
  txHash.value = undefined;
}

function onClose() {
  emits('close');
  resetState();
}

function onError() {
  emits('reject', txState.value);
  resetState();
}

function onSuccess() {
  emits('success', txState.value);
  resetState();
}

function onSubmitted(hash: string) {
  txHash.value = hash;
}

function onRejected(reason: { code: number; message: string }) {
  let message = reason.message;

  if (reason.code === 4001) {
    message = 'Transaction rejected by user in Wallet.';
  }

  txState.value = {
    tx: undefined,
    status: 'failed',
    message,
  };
  view.value = 'submit';
}
</script>
