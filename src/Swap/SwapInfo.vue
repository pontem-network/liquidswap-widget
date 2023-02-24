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
        <div v-if="hasSlippage" class="list__item">
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
import { useSwapStore, useStore } from '@/store';
import { ref, computed, nextTick } from 'vue';
import { useCurrencyFormat } from '@/composables/useCurrencyFormat';
import { useUnverifiedCoins } from '@/composables/useUnverifiedCoins';

import PAccordion from 'primevue/accordion';
import PAccordionTab from 'primevue/accordiontab';

const swap = useSwapStore();

const { curves } = useStore();

const uc = useUnverifiedCoins();

const slippageAmount = computed(() => swap.slippageAmount);
const hasSlippage = computed(() => swap.curve === curves.uncorrelated);
const convertRate = computed(() => swap.convertRate);
const toAmount = computed(() => swap.toCurrency.amount);
const toToken = computed(() => swap.toCurrency.token);
const fromToken = computed(() => swap.fromCurrency.token);
const slippageToken = computed(() =>
  swap.lastInteractiveField === 'from' ? toToken.value : fromToken.value,
);

const priceImpact = computed(() => swap.priceImpactFormatted);

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

const priceImpactClass = computed(() => {
  return +priceImpact.value < 0.2
    ? '-green'
    : +priceImpact.value < 0.5
    ? '-yellow'
    : '-red';
});
</script>
