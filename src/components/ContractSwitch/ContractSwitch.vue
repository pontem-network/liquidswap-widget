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
        option-label="label"
        class="ml-auto no-a11y"
        :unselectable="false"
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
import {
  usePoolsStore,
  useSwapStore,
} from '@/store';
import { computed } from 'vue';
import ToolTip from '@/components/ToolTip/Tooltip.vue';
import SelectButton from "primevue/selectbutton";

const poolsStore = usePoolsStore();

const store = useSwapStore();

const poolVersionOptions = computed(() => {
  const unstableCurve = getCurve('uncorrelated', store.version);
  let disabled = false;
  if (
    store.curve === unstableCurve && store.predefinedCurve === unstableCurve
  ) {
    // and pool is default
    disabled = true;
  }
  return [
    { id: 1, label: 'V0', value: 0 },
    { id: 2, label: 'V0.5', value: 0.5, disabled },
  ];
});
</script>
