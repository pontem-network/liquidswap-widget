<template>
  <div v-if="isLoading">
    <i class="pi pi-spin pi-spinner" style="font-size: 12px" />
  </div>
  <span
    v-else-if="amount && usdEquivalentComp"
    class="input-label__text_secondary input-label__text_loaded"
  >
    {{ usdEquivalentComp }}
    <!-- show usd benefit for second input -->

    <ToolTip
      v-if="mode === 'to' && usdBenefitPercentComp"
      position='bottom'
      :tooltipText="'The estimated difference between the USD values of input and output amounts.'"
      :class="['input-label__tooltip-title', 'ml-1', usdBenefitPercentClass]"
    >
      {{ usdBenefitPercentComp }}%
    </ToolTip>
<!--    <span-->
<!--      v-tooltip.bottom="{-->
<!--        value:-->
<!--          'The estimated difference between the USD values of input and output amounts.',-->
<!--        class: 'input-label__tooltip',-->
<!--      }"-->
<!--      :class="['input-label__tooltip-title', 'ml-1', usdBenefitPercentClass]"-->
<!--      >{{ usdBenefitPercent }}%</span-->
<!--    >-->
  </span>
  <!-- balance section -->
  <span
    v-if="showBalance"
    class="input-label__right input-label__text_secondary"
    >Balance:
    <span class="cursor-pointer" @click="$emit('click:maxBalance')">{{
      balance
    }}</span>
  </span>
</template>

<script setup lang="ts">
import { useNumberFormat } from '@/composables/useCurrencyFormat';
import { computed, PropType } from 'vue';
import ToolTip from '@/components/ToolTip/Tooltip.vue';

const props = defineProps({
  isLoading: {
    type: Boolean,
  },
  showBalance: {
    type: Boolean,
  },
  mode: {
    type: String as PropType<'to' | 'from'>,
  },
  amount: {
    type: Object as PropType<number | undefined>,
  },
  usdEquivalent: {
    type: Object as PropType<string | undefined>,
    require: false,
    default: () => undefined,
  },
  usdBenefitPercent: {
    type: Number,
    require: false,
    default: () => 0,
  },
  balance: {
    type: String,
    require: false,
    default: () => '',
  },
});

type TUsdEquivalentSuffix = 'M' | 'B' | 'T' | undefined;

const usdBenefitPercentComp = computed(() => {
  if (!props.usdBenefitPercent) return;

  return amount2NoENotation(props.usdBenefitPercent + '', '');
});

const usdEquivalentComp = computed(() => {
  if (!props.usdEquivalent) return;
  let prefix = '$';
  if (
    +props.usdEquivalent > 100_000 &&
    +props.usdEquivalent < 1_000_000_000_000_000
  )
    prefix = `~$`;

  return amount2NoENotation(props.usdEquivalent, prefix);
});

/**
 * A function for converting e-notation values into short values.
 * Sample data:
 * '2.1331221321312331e+21' -> '>999.999 T'
 * '-2.1331221321312331e+21' -> '>-999.999 T'
 * '2.1331221321312331e+10' -> '21.331 B'
 * '2.1331221321312331e+8' -> '213.312 M'
 * '2.1331221321312331e+4' -> '21331.221'
 * '2.1331221321312331e-3' -> '0.002'
 * @param amount string
 * @param prefix string
 */
function amount2NoENotation(amount: string, prefix: string) {
  // because useNumberFormat doesn't accept negative
  const sign: '-' | '' = !amount[0] ? '' : amount[0] === '-' ? '-' : '';
  const _amount =
    sign === '-'
      ? amount.replace('-', '').replace('~', '')
      : amount.replace('~', '');

  const valueWithoutCommas = useNumberFormat(_amount, {
    decimals: 0,
    suffix: undefined,
    bridge: undefined,
  }).value.replaceAll(',', '');

  const isBeforeM = valueWithoutCommas.length <= 6;
  const isM = valueWithoutCommas.length > 6 && valueWithoutCommas.length <= 9;
  const isB = valueWithoutCommas.length > 9 && valueWithoutCommas.length <= 12;
  const isT = valueWithoutCommas.length > 12 && valueWithoutCommas.length <= 15;
  const decimal = 3;

  if (isBeforeM) {
    return `${prefix + sign}${(+_amount).toFixed(decimal)}`;
  }

  if (isM) {
    return getOrderedString(6, valueWithoutCommas, {
      decimal,
      prefix: prefix + sign,
      suffix: 'M',
    });
  }

  if (isB) {
    return getOrderedString(9, valueWithoutCommas, {
      decimal,
      prefix: prefix + sign,
      suffix: 'B',
    });
  }

  if (isT) {
    return getOrderedString(12, valueWithoutCommas, {
      decimal,
      prefix: prefix + sign,
      suffix: 'T',
    });
  }

  const tooLargeValue = `999.`;
  return `>${prefix}${sign}${addNines(tooLargeValue, decimal)} T`;
}

function getOrderedString(
  numberOrder: number,
  value: string,
  option: {
    decimal: number;
    prefix: string;
    suffix: TUsdEquivalentSuffix;
  },
) {
  const result = (+value / Math.pow(10, numberOrder)).toFixed(option.decimal);
  return `${option.prefix}${result} ${option.suffix}`;
}

function addNines(value: string, decimal: number) {
  const helperArray = Array.from(value);
  for (let i = 0; i < decimal; i++) {
    helperArray.push('9');
  }

  return helperArray.join('');
}

defineEmits(['click:maxBalance']);

const usdBenefitPercentClass = computed(() => {
  if (!props.usdBenefitPercent) return;

  return props.usdBenefitPercent < 0
    ? '-red'
    : props.usdBenefitPercent > 0
    ? '-green'
    : '';
});
</script>
