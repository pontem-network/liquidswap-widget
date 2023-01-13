<template>
  <p-button class="swap-toggle" type="button" @click="props.onClick">
    <img src="@/assets/swap.svg" />
    <i class="pi pi-arrow-down" />
  </p-button>
</template>

<script setup lang="ts">
import PButton from 'primevue/button';
  interface IProps {
    onClick(): void;
  }
  const props = defineProps<IProps>();
</script>
