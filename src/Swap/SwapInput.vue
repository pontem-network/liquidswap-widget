<template>
  <div
    class="swap-input"
    :class="{
      'insufficient-input-reserves': props.mode === 'to' && swapStore.convertError,
    }"
  >
    <div class="swap-input__row">
      <div class="currency-input" :class="{ 'is-loading': isUpdating }">
        <InputNumber
          allow-empty
          :model-value="amount"
          :tabindex="isFrom ? 1 : 4"
          class="currency-input__input"
          placeholder="0.0"
          :input-props="{
            type: 'text',
            inputmode: 'decimal',
            pattern: '^[0-9]*[.,]?[0-9]*$',
            autocomplete: 'off',
            autocorrect: 'off',
            spellcheck: 'false',
          }"
          locale="en-US"
          :min="0"
          :min-fraction-digits="0"
          :max-fraction-digits="tokenDecimals"
          @keyup="onInput"
          @blur="onBlur"
        />
        <ButtonToken
          :token-entity="tokenEntity"
          :tabindex="isFrom ? 1 : 2"
          @click="showSelectCurrencyModal"
        />
      </div>
    </div>
    <div class="swap-input__row">
      <div v-if="mainStore.account.value && token" class="input-label">
        <div class="input-label__both balance">
          <template
            v-if="
              tokenBalance.isFetching.value &&
              tokenBalance.isFirstFetching.value
            "
          >
            Loading balance ...
          </template>
          <template v-else>
            <template v-if="tokenBalance.isExists.value">
              <InputLabelTemplate
                  :mode="mode"
                  :amount="amount"
                  :usd-equivalent="usdEquivalentFixed"
                  :usd-benefit-percent="usdBenefitPercent"
                  :balance="tokenBalance.formatted.value"
                  :is-loading="usdEquivalentLoader"
                  show-balance
                  @click:max-balance="onClickMaxBalance"
              />
            </template>
            <ToolTip
                v-else
                position="bottom-left"
                :tooltipText="'This token is not registered in your account. Before swap, you must register this token.'"
            >
              <span>
                Token not registered
                <i class="pi pi-bolt" />
              </span>
            </ToolTip>
          </template>
        </div>
      </div>
    </div>
  </div>
  <SelectTokenDialog
    ref="dialog"
    v-model:actionToken="state.token"
    v-model:secondaryToken="secondaryToken.token"
  />
  <UnverifiedTokenDialog ref="cautionAlert" />
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { watchDebounced } from '@vueuse/core';
import { useStore, useSwapStore, useTokensStore } from '@/store';
import { SelectTokenDialog } from '@/components/SelectTokenDialog';
import { useCurrentAccountBalance } from '@/composables/useAccountBalance';
import { d, decimalsMultiplier } from '@/utils/utils';
import { providerForToken } from '@/utils/tokens';
import { InputNumberBlurEvent } from 'primevue/inputnumber';
import { splitValue } from '@/utils/utils';
import { UnverifiedTokenDialog } from '@/components/UnverifiedTokenDialog';
import InputNumber from 'primevue/inputnumber';
import ToolTip from '@/components/ToolTip/Tooltip.vue';
import { ButtonToken } from "@/components/ButtonToken";
import InputLabelTemplate from "@/Swap/InputLabelTemplate.vue";
import { getStoredTokenUsdEquivalent } from '@/composables/useInputServices';

interface IProps {
  mode: 'to' | 'from';
}

const props = defineProps<IProps>();
defineEmits(['update:currency', 'update:amount']);

const mainStore = useStore();
const swapStore = useSwapStore();
const tokensStore = useTokensStore();
const state = swapStore[props.mode === 'to' ? 'toCurrency' : 'fromCurrency'];
const usdBenefitPercent = ref<number>();
const usdEquivalentLoader = ref(false);

const dialog = ref();
const cautionAlert = ref();
const token = computed(() => state.token);
const secondaryToken = swapStore[props.mode === 'to' ? 'fromCurrency' : 'toCurrency'];

const tokenBalance = useCurrentAccountBalance(token, { useSuffix: false });

const isTokenExisted = computed(() => tokenBalance.isExists.value);

const isUpdating = computed(() => {
  return props.mode !== swapStore.interactiveField && swapStore.isUpdatingRate;
});

const isFrom = computed(() => {
  return props.mode === 'from';
});

function onBlur(evt: InputNumberBlurEvent) {
  const { spiltValue_, lastIndex } = splitValue(evt.value);
  if (spiltValue_[1] && Number(spiltValue_[1][lastIndex]) === 0) {
    return (state.amount = +d(Number(evt.value.replace(/,/g, '')))
      .mul(decimalsMultiplier(tokenDecimals.value))
      .toFixed(0));
  }
  return;
}

function onInput(evt: KeyboardEvent) {
  swapStore.interactiveField = props.mode;
  const el = evt.target as HTMLInputElement;
  if (el.value === undefined || el.value === null) {
    state.amount = undefined;
    return;
  }
  const { spiltValue_, lastIndex } = splitValue(el.value);
  if (spiltValue_[1] && Number(spiltValue_[1][lastIndex]) === 0) {
    return;
  }
  state.amount = +d(Number(el.value.replace(/,/g, '')))
    .mul(decimalsMultiplier(tokenDecimals.value))
    .toFixed(0);
}

function onClickMaxBalance() {
  let balance = tokenBalance.balance.value;
  if (state.token === mainStore.defaultToken.value) {
    // Bind 7500 tokens for gas
    balance = Math.max(balance - 7500, 0);
  }

  swapStore.interactiveField = props.mode;
  state.amount = balance;
}

const usdEquivalentFixed = computed(() => state.usdEquivalent?.toFixed(4));

const amount = computed(() => {
  if (state.amount === undefined) {
    return undefined;
  }
  return +d(state.amount)
    .div(decimalsMultiplier(tokenDecimals.value))
    .toFixed(tokenDecimals.value);
});

watch(
  () => state.token,
  (current, previous) => {
    if (current && !tokensStore.isTokenVerified(current))
      cautionAlert.value.checkAndShow(current);
    if (!previous || !current || state.amount === undefined) {
      return;
    }

    if (previous === current) {
      return;
    }

    const currentDecimals = tokensStore.getToken(current)?.decimals;
    const previousDecimals = tokensStore.getToken(previous)?.decimals;
    if (!currentDecimals || !previousDecimals) {
      throw new Error("Couldn't get decimals");
    }
    const diff = currentDecimals - previousDecimals;

    if (diff > 0) {
      state.amount = +d(state.amount).mul(decimalsMultiplier(diff)).toFixed(0);
    } else if (diff < 0) {
      state.amount = +d(state.amount).div(decimalsMultiplier(diff)).toFixed(0);
    }
  },
  { flush: 'pre' },
);

const tokenEntity = computed(() => {
  if (state.token) {
    return tokensStore.getToken(state.token);
  }
  return undefined;
});

watchDebounced(
    () => [swapStore.fromCurrency.amount, swapStore.toCurrency.amount],
    async () => {
      usdBenefitPercent.value = undefined;

      if (!tokenEntity.value) return;

      if (!amount.value && props.mode === 'from') {
        swapStore.toCurrency.usdEquivalent = undefined;
        swapStore.toCurrency.amount = undefined;
        usdBenefitPercent.value = undefined;
        return;
      }

      usdEquivalentLoader.value = true;

      await updateUsdEquivalents();

      if (
          props.mode === 'to' &&
          swapStore.fromCurrency.usdEquivalent &&
          swapStore.toCurrency.usdEquivalent
      ) {
        usdBenefitPercent.value = d(swapStore.fromCurrency.usdEquivalent)
            .div(d(swapStore.toCurrency.usdEquivalent))
            .minus(1)
            .mul(100)
            .mul(-1)
            .toNumber();
      }

      //we make a delay so that the loader does not blink
      setTimeout(() => {
        usdEquivalentLoader.value = false;
      }, 0);
    },
    {
      immediate: true,
      debounce: 1000,
      maxWait: 5000,
    },
);

const tokenProvider = computed(() => {
  if (tokenEntity.value?.type.length && tokenEntity.value?.type.length > 0) {
    return providerForToken(tokenEntity.value);
  }
  return '';
});

const tokenDecimals = computed(() => {
  return tokenEntity.value ? tokenEntity.value.decimals : 8;
});

function showSelectCurrencyModal() {
  dialog.value.show();
}

async function updateUsdEquivalents() {
  if (props.mode === 'to') {
    if (!swapStore.toCurrency.amount) {
      return;
    }

    swapStore.fromCurrency.usdEquivalent = undefined;
    swapStore.toCurrency.usdEquivalent = undefined;

    // req 'from' data must be first
    swapStore.fromCurrency.usdEquivalent = await getStoredTokenUsdEquivalent(
        swapStore.fromCurrency,
    );
    //req 'to' data
    swapStore.toCurrency.usdEquivalent = await getStoredTokenUsdEquivalent(
        swapStore.toCurrency,
    );

    return;
  }

  if (!swapStore.fromCurrency.amount) {
    return;
  }

  swapStore.fromCurrency.usdEquivalent = await getStoredTokenUsdEquivalent(
      swapStore.fromCurrency,
  );
}
</script>
