<template>
  <div v-show="display" class="notifications-dialog" :style="animation">
    <img src="@/assets/check.svg" />
    <p>Copied</p>
  </div>
</template>

<script setup lang="ts">
import { NOTIFICATION_DURATION } from '@/constants';
import { computed, ref } from 'vue';

const display = ref(false);

const animation = computed(() =>
  display.value
    ? {
        animation: 'in-out ' + NOTIFICATION_DURATION + 'ms ease 0s',
      }
    : undefined,
);

function show() {
  display.value = true;
  setTimeout(() => {
    hide();
  }, NOTIFICATION_DURATION);
}

function hide() {
  display.value = false;
}

defineExpose({
  show,
  hide,
});
</script>
<style lang="scss">
.notifications-dialog {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 13.5rem;
  height: 13.5rem;
  border-radius: 32px;
  background: #28253e;
  z-index: 99;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  row-gap: 1.5rem;
  box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.25);

  p {
    font-size: 22px;
    font-weight: 600;
    text-align: center;
    margin: 0;
  }
}

@keyframes in-out {
  0% {
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
