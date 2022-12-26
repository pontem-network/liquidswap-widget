<template>
  <div class="swap-table mt-3">
    <div class="swap-table__row">
      <div class="swap-table__label">Expected Output</div>
      <div class="swap-table__value">
        <span v-if="createPoolStore.isUpdatingRate"
          ><i class="pi pi-spin pi-spinner" style="font-size: 12px"
        /></span>
        <span v-else>{{ receivedLp.formatted.value }} LP</span>
      </div>
    </div>
    <div class="swap-table__row is-small">
      <div class="swap-table__label">
        Minimum sent after slippage ({{
          (createPoolStore.slippage
            ? createPoolStore.slippage * 100
            : 0
          ).toFixed(2)
        }}%)
      </div>
      <div class="swap-table__value">
        <span v-if="createPoolStore.isUpdatingRate"
          ><i class="pi pi-spin pi-spinner" style="font-size: 12px"
        /></span>
        <template v-else>
          <div>{{ fromAmount.formatted.value }}</div>
          <div>{{ toAmount.formatted.value }}</div>
        </template>
      </div>
    </div>
  </div>

  <div class="swap-help">
    Output is estimated. You will receive at least
    <b>{{ receivedLp.formatted.value }} LP</b> or the transaction will revert.
  </div>
</template>

<script lang="ts" setup>
import { useCreatePoolStore } from '@/store';
import { computed } from 'vue';
import { useCurrencyFormat } from '@/composables/useCurrencyFormat';

const createPoolStore = useCreatePoolStore();

const receivedLp = useCurrencyFormat(
  computed(() => createPoolStore.receiveLp),
  computed(() => (createPoolStore.pool as any).tokens[2]),
  { useSuffix: false, _decimals: 6 },
);

const fromAmount = useCurrencyFormat(
  computed(() => createPoolStore.fromCurrency.amount),
  computed(() => createPoolStore.fromCurrency.token),
);
const toAmount = useCurrencyFormat(
  computed(() => createPoolStore.toCurrency.amount),
  computed(() => createPoolStore.toCurrency.token),
);
</script>

<style scoped lang="scss">
.pool-info {
  display: flex;
  align-items: center;

  font-weight: 500;
  color: var(--text-color);
  font-size: 15px;
  padding: 16px 8px;
}

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
