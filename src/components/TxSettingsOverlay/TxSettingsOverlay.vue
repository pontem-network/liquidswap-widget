<template>
  <overlay-panel
    id="swap_settings"
    ref="op"
    append-to="body"
    :show-close-icon="false"
    style="width: 310px"
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
        <p-button
          v-show="props.fromToken || props.toToken"
          label="Copy Pool URL"
          class="slippage-options__button w-full mt-1"
          @click="copyUrl"
        />
      </div>
    </div>
  </overlay-panel>
  <CopyNotification ref="dialog" />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { InputNumberInputEvent } from 'primevue/inputnumber';
import { createSyncRef } from '@/utils/vue';
import { useClipboard } from '@vueuse/core';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { CopyNotification } from '@/components/CopyNotification';
import PButton from 'primevue/button';
import OverlayPanel from 'primevue/overlaypanel';
import InputNumber from 'primevue/inputnumber';


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

const route = useRoute();
const { copy: onCopyUrl } = useClipboard();

const urlToCopy = computed(() => {
  const url = [window.location.origin, '/#', route.fullPath, '?'];
  props.fromToken && url.push('from=' + props.fromToken);
  props.toToken && props.fromToken && url.push('&');
  props.toToken && url.push('to=' + props.toToken);
  return url.join('');
});
const error = ref<{ message?: string; type?: string }>({
  message: undefined,
  type: undefined,
});
const size = ref<number | undefined>(
  props.isDefault ? undefined : (props.modelValue || 0) * 100,
);

const slippageIsDefault = createSyncRef('isDefault');
const slippage = createSyncRef('modelValue');

function copyUrl() {
  onCopyUrl(urlToCopy.value);
  hide();
  dialog.value.show();
}

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

<style scoped lang="scss">
.settings-overlay {
  &__title {
    display: flex;
    flex-direction: row;
    grid-gap: 12px;
    font-size: 1rem;
    color: var(--surface-200);
    margin-bottom: 8px;
    font-weight: 500;
  }

  &__divider {
    border-bottom: 1px solid #303035;
    margin: 0 -20px;
  }

  &__content {
    padding-top: 12px;
  }
}

.slippage-options {
  display: flex;
  grid-gap: 12px;

  &__button {
    height: 32px;
    padding: 3px 16px;
    font-size: 0.875rem;
  }

  &__input {
    flex: 1;
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;

    &:after {
      content: '%';
      font-weight: 600;
      color: var(--surface-600);
      font-size: 1rem;
      position: absolute;
      right: 0;
      margin-right: 8px;
    }

    ::v-deep(.p-inputnumber-input) {
      height: 32px;
      padding: 3px 24px 3px 10px;
      width: 100%;
      text-align: right;
    }
  }
}

.common-label {
  width: 100%;
  display: flex;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;

  label {
    margin-right: auto;
  }

  & > div {
    color: var(--surface-600);
    font-size: 0.8rem;

    margin-left: 5px;
    cursor: pointer;
    &:hover {
      color: var(--surface-500);
    }
  }
}

.slippage-label {
  background: #24243a;
  padding: 0.75rem 0.75rem;
  border: 1px solid var(--surface-card);
  transition: background-color 0.2s, color 0.2s, border-color 0.2s,
    box-shadow 0.2s;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 6px;
  margin-right: 3px;
}
.slippage-radio:checked + .slippage-label:not(.-uncheck) {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 0.2rem rgb(196 181 253 / 50%);
  border-color: #c4b5fd;
}

.slippage-comment {
  text-align: right;
  height: 24px;
  font-size: 0.875rem;
  padding-top: 6px;

  &.is-error {
    color: var(--pink-600);
  }

  &.is-warning {
    color: var(--orange-600);
  }
}
</style>
