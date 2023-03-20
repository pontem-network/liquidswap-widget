<template>
  <div class="curve-container">
    <div class="label"><span class="label-text">Curve Type</span></div>

    <div class="curve-container__curve">
      <img
        v-if="type === stableCurve"
        :style="{ marginTop: '-2px', marginBottom: '2px' }"
        src="../../assets/curves/stable.svg"
        alt="stable curve"
      />
      <img
        v-else
        src="../../assets/curves/uncorrelated.svg"
        alt="uncorrelated curve"
      />
      <p>{{ type === stableCurve ? 'Stable' : 'Uncorrelated' }}</p>
      <ToolTip position="top-left" :tooltip-text="`Using formula optimized for ${curve} coins swaps`">
        <i class="pi pi-info-circle"/>
      </ToolTip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';

import ToolTip from '@/components/ToolTip/Tooltip.vue';
import { getCurve } from '@/utils/contracts';

interface IProps {
  type: string; // curve full type
  version: number; // contract version
}

const props = defineProps<IProps>();
const { type, version } = toRefs<IProps>(props);

const stableCurve = computed(() => getCurve('stable', version.value));
const curve = computed(() =>
    type.value === stableCurve.value ? 'stable' : 'uncorrelated',
);

</script>
