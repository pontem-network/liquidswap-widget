<template>
  <div class="dialog-step">
    <DialogHeader
      :title="title"
      :has-back="true"
      @close="onClose"
      @back="onBack"
    />
    <div class="dialog-step__content">
      <p v-if="description">{{ description }}</p>
      <div class="gas-inputs">
        <div class="gas-inputs__item" :class="{ 'is-invalid': !!errors.gas }">
          <label class="gas-inputs__label" for="gas">Max Gas Amount</label>
          <InputNumber
            id="gas"
            v-model="gas"
            allow-empty
            :placeholder="`${defaultGas}`"
            locale="en-US"
            mode="decimal"
            :min="0"
            :min-fraction-digits="0"
            :max-fraction-digits="0"
            @input="(evt) => onInput('gas')(evt)"
          />
        </div>
        <div
          class="gas-inputs__item"
          :class="{ 'is-invalid': !!errors.gasPrice }"
        >
          <label class="gas-inputs__label" for="gas-price"
            >Gas Unit Price</label
          >
          <InputNumber
            id="gas-price"
            v-model="gasPrice"
            allow-empty
            :placeholder="`${defaultGasPrice}`"
            locale="en-US"
            mode="decimal"
            :min="0"
            :min-fraction-digits="0"
            :max-fraction-digits="0"
            @input="(evt) => onInput('gasPrice')(evt)"
          />
        </div>
      </div>
      <PInlineMessage v-if="!meta.valid" class="error mt-3">
        <div v-if="errors.gas">{{ errors.gas }}</div>
        <div v-if="errors.gasPrice">{{ errors.gasPrice }}</div>
      </PInlineMessage>
      <slot />
    </div>
    <div class="dialog-step__footer mt-3">
      <slot name="footer" v-bind="{ meta, onSendTransaction, gas, gasPrice }">
        <p-button
          class="justify-content-center w-full"
          :disabled="buttonState.disabled"
          @click="onSendTransaction"
        >
          {{ buttonState.text }}
        </p-button>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useField, useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import * as zod from 'zod';
import { InputNumberInputEvent } from 'primevue/inputnumber';
import isNumber from 'lodash/isNumber';
import { useCurrentNativeBalance } from '@/composables/useAccountBalance';
import { d } from '@/utils';
import DialogHeader from '@/components/UI/DialogHeader/DialogHeader.vue';
import {
  DEFAULT_GAS,
  DEFAULT_GAS_UNIT_PRICE,
  GAS_MAX,
  GAS_MIN,
  GAS_UNIT_PRICE_MAX,
  GAS_UNIT_PRICE_MIN,
} from '@/constants';

interface IProps {
  title?: string;
  description?: string;
  gas?: number;
  maxGas?: number;
  minGas?: number;
  gasPrice?: number;
  maxGasPrice?: number;
  minGasPrice?: number;
}

const props = defineProps<IProps>();
const emits = defineEmits([
  'close',
  'send',
  'back',
  'update:gas',
  'update:gasPrice',
]);

const balance = useCurrentNativeBalance();

const minGas = props.minGas || GAS_MIN;
const maxGas = props.maxGas || GAS_MAX;
const minGasPrice = props.minGasPrice || GAS_UNIT_PRICE_MIN;
const maxGasPrice = props.maxGasPrice || GAS_UNIT_PRICE_MAX;

// TODO create reactive scheme
const schema = toFormValidator(
  zod.object({
    gas: zod
      .number({
        invalid_type_error: `Gas Amount must be greater than or equal to ${minGas}`,
      })
      .lte(maxGas, `Gas Amount must be less than or equal to ${maxGas}`)
      .gte(
        props.minGas || 500,
        `Gas Amount must be greater than or equal to ${minGas}`,
      ),
    gasPrice: zod
      .number({
        invalid_type_error: `Gas Price must be greater than or equal to ${minGasPrice}`,
      })
      .lte(
        maxGasPrice,
        `Gas Price must be less than or equal to ${maxGasPrice}`,
      )
      .gte(
        minGasPrice,
        `Gas Price must be greater than or equal to ${minGasPrice}`,
      ),
  }),
);

const defaultGas = computed(() => props.gas || DEFAULT_GAS);
const defaultGasPrice = computed(
  () => props.gasPrice || DEFAULT_GAS_UNIT_PRICE,
);

const { errors, meta } = useForm({
  validationSchema: schema,
  initialValues: {
    gas: defaultGas.value,
    gasPrice: defaultGasPrice.value,
  },
});

const { value: gas } = useField<number | undefined>('gas');
const { value: gasPrice } = useField<number | undefined>('gasPrice');

const buttonState = computed(() => {
  // TODO add check to used amount in tx
  const haveBalance = d(balance.balance.value)
    .minus(d(gas.value).mul(d(gasPrice.value)))
    .gte(0);

  if (meta.value.valid && haveBalance) {
    return {
      text: 'Send Transaction',
      disabled: false,
    };
  }

  if (meta.value.valid && !haveBalance) {
    return {
      text: `Insufficient ${balance.alias.value} balance`,
      disabled: true,
    };
  }

  return {
    text: `Invalid Gas Params`,
    disabled: true,
  };
});

const title = computed(() => {
  return props.title || 'Send Transaction';
});

const description = computed(() => {
  return props.description || '';
});

function onInput(field: 'gas' | 'gasPrice') {
  return (evt: InputNumberInputEvent) => {
    (field === 'gas' ? gas : gasPrice).value = isNumber(evt.value)
      ? evt.value
      : undefined;
  };
}

function onSendTransaction() {
  emits('update:gas', gas.value);
  emits('update:gasPrice', gasPrice.value);
  emits('send');
}

function onBack() {
  emits('back');
}

function onClose() {
  emits('close');
}
</script>

<style scoped lang="scss">
$errorColor: #ca4242;

.gas-inputs {
  background: #24243a;
  border-radius: 16px;
  padding: 16px 18px;
  display: flex;
  grid-gap: 16px;

  &__item {
    width: 50%;

    &.is-invalid {
      .gas-inputs__label {
        color: $errorColor;
      }

      ::v-deep(.p-inputtext) {
        color: $errorColor;
      }
    }

    ::v-deep(.p-inputtext) {
      background: transparent;
      border: none;
      font-size: 30px;
      font-weight: 700;
      opacity: 0.6;
      color: var(--text-color);
      padding-left: 0;
      padding-right: 0;
      transition: 250ms opacity;
      width: 100%;

      &:focus {
        box-shadow: none;
        border: none;
        opacity: 0.8;
      }
    }
  }

  &__label {
    font-size: 13px;
    color: var(--text-color);
    font-weight: 500;
    cursor: pointer;
  }
}
</style>
