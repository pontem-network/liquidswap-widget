<template>
  <component
      :is="props.logo ? 'img' : IdentificationIcon"
      v-bind="tokenImageProps"
      @error="handleBrokenImage"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { computed } from 'vue-demi';
import { IdentificationIcon } from '../IdentificationIcon';
import unknownIcon from '@/assets/tokens/unknown.svg';

interface IProps {
  logo?: string;
  type?: string;
  size?: string;
  class?: string;
}

const isImageBroken = ref(false);
const props = defineProps<IProps>();
const tokenImageProps = computed(() =>
    props.logo
        ? {
          src: isImageBroken.value ? unknownIcon : props.logo,
          size: props.size,
          class: props.class,
        }
        : { size: props.size, address: props.type, class: props.class },
);

const handleBrokenImage = () => {
  isImageBroken.value = true;
};
</script>
