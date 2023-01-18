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
import { useSwapStore } from '@/store';
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