<template>
  <div class="stable-switch-container">
    <div
      class="stable-switch-container__switch"
      :class="{
        isSelected: store.curve === curves.uncorrelated,
        busy: isBusy,
      }"
      @click="switchSelected(curves.uncorrelated)"
    >
      <img src="@/assets/curves/uncorrelated.svg" alt="uncorrelated curve" />
      <p>Uncorrelated</p>
      <i v-tooltip="'Using x*y=K formula'" class="pi pi-info-circle" />
    </div>

    <div
      :class="{
        isSelected: store.curve === curves.stable,
        busy: isBusy,
      }"
      class="stable-switch-container__switch"
      @click="switchSelected(curves.stable)"
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
  useStore,
  useSwapStore,
  useTokensStore,
} from '@/store';

interface IProps {
  curve?: string;
}

const props = defineProps<IProps>();

const toast = useToast();
const { curves } = useStore();
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
      store.curve === curves.stable &&
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
