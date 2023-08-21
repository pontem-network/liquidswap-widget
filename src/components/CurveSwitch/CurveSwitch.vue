<template>
  <div class="stable-switch-container">
    <div
      class="stable-switch-container__switch"
      :class="{
        isSelected: store.curve === curveUnstable,
        busy: isBusy,
      }"
      data-tid="curve-switch-uncorrelated"
      :disabled="isUnstablePoolAbsent"
      @click="!isUnstablePoolAbsent && switchSelected(curveUnstable)"
    >
      <img src="../../assets/curves/uncorrelated.svg" alt="uncorrelated curve" />
      <p>Uncorrelated</p>
      <ToolTip position="top" :tooltipText="'Using x*y=K formula'">
        <i class="pi pi-info-circle" :style="{ paddingTop: '2px' }" />
      </ToolTip>
    </div>

    <div
      :class="{
        isSelected: store.curve === curveStable,
        busy: isBusy,
      }"
      :disabled="isStablePoolAbsent"
      class="stable-switch-container__switch"
      data-tid="curve-switch-stable"
      @click="!isStablePoolAbsent && switchSelected(curveStable)"
    >
      <img
        :style="{ marginTop: '-2px', marginBottom: '2px' }"
        src="../../assets/curves/stable.svg"
        alt="stable curve"
      />
      <p>Stable</p>
      <ToolTip position="top-left" :tooltipText="'Using formula optimized for stable tokens swaps'">
        <i class="pi pi-info-circle" :style="{ paddingTop: '2px' }" />
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
import { useSwapStore, useTokensStore } from '@/store';
import { getCurve } from '@/utils/contracts';
import { TCurveType } from '@/types';
import { usePoolExistence } from '@/composables/usePoolExistence';

const toast = useToast();

const store = useSwapStore();
const tokenStore = useTokensStore();
const poolExistence = usePoolExistence();

interface IProps {
  curve?: string;
  version?: number;
}

defineProps<IProps>();

const version = computed(() => store.version);
const curveStable = computed(() => getCurve('stable', version.value));
const curveUnstable = computed(() => getCurve('unstable', version.value));
const isBusy = computed(() => (store.isBusy !== undefined ? store.isBusy.value : false));

const isStableV0PoolAbsent = computed(() => computeIsPoolAbsent('stable', 0));
const isStableV05PoolAbsent = computed(() => computeIsPoolAbsent('stable', 0.5));
const isStablePoolAbsent = computed(() => isStableV0PoolAbsent.value && isStableV05PoolAbsent.value);
const isUnstableV0PoolAbsent = computed(() => computeIsPoolAbsent('unstable', 0));
const isUnstableV05PoolAbsent = computed(() => computeIsPoolAbsent('unstable', 0.5));
const isUnstablePoolAbsent = computed(
  () => isUnstableV0PoolAbsent.value && isUnstableV05PoolAbsent.value,
);

watch(
  [() => store.fromCurrency.token, () => store.toCurrency.token, () => store.curve, () => store.version],
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
          'If one of the token in stable swap pair has more than 8 decimals it could bring inaccuracy for swaps logic, be careful.',
        life: 3000,
        group: 'tr',
      });
    }

    checkPoolExistence('stable', 0);
    checkPoolExistence('stable', 0.5);

    checkPoolExistence('unstable', 0);
    checkPoolExistence('unstable', 0.5);
  },
  { deep: true },
);

function computeIsPoolAbsent(curveType: TCurveType, version: number) {
  const curve = getCurve(curveType, version);

  return (
    Boolean(store.fromCurrency.token) &&
    Boolean(store.toCurrency.token) &&
    !poolExistence.isFetching(
      {
        fromCoin: store.fromCurrency.token ?? '',
        toCoin: store.toCurrency.token ?? '',
        curve,
      },
      version,
    ) &&
    !poolExistence.poolExists(
      {
        fromCoin: store.fromCurrency.token ?? '',
        toCoin: store.toCurrency.token ?? '',
        curve,
      },
      version,
    )
  );
}

async function checkPoolExistence(curveType: TCurveType, version: number) {
  const curve = getCurve(curveType, version);

  if (!store.fromCurrency.token || !store.toCurrency.token || !curve) {
    return;
  }

  await poolExistence.check(
    {
      fromCoin: store.fromCurrency.token,
      toCoin: store.toCurrency.token,
      curve,
    },
    version,
  );
}

const switchSelected = (curve: string) => {
  if (isBusy.value === true) return;
  store.curve = curve;
};
</script>
