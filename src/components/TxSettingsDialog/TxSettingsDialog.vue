<template>
  <PDialog
      v-model:visible="display"
      :draggable="false"
      :modal="false"
      :closable="false"
      :show-header="false"
      :style="{ maxWidth: '483px', marginTop: '61px'}"
      position="top"
      class="stepped-dialog stepped-dialog--panel"
  >
    <div class="dialog-step settings-overlay">
        <DialogHeader title="Settings" @close="hide" />
        <div class="settings-overlay__title"></div>
        <div class="settings-overlay__divider" />
        <div class="settings-overlay__content">
          <div class="common-label">
            <label for="slippage">Slippage Tolerance:</label>
            <div @click="setPresetValue(0.5)">0.5%</div>
            <div @click="setPresetValue(1)">1.0%</div>
            <div @click="setPresetValue(1.5)">1.5%</div>
          </div>
          <div class="slippage-options">
            <p-button
                label="Auto"
                class="slippage-options__button"
                :class="{ 'p-button-outlined': !slippageIsDefault }"
                @click="onAutoSlippageClick"
            />
            <input-number
                id="slippage"
                class="slippage-options__input"
                :model-value="size"
                format
                locale="en-US"
                mode="decimal"
                :step="0.25"
                :max-fraction-digits="2"
                :min="0.01"
                :placeholder="'0.50'"
                :min-fraction-digits="2"
                @input="onInput"
                @blur="onBlur"
            />
          </div>
          <div
              class="slippage-comment"
              :class="{ ...(error.type ? { [`is-${error.type}`]: true } : {}) }"
          >
            <span v-text="error.message" />
            <div
                v-show="props.fromToken || props.toToken"
                class="settings-overlay__divider my-2"
            />
          </div>
          <p-button
              v-show="props.fromToken || props.toToken"
              label="Copy Pool URL"
              class="slippage-options__button slippage-options__button--action copy-button p-button-primary w-full"
              @click="copyUrl"
          />
          <div class="settings-overlay__divider" />
          <p-button
              label="Disconnect"
              v-show="connected"
              class="slippage-options__button slippage-options__button--action disconnect-button p-button-primary w-full"
              @click="disconnect"
          />
        </div>
      </div>
  </PDialog>
  <CopyNotification ref="dialog" />
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import { InputNumberInputEvent } from 'primevue/inputnumber';
import { createSyncRef } from '@/utils/vue';
import { useClipboard } from '@vueuse/core';
import { CopyNotification } from '@/components/CopyNotification';
import PButton from "primevue/button";
import InputNumber from "primevue/inputnumber";
import PDialog from 'primevue/dialog';
import { DialogHeader } from '@/components/DialogHeader';
import { useWalletProviderStore } from "@pontem/aptos-wallet-adapter";
import {storeToRefs} from "pinia";

interface IProps {
  isDefault?: boolean;
  modelValue?: number;
  toToken?: string;
  fromToken?: string;
}

const props = defineProps<IProps>();
const emits = defineEmits(['update:isDefault', 'update:modelValue', 'close']);

const adapter = useWalletProviderStore();
const { connected } = storeToRefs(adapter);
const { copy: onCopyUrl } = useClipboard();

const display = ref(false);
const dialog = ref();

const error = ref<{ message?: string; type?: string }>({
  message: undefined,
  type: undefined,
});

const size = ref<number | undefined>(
    props.isDefault ? undefined : (props.modelValue || 0) * 100,
);

const slippageIsDefault = createSyncRef('isDefault');
const slippage = createSyncRef('modelValue');

watch(
    () => slippageIsDefault.value,
    (v) => {
      if (v) {
        size.value = undefined;
      }
    },
);

watch(size, (v?: number) => {
  if (v == undefined) {
    return;
  }

  slippage.value = Math.min(Math.max(+(v || 0.01), 0.01), 50) / 100;

  if (v < 0.5) {
    error.value = {
      message: 'Your transaction may fail',
      type: 'warning',
    };
    return;
  }

  if (v > 50) {
    error.value = {
      message: 'Enter a valid slippage percentage',
      type: 'error',
    };

    return;
  }

  if (v > 1.5) {
    error.value = {
      message: 'Your transaction may be frontrun',
      type: 'warning',
    };
    return;
  }

  error.value = {
    message: undefined,
    type: undefined,
  };
});

function setPresetValue(v: number) {
  slippageIsDefault.value = false;
  size.value = v;
}

function onInput(evt: InputNumberInputEvent) {
  slippageIsDefault.value = false;
  size.value = Math.max(+(evt.value || 0.01), 0.01);
}

function onAutoSlippageClick() {
  slippageIsDefault.value = true;
  error.value = {
    message: undefined,
    type: undefined,
  };
}

function onBlur() {
  if (error.value.type === 'error') {
    onAutoSlippageClick();
  }
}

function show() {
  display.value = true;
}

function hide() {
  display.value = false;
  emits('close');
}

const urlToCopy = computed(() => {
  const url = ['https://liquidswap.com/#/?'];
  props.fromToken && url.push('from=' + props.fromToken);
  props.toToken && props.fromToken && url.push('&');
  props.toToken && url.push('to=' + props.toToken);
  return url.join('');
});

function copyUrl() {
  onCopyUrl(urlToCopy.value);
  hide();
  dialog.value.show();
}

function disconnect() {
  adapter?.disconnect();
  hide();
}

defineExpose({ show, hide });
</script>
