<template>
  <div class="curve-container">
    <div class="label"><span class="label-text">Curve Type</span></div>

    <div class="curve-container__curve">
      <img
        v-if="props.type == curves.stable"
        :style="{ marginTop: '-2px', marginBottom: '2px' }"
        src="../../assets/curves/stable.svg"
        alt="stable curve"
      />
      <img
        v-else
        src="../../assets/curves/uncorrelated.svg"
        alt="uncorrelated curve"
      />
      <p>{{ props.type == curves.stable ? 'Stable' : 'Uncorrelated' }}</p>
      <ToolTip position="left" :tooltip-text="`Using formula optimized for ${curve} coins swaps`">
        <i class="pi pi-info-circle"/>
      </ToolTip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from "@/store";
import ToolTip from '@/components/ToolTip/Tooltip.vue';


const { curves } = useStore();

interface IProps {
  type: string;
}

const props = defineProps<IProps>();

const curve = computed(() =>
  props.type === curves.stable ? 'stable' : 'uncorrelated',
);
</script>
