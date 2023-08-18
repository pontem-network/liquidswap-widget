<template>
  <div class="list__item">
    <div class="list__pool-version-row">
      <span>Pool Version </span>
      <ToolTip
        position="top"
        :tooltipText="'V0.5 is the latest smart contract version - see docs for details.'"
        class="tooltip-version-pools"
      >
        <i class="pi pi-info-circle info-circle" />
      </ToolTip>
      <SelectButton
        v-model="store.version"
        :options="poolVersionOptions"
        option-disabled="disabled"
        option-value="value"
        data-tid="pool-version-switch-container"
        option-label="label"
        class="ml-auto no-a11y"
        :unselectable="false"
        :disabled="!canSwitchVersion"
      >
        <template #option="slotProps">
          {{ slotProps.option.label }}
        </template>
      </SelectButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCurve } from '@/utils/contracts';
import { useSwapStore } from '@/store';
import { computed, watch } from 'vue';
import ToolTip from '@/components/ToolTip/Tooltip.vue';
import SelectButton from 'primevue/selectbutton';
import { usePoolExistence } from '@/composables/usePoolExistence';

interface IProps {
  type: 'swap' | 'create' | 'add' | 'burn';
}

export type TCurveType = 'unstable' | 'stable';

const store = useSwapStore();

const props = defineProps<IProps>();

const poolExistence = usePoolExistence();

watch(
  [() => store.fromCurrency.token, () => store.toCurrency.token, () => store.curve, () => store.version],
  () => {
    checkPoolExistence('stable', 0);
    checkPoolExistence('unstable', 0);

    checkPoolExistence('stable', 0.5);
    checkPoolExistence('unstable', 0.5);
  },
);

const poolVersionOptions = computed(() => {
  const isSwap = props.type === 'swap';

  return [
    { id: 1, label: 'V0', value: 0, disabled: isSwap && isV0PoolAbsent.value },
    {
      id: 2,
      label: 'V0.5',
      value: 0.5,
      disabled: isSwap && isV05PoolAbsent.value,
    },
  ];
});

const isStableV0PoolAbsent = computed(() => computeIsPoolAbsent('stable', 0));
const isUnstableV0PoolAbsent = computed(() => computeIsPoolAbsent('unstable', 0));
const isStableV05PoolAbsent = computed(() => computeIsPoolAbsent('stable', 0.5));
const isUnstableV05PoolAbsent = computed(() => computeIsPoolAbsent('unstable', 0.5));
const isStableCurveSelected = computed(
  () => store.curve === getCurve('stable', 0.5) || store.curve === getCurve('stable', 0),
);
const isV0PoolAbsent = computed(() =>
  isStableCurveSelected.value ? isStableV0PoolAbsent.value : isUnstableV0PoolAbsent.value,
);
const isV05PoolAbsent = computed(() =>
  isStableCurveSelected.value ? isStableV05PoolAbsent.value : isUnstableV05PoolAbsent.value,
);

const canSwitchVersion = computed(() => props.type === 'swap');

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

  if (!store.fromCurrency.token || !store.toCurrency.token || !store.curve) {
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
</script>
