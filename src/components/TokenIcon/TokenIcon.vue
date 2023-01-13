<template>
  <component
    :is="props.logo ? 'img' : IdentificationIcon"
    v-bind="tokenImageProps"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { IdentificationIcon } from '../IdentificationIcon';

interface IProps {
  logo?: string;
  type?: string;
  size?: string;
  class?: string;
}

const props = defineProps<IProps>();
const tokenImageProps = computed(() =>
  props.logo
    ? { src: props.logo }
    : { size: props.size, address: props.type, class: props.class },
);
</script>
