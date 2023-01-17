<template>
  <div class="dialog-step">
    <div class="dialog-step__header">
      <p-button
        class="dialog-step__button ml-auto"
        icon="pi pi-times"
        @click="onComplete"
      />
    </div>
    <div class="dialog-step__content">
      <div class="submit">
        <img
          v-if="isSuccess"
          src="@/assets/success.svg"
          :style="{ width: '60px', height: '60px' }"
        />
        <img
          v-else
          src="@/assets/rejected.svg"
          :style="{ width: '60px', height: '60px' }"
        />
        <h3 class="submit__title">
          {{ isSuccess ? 'Transaction Submitted' : 'Transaction rejected' }}
        </h3>
        <slot
          name="description"
          v-bind="{ description, isSuccess, isInternalError, txState }"
        >
          <p v-if="description" class="submit__description">
            {{ description }}
          </p>
        </slot>
        <p v-if="isInternalError" class="submit__error">{{ txMessage }}</p>
        <div v-else class="tx-result mt-4">
          <div class="tx-result__row">
            <div class="tx-result__field">
              <div class="tx-result__label">Transaction Hash</div>
              <div class="tx-result__value">
                <div class="tx-hash" :title="txState.hash">
                  <span>{{ shortAddress(txState.hash, 10, 10) }}</span>
                  <ToolTip position="top" :tooltipText="'Click to copy'">
                    <PButton
                        icon="pi pi-copy"
                        class="p-button-sm p-button-rounded p-button-text"
                        @click="copyAddress"
                    />
                  </ToolTip>
                </div>
              </div>
            </div>
          </div>
          <div class="tx-result__row">
            <div class="tx-result__field" style="flex: 1">
              <div class="tx-result__label">Gas Used</div>
              <div class="tx-result__value">{{ txState.gas_used }}</div>
            </div>
            <div class="tx-result__field">
              <div class="tx-result__label">Status</div>
              <div class="tx-result__value">
                <span :class="{ submit__error: !isSuccess }">
                  {{ isSuccess ? 'Success' : 'Failed' }}
                </span>
              </div>
            </div>
          </div>
          <div class="tx-result__row">
            <div class="tx-result__field">
              <div class="tx-result__label">Message</div>
              <div
                class="tx-result__value"
                :class="{ 'text-sm': !isSuccess }"
                v-html="txMessage"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="dialog-step__footer mt-4">
      <p-button class="justify-content-center w-full" @click="onComplete">
        {{ isSuccess ? 'Close' : 'Dismiss' }}
      </p-button>
    </div>
  </div>
  <CopyNotification ref="dialog" />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { shortAddress } from '@/utils/hex';
import { useClipboard } from '@vueuse/core';
import { CopyNotification } from '@/components/CopyNotification';
import PButton from "primevue/button";
import ToolTip from '@/components/ToolTip/Tooltip.vue';

type State =
  | {
      status: 'success';
      tx: any;
    }
  | {
      tx?: any;
      status: 'failed';
      message: string;
    };

interface IProps {
  state: State;
  description?: string;
}

const dialog = ref();
const props = defineProps<IProps>();
const emits = defineEmits(['close', 'success', 'reject']);

const txState = computed(() => props.state.tx);
const isInternalError = computed(() => !isSuccess.value && !txState.value);
const isSuccess = computed(() => props.state.status === 'success');

const { copy: onCopyAddress } = useClipboard();
const txLink = computed(
  () =>
    `https://explorer.aptoslabs.com/txn/${txState.value.hash}?network=mainnet `,
);

const description = computed(() => {
  return props.description;
});

const txMessage = computed(() => {
  if (isInternalError.value) {
    return (props.state as any)?.message;
  }

  return (txState.value as any)?.vm_status.replace(/\n/g, '<br>');
});

function copyAddress() {
  onCopyAddress(txLink.value);
  dialog.value.show();
}

function onComplete() {
  if (isSuccess.value) {
    // TODO: persist LP?
    emits('success');
  } else {
    emits('reject');
  }
}
</script>
