<template>
  <input
    ref="customInput"
    v-bind="$attrs"
    inputmode="numeric"
    class="number-input"
    @input="handleInput"
  />
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import AutoNumeric from 'autonumeric';

const props = defineProps({
  modelValue: {
    type: Number,
    default: undefined,
  },
  maxDecimals: {
    type: Number,
    default: 8,
  },
  minimumValue: {
    type: String,
    default: 'null',
  },
  // the model should be changed only via the @input event
  shouldBeUpdatedFlag: {
    type: Boolean,
  },
});

const emits = defineEmits(['update:modelValue', 'input']);

// inits
const customInput = ref();
const autoNumericInstance = ref<AutoNumeric>();

// eslint-disable-next-line
const defaultMaxDecimals = props.maxDecimals;

const commonOptions = {
  allowDecimalPadding: false,
  alwaysAllowDecimalCharacter: true,
  decimalCharacterAlternative: ',',
  emptyInputBehavior: 'null',
  leadingZero: 'deny',
  watchExternalChanges: false, // for :value attribute
  minimumValue: props.minimumValue,
  selectOnFocus: false,
};

const defaultOptions = {
  ...commonOptions,
  decimalPlaces: defaultMaxDecimals,
  decimalPlacesRawValue: defaultMaxDecimals,
  decimalPlacesShownOnBlur: defaultMaxDecimals,
  decimalPlacesShownOnFocus: defaultMaxDecimals,
};

onMounted(() => {
  autoNumericInstance.value = new AutoNumeric(
    customInput.value,
    '',
    defaultOptions,
  );

  // set the default value, if it exists
  if (props.modelValue == undefined || !props.shouldBeUpdatedFlag) return;
  autoNumericInstance.value?.set(props?.modelValue, formatter.value);
});

/**
 * Watches model changes and set the value in the input
 */
watch(
  () => props.modelValue,
  () => {
    if (props.modelValue == undefined || !props.shouldBeUpdatedFlag) return;
    autoNumericInstance.value?.set(props?.modelValue, formatter.value);
  },
);

const formatter = computed(() => {
  const decimals = props.maxDecimals;
  return {
    ...commonOptions,
    decimalPlaces: decimals,
    decimalPlacesRawValue: decimals,
    decimalPlacesShownOnBlur: decimals,
    decimalPlacesShownOnFocus: decimals,
  };
});

watch(
  () => props.maxDecimals,
  () => {
    autoNumericInstance.value.update(formatter.value);
  },
);

function handleInput(event: any) {
  event.preventDefault();
  /**
   * on android devices, the value comes from getNumber with a delay.
   * At the same time, it works on ios and desktop without delay.
   */
  setTimeout(() => {
    const rawNumber = autoNumericInstance.value.getNumber() ?? 0;
    emits('input', rawNumber);
  }, 10);
}
</script>

<style scoped lang="scss">

</style>
