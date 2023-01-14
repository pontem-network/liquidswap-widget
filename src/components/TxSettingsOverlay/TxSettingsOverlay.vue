<template>
  <overlay-panel
    id="swap_settings"
    ref="op"
    :append-to="swapForm"
    :show-close-icon="false"
    style="width: 310px; position: absolute"
    :breakpoints="{ '520px': '100vw' }"
  >
    <div class="settings-overlay">
      <div class="settings-overlay__title">Settings</div>
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
      </div>
    </div>
  </overlay-panel>
  <CopyNotification ref="dialog" />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { InputNumberInputEvent } from 'primevue/inputnumber';
import { createSyncRef } from '@/utils/vue';
import { CopyNotification } from '@/components/CopyNotification';
import OverlayPanel from "primevue/overlaypanel";
import PButton from "primevue/button";
import InputNumber from "primevue/inputnumber";

interface IProps {
  isDefault?: boolean;
  modelValue?: number;
  toToken?: string;
  fromToken?: string;
}

const props = defineProps<IProps>();
defineEmits(['update:isDefault', 'update:modelValue']);

const op = ref();
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

const swapForm = ref();

setTimeout(() => {
  swapForm.value = document.querySelector('body');
      //?.shadowRoot?.querySelector(".swap__header");

  // fix error with scrollable element

  console.log('swapForm.value.parentNode', swapForm.value.parentNode.nodeType);

}, 100);

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

function show(e: Event, target?: any) {
  op?.value.show(e, target);
}

function hide() {
  op?.value.hide();
}

function toggle(e: Event, target?: any) {
  op?.value.toggle(e, target);
}

defineExpose({ show, hide, toggle });
</script>
