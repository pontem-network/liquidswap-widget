<template>
  <div class="stable-switch-container">
    <div
      class="stable-switch-container__switch"
      :class="{
        isSelected: store.curve === CURVE_UNCORRELATED,
        busy: isBusy,
      }"
      @click="switchSelected(CURVE_UNCORRELATED)"
    >
      <img src="@/assets/curves/uncorrelated.svg" alt="uncorrelated curve" />
      <p>Uncorrelated</p>
      <i v-tooltip="'Using x*y=K formula'" class="pi pi-info-circle" />
    </div>

    <div
      :class="{
        isSelected: store.curve === CURVE_STABLE,
        busy: isBusy,
      }"
      class="stable-switch-container__switch"
      @click="switchSelected(CURVE_STABLE)"
    >
      <img
        :style="{ marginTop: '-2px', marginBottom: '2px' }"
        src="@/assets/curves/stable.svg"
        alt="stable curve"
      />
      <p>Stable</p>
      <i
        v-tooltip="'Using formula optimized for stable coins swaps'"
        class="pi pi-info-circle"
      />
    </div>
    <PToast position="top-right" group="tr" />
  </div>
</template>
<script setup lang="ts">
import { computed, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import PToast from 'primevue/toast';
import { CURVE_UNCORRELATED, CURVE_STABLE } from '@/constants/constants';
import {
  useSwapStore,
  useTokensStore,
} from '@/store';

interface IProps {
  curve?: string;
}

const props = defineProps<IProps>();

const toast = useToast();

const store = useSwapStore();
const tokenStore = useTokensStore();

const isBusy = computed(() =>
  store.isBusy !== undefined ? store.isBusy.value : false,
);

const switchSelected = (curve: string) => {
  if (isBusy.value === true) return;
  store.curve = curve;
};


watch(
  [
    () => store.fromCurrency.token,
    () => store.toCurrency.token,
    () => store.curve,
  ],
  () => {
    if (
      store.curve === CURVE_STABLE &&
      (tokenStore.tokens[store.fromCurrency.token as string]?.decimals > 8 ||
        tokenStore.tokens[store.toCurrency.token as string]?.decimals > 8)
    ) {
      toast.removeGroup('tr');
      toast.add({
        severity: 'warn',
        summary: 'Warning!',
        detail:
          'If one of the coin in stable swap pair has more than 8 decimals it could bring inaccuracy for swaps logic, be careful.',
        life: 3000,
        group: 'tr',
      });
    }
  },
  { deep: true },
);
</script>
<style scoped lang="scss">
.stable-switch-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px;
  gap: 4px;
  background: #272742;
  border-radius: 57px;
  width: 100%;

  &__switch {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 4px 10px;
    gap: 8px;
    width: 100%;
    cursor: pointer;
    transition: all 0.5s linear;
    &.busy {
      cursor: default;
      opacity: 0.5;
    }

    p {
      font-family: var(--font-family);
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 120%;
      color: #ffffff;
      margin-block: 0rem;
    }
    i {
      opacity: 0.5;
    }
  }
}

.isSelected {
  background: #4d4d70;
  border-radius: 57px;
}
</style>
