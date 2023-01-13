<template>
  <div v-if="isAvailable" class="swap-gas-switch mt-3">
    <div
      class="gas-option"
      :class="{ active: type === 'high' }"
      @click="switchType('high')"
    >
      <div class="option-inner">
        <div class="option-top">
          <div class="option-marker"></div>
          <span>High Gas</span>
        </div>
        <p>If best price appears, it&nbsp;will be used.</p>
      </div>
    </div>
    <div
      class="gas-option"
      :class="{ active: type === 'normal' }"
      @click="switchType('normal')"
    >
      <div class="option-inner">
        <div class="option-top">
          <div class="option-marker"></div>
          <span>Normal Gas</span>
        </div>
        <p>You will receive at least expected output.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useStore, useSwapStore} from '@/store';
import { TStableSwapType } from '@/types';
import { computed, ref } from 'vue';

const swapStore = useSwapStore();
const { curves } = useStore();
const isAvailable = computed(() => swapStore.curve === curves.stable);
const type = ref<TStableSwapType>('normal');

function switchType(_type: TStableSwapType) {
  type.value = _type;
  swapStore.stableSwapType = _type;
}
</script>