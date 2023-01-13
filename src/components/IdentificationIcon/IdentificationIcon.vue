<template>
  <div
    ref="iconRef"
    class="identicon"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
      maxWidth: `${size}px`,
      maxWidth: `${size}px`,
    }"
  />
</template>

<script setup lang="ts">
import jazzicon from '@metamask/jazzicon';
import { computed, nextTick, toRef, watch, ref } from 'vue';

interface IProps {
  address: string;
  useHash?: boolean;
  size?: number | string;
}

const props = defineProps<IProps>();
const iconRef = ref<HTMLElement>();

const address = toRef(props, 'address');

function hashCode(s?: string): number {
  if (!s) {
    return 0;
  }

  const l = s.length;
  let h = 0,
    i = 0;
  if (l > 0) {
    while (i < l) h = ((h << 5) - h + s.charCodeAt(i++)) | 0;
  }

  return h;
}

const icon = computed(() => {
  const size = +(props?.size || 40);
  return jazzicon(size, hashCode(address.value));
});

watch(
  icon,
  () => {
    if (icon.value) {
      nextTick(() => {
        if (iconRef.value) {
          iconRef.value.innerHTML = '';
          iconRef.value?.appendChild(icon.value);
        }
      });
    }
  },
  { immediate: true, flush: 'post' },
);
</script>