<template>
  <div class="dialog-step">
    <div class="dialog-step__header">
      <p-button
        v-if="timeout"
        class="dialog-step__button ml-auto"
        icon="pi pi-times"
        @click="onClose"
      />
    </div>
    <div class="dialog-step__content">
      <div class="confirmation">
        <ProgressSpinner
          fill="#16162D"
          stroke-width="2px"
          :style="{ width: '60px', height: '60px' }"
        />
        <h3 class="confirmation__title">Waiting For Confirmation</h3>
        <slot name="description" v-bind="{ description }">
          <p v-if="description" class="confirmation__description">
            {{ description }}
          </p>
        </slot>
        <p class="confirmation__help">
          Confirm this transaction in your wallet
        </p>
      </div>
    </div>
    <div v-if="timeout" class="dialog-step__footer">
      <p-button class="justify-content-center w-full" @click="onClose">
        Close
      </p-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { AptosCreateTx } from '@/types/aptosResources';
import { useSendTransaction } from '@/composables/useSendTransaction';
import { useTimeout } from '@vueuse/core';

interface IProps {
  tx: AptosCreateTx;
  description?: string;
}

const props = defineProps<IProps>();
const emits = defineEmits(['rejected', 'submitted', 'close']);

const { state, error, execute } = useSendTransaction();

const timeout = useTimeout(30000, { immediate: true });

onMounted(() => execute(tx));

watch(error, () => {
  emits('rejected', error.value);
});

watch(state, () => {
  emits('submitted', state.value);
});

const tx = computed(() => {
  return props.tx;
});

const description = computed(() => {
  return props.description;
});

function onClose() {
  emits('close');
}
</script>

<style scoped lang="scss">
.confirmation {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__title {
    font-size: 20px;
    margin-top: 24px;
    margin-bottom: 0px;
    color: var(--text-color);
    font-weight: 800;
  }

  &__description {
    color: var(--text-color);
    opacity: 0.7;
    font-size: 17px;
    margin-top: 10px;
    margin-bottom: 0;
  }

  &__help {
    margin-top: 24px;
    margin-bottom: 24px;
    color: var(--text-color);
    opacity: 0.4;
    font-size: 13px;
  }
}
</style>
