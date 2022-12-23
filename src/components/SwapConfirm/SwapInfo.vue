<template>
  <div class="swap-rate">
    <span v-if="swapStore.isUpdatingRate"
      >1 {{ rateTokens.alias.value }} =
      <i class="pi pi-spin pi-spinner" style="font-size: 12px"
    /></span>
    <span v-else
      >1 {{ rateTokens.alias.value }} =
      {{ convertRateTokens.formatted.value }} (including fees)</span
    >
  </div>

  <div class="swap-table">
    <div class="swap-table__row">
      <div class="swap-table__label">Expected Output</div>
      <div class="swap-table__value">
        <span v-if="swapStore.isUpdatingRate"
          ><i class="pi pi-spin pi-spinner" style="font-size: 12px"
        /></span>
        <span v-else>{{ outputTokens.formatted.value }}</span>
      </div>
    </div>
    <div class="swap-table__row is-small">
      <div class="swap-table__label">
        {{
          swapStore.lastInteractiveField === 'from'
            ? 'Minimum received'
            : 'Maximum sent'
        }}
        after slippage ({{
          (swapStore.slippage ? swapStore.slippage * 100 : 0).toFixed(2)
        }}%)
      </div>
      <div class="swap-table__value">
        <span v-if="swapStore.isUpdatingRate"
          ><i class="pi pi-spin pi-spinner" style="font-size: 12px"
        /></span>
        <span v-else>{{ slippageOutputTokens.formatted.value }}</span>
      </div>
    </div>
    <div class="swap-table__row is-small">
      <div class="swap-table__label">Fees</div>
      <div class="swap-table__value">
        <span v-if="swapStore.isUpdatingRate"
          ><i class="pi pi-spin pi-spinner" style="font-size: 12px"
        /></span>
        <span v-else>{{ swapStore.convertFee }}%</span>
      </div>
    </div>
  </div>

  <div v-if="swapStore.lastInteractiveField === 'from'" class="swap-help">
    Output is estimated. You will receive at least
    <b>{{ slippageOutputTokens.formatted.value }}</b> or the transaction will
    revert.
  </div>
  <div v-else class="swap-help">
    Output is estimated. You will send no more
    <b>{{ slippageOutputTokens.formatted.value }}</b> or the transaction will
    revert.
  </div>
</template>

<script lang="ts" setup>
import { useSwapStore } from '@/store/useStore';
import { computed } from 'vue';
import { useCurrencyFormat } from '@/composables/useCurrencyFormat';

const swapStore = useSwapStore();

const fromToken = computed(() => swapStore.fromCurrency.token);
const toToken = computed(() => swapStore.toCurrency.token);

const slippageAmount = computed(() => swapStore.slippageAmount);
const convertRate = computed(() => swapStore.convertRate); // Mul 100 - hotfix
const slippageToken = computed(() =>
  swapStore.lastInteractiveField === 'from' ? toToken.value : fromToken.value,
);

const rateTokens = useCurrencyFormat(1, fromToken);
const outputTokens = useCurrencyFormat(
  computed(() => swapStore.toCurrency.amount),
  toToken,
);
const slippageOutputTokens = useCurrencyFormat(slippageAmount, slippageToken);
const convertRateTokens = useCurrencyFormat(convertRate, toToken);
</script>

<style scoped lang="scss">
.swap-rate {
  padding: 16px 16px;
  font-size: 17px;
  font-weight: 500;
  color: var(--text-color);
}

.swap-table {
  border: 1px solid transparentize(#e5e4fa, 0.85);
  border-radius: 16px;

  &__row {
    padding: 12px 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: var(--text-color);
    font-size: 17px;

    &.is-small {
      opacity: 0.7;
      font-size: 13px;
      font-weight: 500;
    }

    &:not(:last-child) {
      border-bottom: 1px solid transparentize(#e5e4fa, 0.85);
    }
  }

  &__label {
    width: 50%;
  }

  &__value {
    margin-left: auto;
  }
}

.swap-help {
  color: transparentize(#e5e4fa, 0.6);
  font-size: 13px;
  font-weight: 500;
  margin-top: 24px;
  padding: 0 16px;
  line-height: 18px;

  b {
    color: #e5e4fa;
    font-weight: 500;
  }
}
</style>
