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

<style scoped lang="scss">
.swap-toggle {
  position: absolute;
  padding: 4px;
  border-radius: 12px;
  height: 32px;
  width: 32px;
  margin-top: -18px;
  margin-bottom: -18px;
  left: calc(50% - 16px);
  background-color: #24243a;
  border: 6px solid var(--surface-card);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  i {
    position: absolute;
    font-size: 12px;
    color: var(--surface-400);
    transition: all 0.3s ease;
    opacity: 1;
  }
  img {
    position: absolute;
    margin-top: 12px;
    opacity: 0;
    transition: all 0.3s ease;
  }
  &:hover {
    background-color: rgba(110, 66, 202, 1);
    border-color: rgba(110, 66, 202, 1);
    i {
      opacity: 0;
      bottom: 999px;
      margin-bottom: 12px;
    }
    img {
      margin-top: 0px;
      opacity: 1;
    }
  }
}
</style>
