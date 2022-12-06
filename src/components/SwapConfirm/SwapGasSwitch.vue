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
import { CURVE_STABLE } from '@/constants/networks';
import { useSwapStore } from '@/store';
import { TStableSwapType } from '@/types';
import { computed, ref } from 'vue-demi';

const swapStore = useSwapStore();
const isAvailable = computed(() => swapStore.curve === CURVE_STABLE);
const type = ref<TStableSwapType>('normal');

function switchType(_type: TStableSwapType) {
  type.value = _type;
  swapStore.stableSwapType = _type;
}
</script>

<style lang="scss" scoped>
.swap-gas-switch {
  display: flex;
  justify-content: space-between;
}

.gas-option {
  cursor: pointer;
  border-radius: 8px;
  position: relative;
  max-width: calc(50% - 8px);
  padding: 1px;
  z-index: inherit;
  box-sizing: border-box;

  $border: 1px;

  &:before {
    content: ' ';
    display: block;
    position: absolute;
    top: -$border;
    right: -$border;
    bottom: -$border;
    left: -$border;
    z-index: 0;
    border-radius: inherit;
    transition: 0.25s;
    background: linear-gradient(to right, #6e42ca, #8d29c1);
    opacity: 0.6;
  }
  &:after {
    content: ' ';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    background: #28253e;
    border-radius: inherit;
    z-index: 1;
  }

  .option-inner {
    padding: 1px;
    position: relative;
    z-index: 2;
    padding: 12px;
    p {
      margin: 0;
    }
  }

  &.active:before,
  &:hover:before {
    opacity: 1;
  }

  p {
    font-weight: 500;
    font-size: 13px;
    line-height: 15px;
    color: #e5e4fa;
    opacity: 0.7;
  }
}

.option-top {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 4px;

  span {
    font-weight: 500;
    font-size: 13px;
    line-height: 20px;
  }
}

.option-marker {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1.5px solid #d4c4ed;
  margin-right: 4px;
  transition: 0.25s;
}

.gas-option.active {
  .option-marker {
    background: #ffffff;
    border: 5px solid #6e42ca;
  }
}
</style>
