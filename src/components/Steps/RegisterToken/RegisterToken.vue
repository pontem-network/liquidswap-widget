<template>
  <div v-if="view === 'root'" class="dialog-step">
    <DialogHeader :title="`Register ${token.symbol} token`" @close="onClose" />
    <div class="dialog-step__content">
      <img src="@/assets/connect.svg" alt="" />
      <p>
        Before you can receive {{ token.symbol }}, you need to register them on
        your account.
      </p>
    </div>
    <div class="dialog-step__footer">
      <div class="dialog-step__divider mb-3" />
      <p-button class="justify-content-center w-full" @click="onNext">
        Next
      </p-button>
    </div>
  </div>
  <SendTransaction
    v-if="view === 'tx'"
    :payload="tx"
    @back="onBack"
    @close="onClose"
    @success="onSuccess"
    @reject="onRejected"
  >
  </SendTransaction>
</template>

<script setup lang="ts">
import { useTokensStore } from '@/store';
import { computed, ref } from 'vue';
import { SendTransaction } from '@/components/Steps';
import { AptosTxPayload } from '@/types/aptosResources';
import { DialogHeader } from '@/components/DialogHeader';
import PButton from 'primevue/button';


interface IProps {
  token: string;
}

const props = defineProps<IProps>();
const emits = defineEmits(['success', 'reject', 'back', 'close']);
const tokensStore = useTokensStore();

const view = ref<'root' | 'tx'>('root');
const token = computed(() => {
  return tokensStore.getToken(props.token);
});

const tx = computed<AptosTxPayload>(() => ({
  type: 'entry_function_payload',
  function: '0x1::managed_coin::register',
  typeArguments: [props.token],
  arguments: [],
}));

function onClose() {
  view.value = 'root';
  emits('close');
}

function onNext() {
  view.value = 'tx';
}

function onBack() {
  view.value = 'root';
}

function onSuccess() {
  emits('success');
  view.value = 'root';
}

function onRejected() {
  emits('reject');
  view.value = 'root';
}
</script>

<style scoped></style>
