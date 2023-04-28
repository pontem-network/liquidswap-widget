<template>
  <div class="stable-switch-container">
    <div
      class="stable-switch-container__switch"
      :class="{
        isSelected: store.curve === curveUncorrelated,
        busy: isBusy,
      }"
      @click="switchSelected(curveUncorrelated)"
    >
      <img src="../../assets/curves/uncorrelated.svg" alt="uncorrelated curve" />
      <p>Uncorrelated</p>
      <ToolTip position="top" :tooltipText="'Using x*y=K formula'">
        <i class="pi pi-info-circle" :style="{ paddingTop: '2px' }"/>
      </ToolTip>
    </div>

    <div
      :class="{
        isSelected: store.curve === curveStable,
        busy: isBusy,
      }"
      class="stable-switch-container__switch"
      @click="switchSelected(curveStable)"
    >
      <img
        :style="{ marginTop: '-2px', marginBottom: '2px' }"
        src="../../assets/curves/stable.svg"
        alt="stable curve"
      />
      <p>Stable</p>
      <ToolTip position="top-left" :tooltipText="'Using formula optimized for stable coins swaps'">
        <i class="pi pi-info-circle" :style="{ paddingTop: '2px'}"/>
      </ToolTip>
    </div>
    <PToast position="top-right" group="tr" />
  </div>
</template>
<script setup lang="ts">
import { computed, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import PToast from 'primevue/toast';
import ToolTip from '@/components/ToolTip/Tooltip.vue';
import {
  useSwapStore,
  useTokensStore,
} from '@/store';
import { getCurve } from '@/utils/contracts';

const toast = useToast();

const store = useSwapStore();
const tokenStore = useTokensStore();

const version = computed(() => store.version);
const curveStable = computed(() => getCurve('stable', version.value));
const curveUncorrelated = computed(() => getCurve('uncorrelated', version.value));

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
    () => store.version,
  ],
  () => {
    if (
      store.curve === curveStable.value &&
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
