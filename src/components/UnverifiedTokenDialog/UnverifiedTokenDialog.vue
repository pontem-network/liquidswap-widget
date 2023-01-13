<template>
  <PDialog
    v-model:visible="display"
    :draggable="false"
    :modal="true"
    :closable="false"
    :show-header="false"
    :style="{ maxWidth: '483px' }"
    class="stepped-dialog stepped-dialog--panel"
  >
    <div class="warning-container">
      <img src="@/assets/alert.svg" alt="" />
      <div class="warning-container-content">
        <span>Use at your own risk!</span>
        <span
          >Caution! This token is new and unverified. It can contain critical
          issues and/or be very volatile. Interact with it at your own
          risk.</span
        >
        <PButton
          class="w-full relative flex footer-button justify-content-center border-round-3xl mt-3"
          @click="onClose"
        >
          Continue
        </PButton>
      </div>
    </div>
  </PDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PDialog from 'primevue/dialog';
import PButton from 'primevue/button';

import { useUnverifiedCoins } from '@/composables/useUnverifiedCoins';

const uc = useUnverifiedCoins();
const display = ref(false);

const emits = defineEmits(['close']);

function checkAndShow(token: string) {
  if (uc.checkAndConfirm(token)) {
    return;
  }
  show();
}

function show() {
  display.value = true;
}

function hide() {
  display.value = false;
}

function onClose() {
  display.value = false;
  emits('close');
}

defineExpose({
  hide,
  checkAndShow,
});
</script>
