<template>
  <div v-if="view === 'root'" class="dialog-step">
    <DialogHeader title="Install module" @close="onClose" />
    <div class="dialog-step__content">
      <img src="@/assets/connect.svg" alt="" />
      <p>
        You must install the module before proceeding. Click Next to continue
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
import { computed, ref } from 'vue';
import { SendTransaction } from '@/components/Dialogs/Steps';
import { AptosTxPayload } from '@/types/aptosResources';
import { addHexPrefix } from '@/utils';
import DialogHeader from '@/components/UI/DialogHeader/DialogHeader.vue';

interface IProps {
  modules: string[];
}

const props = defineProps<IProps>();
const emits = defineEmits(['success', 'reject', 'back', 'close']);

const view = ref<'root' | 'tx'>('root');

const tx = computed<AptosTxPayload>(() => ({
  type: 'module_bundle_payload',
  modules: props.modules.map((value: string) => ({
    bytecode: addHexPrefix(value),
  })),
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
