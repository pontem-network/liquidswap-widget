<template>
  <div class="dialog-step__header">
    <p-button
      v-if="!!props.hasBack"
      class="dialog-step__button mr-auto"
      icon="pi pi-arrow-left"
      @click="onBack"
    />
    <div v-else class="dialog-step__back-btn-placeholder"></div>
    <span class="dialog-step__title dialog-step__title--position">{{
      props.title
    }}</span>
    <p-button
      class="dialog-step__button ml-auto"
      icon="pi pi-times"
      @click="onClose"
    />
  </div>
</template>

<script setup lang="ts">
import PButton from 'primevue/button';

interface IProps {
  title: string;
  hasBack?: boolean;
}

const props = defineProps<IProps>();
const emits = defineEmits(['close', 'back']);

const onClose = () => {
  emits('close');
};

const onBack = () => {
  emits('back');
};
</script>
