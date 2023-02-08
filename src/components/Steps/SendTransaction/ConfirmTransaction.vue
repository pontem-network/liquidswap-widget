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

import ProgressSpinner from 'primevue/progressspinner';
import PButton from "primevue/button";

interface IProps {
  tx: AptosCreateTx;
  description?: string;
}

const props = defineProps<IProps>();
const emits = defineEmits(['rejected', 'submitted', 'close']);

const { state, error, execute } = useSendTransaction();

const timeout = useTimeout(30000, { immediate: true });

const tx = computed(() => {
  return props.tx;
});

const description = computed(() => {
  return props.description;
});

onMounted(() => execute(tx));

watch(error, () => {
  emits('rejected', error.value);
});

watch(state, () => {
  emits('submitted', state.value);
});

function onClose() {
  emits('rejected', 'Time out');
  emits('close');
}
</script>
