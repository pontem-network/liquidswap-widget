<template>
  <div class="curve-container">
    <div class="label"><span class="label-text">Curve Type</span></div>

    <div class="curve-container__curve">
      <img
        v-if="props.type == CURVE_STABLE"
        :style="{ marginTop: '-2px', marginBottom: '2px' }"
        src="@/assets/curves/stable.svg"
        alt="stable curve"
      />
      <img
        v-else
        src="@/assets/curves/uncorrelated.svg"
        alt="uncorrelated curve"
      />
      <p>{{ props.type == CURVE_STABLE ? 'Stable' : 'Uncorrelated' }}</p>
      <i
        v-tooltip="`Using formula optimized for ${curve} coins swaps`"
        class="pi pi-info-circle"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CURVE_STABLE } from '@/constants';
import { computed } from 'vue';

interface IProps {
  type: string;
}

const props = defineProps<IProps>();

const curve = computed(() =>
  props.type === CURVE_STABLE ? 'stable' : 'uncorrelated',
);
</script>
<style scoped lang="scss">
.label {
  display: flex;
  align-items: center;
}

.label-text {
  font-family: var(--font-family);
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 120%;
  color: #9594aa;
}

.curve-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 1.25rem;
  margin-bottom: 8px;

  &__curve {
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
    width: 50%;
    cursor: pointer;
    transition: all 0.5s linear;

    &.busy {
      cursor: default;
      opacity: 0.5;
    }

    p {
      @extend .label-text;
      margin-block: 0rem;
      margin-left: 5px;
      margin-right: 6px;
      color: #ffffff;
    }

    i {
      opacity: 0.5;
    }
  }
}
</style>
