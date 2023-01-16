<template>
  <div v-show="display" class="notifications-dialog" :style="animation">
    <img src="@/assets/check.svg" />
    <p>Copied</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const NOTIFICATION_DURATION = 1000;

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
