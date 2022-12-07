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
<style lang="scss" scoped>
.warning-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  img {
    width: 64px;
    height: 64px;
    margin-bottom: 2rem;
  }
  &-content {
    display: flex;
    flex-direction: column;
    grid-gap: 8px;
    align-items: center;

    & > span:first-child {
      font-weight: 500;
      font-size: 20px;
      line-height: 24px;
      letter-spacing: 0.1px;
    }

    & > span:nth-child(2) {
      display: flex;
      align-items: center;
      text-align: center;
      font-size: 15px;
      line-height: 24px;
      font-weight: 400;
      color: #e5e4fa;
      width: 90%;
    }
  }
}
</style>
