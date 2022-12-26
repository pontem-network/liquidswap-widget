<template>
  <PAccordion v-model:activeIndex="activeIndex" lazy class="swap-info-tab">
    <PAccordionTab>
      <template #header>
        <div class="swap-info-tab__header">
          <span v-if="swap.isUpdatingRate"
            >1 {{ rateTokens.alias.value }} =
            <i class="pi pi-spin pi-spinner" style="font-size: 12px"
          /></span>
          <span v-else>
            <span>
              1 {{ rateTokens.alias.value }} =
              {{ convertRateTokens.formatted.value }} (including fee)
            </span>
          </span>
          <span>
            <i
              class="pi pi-chevron-down"
              :class="[isToggled ? 'pi-chevron-up' : 'pi-chevron-down']"
            />
          </span>
        </div>
      </template>
      <div class="list">
        <div class="list__item">
          <span>Expected Output</span>
          <span v-if="swap.isUpdatingRate"
            ><i class="pi pi-spin pi-spinner" style="font-size: 12px"
          /></span>
          <span v-else>{{ outputTokens.formatted.value }}</span>
        </div>
        <div class="list__item">
          <span
            >{{
              swap.lastInteractiveField === 'from'
                ? 'Minimum received'
                : 'Maximum sent'
            }}
            after slippage ({{
              (swap.slippage ? swap.slippage * 100 : 0).toFixed(2)
            }}%)</span
          >
          <span v-if="swap.isUpdatingRate"
            ><i class="pi pi-spin pi-spinner" style="font-size: 12px"
          /></span>
          <span v-else>{{ slippageOutputTokens.formatted.value }}</span>
        </div>
      </div>
    </PAccordionTab>
  </PAccordion>
  <div class="swap-info__info">
    <div class="list">
      <div class="list__item">
        <span>Price Impact</span>
        <span v-if="swap.isUpdatingRate"
          ><i class="pi pi-spin pi-spinner" style="font-size: 12px"
        /></span>
        <span v-else :class="priceImpactClass">{{ priceImpact }}%</span>
      </div>
      <div class="list__item">
        <span>Fee ({{ convertFee }}%)</span>
        <span v-if="swap.isUpdatingRate"
          ><i class="pi pi-spin pi-spinner" style="font-size: 12px"
        /></span>
        <span v-else> {{ convertFeeAmount.formatted.value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSwapStore } from '@/store';
import { ref, computed, nextTick } from 'vue';
import { useCurrencyFormat } from '@/composables/useCurrencyFormat';

const swap = useSwapStore();

const slippageAmount = computed(() => swap.slippageAmount);
const convertRate = computed(() => swap.convertRate); // Mul 100 - hotfix
const toAmount = computed(() => swap.toCurrency.amount);
const toToken = computed(() => swap.toCurrency.token);
const fromToken = computed(() => swap.fromCurrency.token);
const slippageToken = computed(() =>
  swap.lastInteractiveField === 'from' ? toToken.value : fromToken.value,
);

const rateTokens = useCurrencyFormat(1, fromToken);
const outputTokens = useCurrencyFormat(toAmount, toToken);
const slippageOutputTokens = useCurrencyFormat(slippageAmount, slippageToken);
const convertRateTokens = useCurrencyFormat(convertRate, toToken);
const convertFee = computed(() => swap.convertFee);
const convertFeeAmount = useCurrencyFormat(
  computed(() => swap.convertFeeAmount),
  fromToken,
);

const isToggled = ref(false);
const activeIndex = computed({
  get() {
    return isToggled.value ? 0 : undefined;
  },
  set(value?: number) {
    nextTick(() => {
      isToggled.value = value === 0;
    });
  },
});

const formatter = Intl.NumberFormat('en', {
  notation: 'compact',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const priceImpact = computed(() => formatter.format(swap.priceImpact));
const priceImpactClass = computed(() => {
  return +priceImpact.value < 0.2
    ? '-green'
    : +priceImpact.value < 0.5
    ? '-yellow'
    : '-red';
});
</script>

<style scoped lang="scss">
.swap-info__info {
  margin: 8px 0 0;
  padding: 0.25rem 1.25rem 0;

  .list__item {
    &:not(:last-child) {
      margin-bottom: 8px;
    }

    span:first-child {
      color: #9594aa;
      font-weight: 500;
      letter-spacing: 0.44px;
      line-height: 18px;
      font-size: 15px;
    }
  }
}

.swap-info-tab {
  ::v-deep(.p-accordion-tab) {
    &.p-accordion-tab-active {
      .p-accordion-header-link {
        background: #24243a !important;
      }
    }

    .p-accordion-header-link {
      width: 100%;
      padding: 4px 12px !important;
      background: transparent !important;
      border: 0;
      border-radius: 12px !important;
      min-height: 40px;
      box-shadow: none !important;

      &:focus {
        box-shadow: none !important;
      }

      .p-accordion-toggle-icon {
        display: none;
      }
    }

    .p-accordion-content {
      margin-top: 8px;
      background: transparent !important;
      border-radius: 16px !important;
      border: 1px solid #24243a !important;
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    span:first-child {
      font-size: 13px;
      font-weight: 500 !important;
    }

    span:last-child {
      padding: 0 5px;
    }
  }
}

.list {
  display: flex;
  flex-direction: column;
  row-gap: 8px;

  &__item {
    display: flex;
    font-weight: 400;
    font-size: 14px;

    span:last-child {
      margin-left: auto;
    }
  }
}

.-green {
  color: var(--green-500);
}
.-yellow {
  color: var(--yellow-500);
}
.-red {
  color: var(--red-500);
}
</style>
