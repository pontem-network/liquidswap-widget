<template>
  <PAccordion v-if="hasReserves" v-model:activeIndex="activeIndex" lazy class="swap-info-tab">
    <PAccordionTab>
      <template #header>
        <div class="reserves-header">
          <span class="reserves-heading">Currency Reserves</span>
          <span>
            <i
                class="pi pi-chevron-down"
                :class="[isToggled ? 'pi-chevron-up' : 'pi-chevron-down']"
            />
          </span>
        </div>
      </template>
      <div class="reserves-container">
        <div class="reserves-content">
          <div class="reserves-row">
            <div class="swap-tokens__symbol">
              <TokenIcon
                  :logo="fromTokenEntity?.logo"
                  :type="fromTokenEntity?.type"
                  class="img"
                  size="24"
              />
              {{ titleForTokenSymbol(fromTokenEntity) }}
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
              {{ titleForTokenSymbol(toTokenEntity) }}
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
    </PAccordionTab>
  </PAccordion>
</template>

<script setup lang="ts">
import {computed, ref, watch, onBeforeMount, nextTick} from 'vue';
import { useCurrencyFormat } from '@/composables/useCurrencyFormat';
import {
  useSwapStore,
  useTokensStore,
  usePoolsStore,
} from '@/store';
import { is_sorted } from '@/utils/utils';
import { TokenIcon } from '@/components/TokenIcon';
import { TVersionType } from "@/types";
import { titleForTokenSymbol } from '@/utils/tokens';
import PAccordion from 'primevue/accordion';
import PAccordionTab from 'primevue/accordiontab';

interface IProps {
  type: 'swap';
}

const props = defineProps<IProps>();

const store = useSwapStore();
const poolsStore = usePoolsStore();
const tokensStore = useTokensStore();

const version = computed(() => store.version);

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
      version.value as unknown as TVersionType,
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
    () => version.value,
  ],
  async () => await getReserves(),
    {
      deep: true,
    },
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
</script>
