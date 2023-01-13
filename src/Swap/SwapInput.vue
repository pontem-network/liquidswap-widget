<template>
  <div
    class="swap-input"
    :class="{
      'insufficient-reserves': props.mode === 'to' && swapStore.convertError,
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
          inputmode="decimal"
          locale="en-US"
          mode="decimal"
          autocomplete="off"
          :min="0"
          :min-fraction-digits="0"
          :max-fraction-digits="tokenDecimals"
          @keyup="onInput"
          @blur="onBlur"
        />
        <PButton
          v-if="!state.token"
          :tabindex="isFrom ? 1 : 2"
          icon-pos="right"
          class="currency-input__select p-button-rounded ml-2"
          @click="showSelectCurrencyModal"
        >
          <span class="mr-1">Select coin</span>
          <i class="pi pi-angle-down" />
        </PButton>
        <PButton
          v-else
          :tabindex="isFrom ? 2 : 3"
          icon-pos="right"
          class="currency-input__select is-selected p-button-rounded ml-2"
          @click="showSelectCurrencyModal"
        >
          <TokenIcon
            :logo="tokenEntity?.logo"
            :type="tokenEntity?.type"
            size="24"
          />
          <span class="mr-1 ml-2"
            >{{ tokenEntity?.alias }}<token-alert :type="tokenEntity?.type"
          /></span>
          <i class="pi pi-angle-down" />
        </PButton>
      </div>
    </div>
    <div class="swap-input__row">
      <div v-if="mainStore.account.value && token" class="input-label">
        <div class="input-label__right">
          <template
            v-if="
              tokenBalance.isFetching.value &&
              tokenBalance.isFirstFetching.value
            "
          >
            Loading balance ...
          </template>
          <template v-else>
            <span v-if="tokenBalance.isExists.value || props.mode === 'from'"
              >Balance:
              <span class="cursor-pointer" @click="onClickMaxBalance">{{
                tokenBalance.formatted.value
              }}</span></span
            >
            <span
              v-else
              v-tooltip.right="
                'This token is not registered in your account. Before swap, you must register this token.'
              "
            >
              Token not registered
              <i class="pi pi-bolt" />
            </span>
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
import { useStore, useSwapStore, useTokensStore } from '@/store';
import { SelectTokenDialog } from '@/components/SelectTokenDialog';
import { useCurrentAccountBalance } from '@/composables/useAccountBalance';
import { d, decimalsMultiplier } from '@/utils/utils';
import { InputNumberBlurEvent } from 'primevue/inputnumber';
import { splitValue } from '@/utils/utils';
import { TokenAlert } from '@/components/TokenAlert';
import { UnverifiedTokenDialog } from '@/components/UnverifiedTokenDialog';
import { TokenIcon } from '@/components//TokenIcon';
import InputNumber from 'primevue/inputnumber';
import PButton from 'primevue/button';


interface IProps {
  mode: 'to' | 'from';
}

const props = defineProps<IProps>();
defineEmits(['update:currency', 'update:amount']);

const mainStore = useStore();
const swapStore = useSwapStore();
const tokensStore = useTokensStore();
const state = swapStore[props.mode === 'to' ? 'toCurrency' : 'fromCurrency'];

const dialog = ref();
const cautionAlert = ref();
const token = computed(() => state.token);
const secondaryToken = swapStore[props.mode === 'to' ? 'fromCurrency' : 'toCurrency'];

const tokenBalance = useCurrentAccountBalance(token, { useSuffix: false });

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
    // Bind 2000 tokens for gas
    balance = Math.max(balance - 2000, 0);
  }

  swapStore.interactiveField = props.mode;
  state.amount = balance;
}

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

const tokenDecimals = computed(() => {
  return tokenEntity.value ? tokenEntity.value.decimals : 8;
});

function showSelectCurrencyModal() {
  dialog.value.show();
}
</script>
