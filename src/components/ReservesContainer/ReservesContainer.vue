<template>
  <div v-if="hasReserves" class="reserves-container">
    <div class="reserves-header">
      <span class="reserves-heading">Currency Reserves</span>
    </div>
    <div class="reserves-content">
      <div class="reserves-row">
        <div class="swap-tokens__symbol">
          <TokenIcon
            :logo="fromTokenEntity?.logo"
            :type="fromTokenEntity?.type"
            class="img"
            size="24"
          />
          {{ fromTokenEntity?.alias }}
        </div>
        <span>
          {{ reserveFrom.formatted.value }}
        </span>
      </div>
      <div class="reserves-row">
        <div class="swap-tokens__symbol">
          <TokenIcon
            :logo="toTokenEntity?.logo"
            :type="toTokenEntity?.type"
            class="img"
            size="24"
          />
          {{ toTokenEntity?.alias }}
        </div>
        <span
          :class="{
            'insufficient-reserves': props.type == 'swap' && store.convertError,
          }"
          >{{ reserveTo.formatted.value }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onBeforeMount } from 'vue';
import { useCurrencyFormat } from '@/composables/useCurrencyFormat';
import {
  useSwapStore,
  useTokensStore,
  usePoolsStore,
} from '@/store/useStore';
import { is_sorted } from '@/utils/utils';
import { TokenIcon } from '@/components/TokenIcon';

interface IProps {
  type: 'swap' | 'add' | 'burn';
}

const props = defineProps<IProps>();

const store = useSwapStore();
const poolsStore = usePoolsStore();
const tokensStore = useTokensStore();

onBeforeMount(async () => {
  await getReserves();
});

const poolRes = ref({
  coinX: '',
  coinY: '',
  reserveX: 0,
  reserveY: 0,
});

async function getReserves() {
  try {
    const pool = await poolsStore.getPool(
      store.fromCurrency.token as string,
      store.toCurrency.token as string,
      store.curve,
    );
    poolRes.value.coinX = pool.coinX;
    poolRes.value.coinY = pool.coinY;
    poolRes.value.reserveX = pool.reserveX;
    poolRes.value.reserveY = pool.reserveY;
  } catch (e) {
    //
  }
}

watch(
  [
    () => store.fromCurrency.token,
    () => store.toCurrency.token,
    () => store.curve,
  ],
  async () => await getReserves(),
);

const toTokenEntity = computed(() => {
  if (store.toCurrency.token) {
    return tokensStore.getToken(store.toCurrency.token);
  }
  return undefined;
});

const fromTokenEntity = computed(() => {
  if (store.toCurrency.token) {
    return tokensStore.getToken(store.fromCurrency.token);
  }
  return undefined;
});

const hasReserves = computed(
  () =>
    store.fromCurrency?.reserve &&
    store.toCurrency?.reserve &&
    (store.fromCurrency.reserve > 0 || store.toCurrency.reserve > 0),
);

const isSorted = computed(
  () =>
    hasReserves.value &&
    is_sorted(`${store.fromCurrency.token}`, `${store.toCurrency.token}`),
);

const fromCoin = computed(() => (isSorted.value ? 'coinX' : 'coinY'));
const toCoin = computed(() => (isSorted.value ? 'coinY' : 'coinX'));
const fromReserve = computed(() => (isSorted.value ? 'reserveX' : 'reserveY'));
const toReserve = computed(() => (isSorted.value ? 'reserveY' : 'reserveX'));

const reserveFrom = computed(() => {
  const val = !poolRes?.value?.[fromCoin.value]
    ? 0
    : poolRes.value[fromReserve.value];

  return useCurrencyFormat(val, poolRes.value[fromCoin.value], {
    useSuffix: false,
  });
});

const reserveTo = computed(() => {
  const val = !poolRes?.value?.[toCoin.value]
    ? 0
    : poolRes.value[toReserve.value];

  return useCurrencyFormat(val, poolRes.value[toCoin.value], {
    useSuffix: false,
  });
});
</script>

<style scoped lang="scss">
.reserves-container {
  max-width: 480px;
  min-height: 50px;
  border-radius: 24px;
  color: white;
  background: var(--surface-card);
  box-shadow: rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px,
    rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px;
  margin-bottom: 20px;
}
.reserves-heading {
  font-size: 17px;
  font-weight: 600;
}
.reserves-header {
  padding: 20px 16px 4px 16px;
}
.reserves-content {
  padding: 5px 16px 20px 16px;
}

.reserves-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 16px;
}

.insufficient-reserves {
  color: #e74c3c;
}
.swap-tokens {
  display: flex;
  width: 100%;
  flex-direction: column;

  &__token {
    display: flex;
    padding: 16px;
    background: #24243a;
    border-radius: 16px;
    align-items: center;

    &:first-child {
      margin-bottom: 8px;
    }
  }

  &__symbol {
    display: flex;
    align-items: center;

    font-size: 15px;
    letter-spacing: 0.05em;
    color: var(--text-color);
    font-weight: 500;

    img,
    .img {
      width: 24px;
      height: 24px;
      margin-right: 8px;
    }
  }
}
</style>
