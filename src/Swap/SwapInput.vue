<template>
  <div
    class="swap-input"
    :class="{
      'insufficient-input-reserves': props.mode === 'to' && swapStore.convertError,
    }"
  >
    <div class="swap-input__row">
      <div class="currency-input" :class="{ 'is-loading': isUpdating }">
        <LSNumberInputAutoNumeric
            :model-value="swapInputModel"
            :max-decimals="tokenDecimals"
            :should-be-updated-flag="shouldBeUpdatedFlag"
            :minimum-value="'0'"
            placeholder="0.0"
            class="currency-input__input input-style"
            inputmode="decimal"
            pattern="^[0-9]*[.,]?[0-9]*$"
            autocomplete="off"
            autocorrect="off"
            spellcheck="false"
            :data-tid="`swap-input-${isFrom ? 'from' : 'to'}`"
            @update:model-value="handleUpdateModelValue"
            @input="handleInput"
            @focus="handleFocus"
        />
        <ButtonToken
          :data-tid="`swap-button-${isFrom ? 'from' : 'to'}`"
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
            <template v-if="tokenBalance.isExists.value || props.mode === 'from'">
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
                position="bottom-right"
                :tooltipText="'This token is not registered in your account. Before swap, you must register this token.'"
                class="token-tooltip"
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
    :mode="mode"
    :view="'select-token'"
  />
  <UnverifiedTokenDialog ref="cautionAlert" />
</template>

<script setup lang="ts">
import { computed, PropType, ref, watch } from 'vue';
import { watchDebounced } from '@vueuse/core';
import isNil from 'lodash/isNil';

import { useStore, useSwapStore, useTokensStore } from '@/store';
import { useCurrentAccountBalance } from '@/composables/useAccountBalance';
import { getStoredTokenUsdEquivalent, getAmountWithDecimal, getAmountInteger, getTokenDecimal } from '@/composables/useInputServices';
import { d } from '@/utils/utils';
import { TokenFiledType } from '@/types/coins';
import { IStoredToken } from '@/types';

import { SelectTokenDialog } from '@/components/SelectTokenDialog';
import { LSNumberInputAutoNumeric } from '@/components/LSNumberInput';
import ToolTip from '@/components/ToolTip/Tooltip.vue';
import { ButtonToken } from "@/components/ButtonToken";
import InputLabelTemplate from "@/Swap/InputLabelTemplate.vue";
import { UnverifiedTokenDialog } from '@/components/UnverifiedTokenDialog';

const props = defineProps({
  mode: {
    type: Object as PropType<TokenFiledType>,
    required: true,
  },
  model: {
    type: Object as PropType<IStoredToken>,
    default: undefined,
  },
  shouldBeUpdatedFlag: {
    type: Boolean,
  },
});

const emits = defineEmits([
  'input:custom',
  'keyup:custom',
  'focus:custom',
  'change:decimal-difference',
  'click:max-balance',
  'update:model',
]);

const mainStore = useStore();
const swapStore = useSwapStore();
const tokensStore = useTokensStore();
const state = swapStore[props.mode === 'to' ? 'toCurrency' : 'fromCurrency'];
const usdBenefitPercent = ref<number>();
const usdEquivalentLoader = ref(false);

const dialog = ref();
const cautionAlert = ref();
const token = computed(() => state.token);

const secondaryToken = computed(
    () => swapStore[props.mode === 'to' ? 'fromCurrency' : 'toCurrency'],
);

const tokenBalance = useCurrentAccountBalance(token, { useSuffix: false });

const isUpdating = computed(() => {
  return props.mode !== swapStore.interactiveField && swapStore.isUpdatingRate;
});

const isFrom = computed(() => {
  return props.mode === 'from';
});

const amount = computed(() => {
  if (state.amount === undefined || isNil(tokenDecimals.value)) return;

  return getAmountWithDecimal(state.amount, tokenDecimals.value);
});

const usdEquivalentFixed = computed(() => state.usdEquivalent?.toFixed(4));

const tokenEntity = computed(() => {
  if (state.token) {
    return tokensStore.getToken(state.token);
  }
  return undefined;
});

const tokenDecimals = computed(() => {
  if (!tokenEntity.value) return;
  return getTokenDecimal(state.token);
});

const swapInputModel = computed({
  get() {
    if (
        props.model?.amount === undefined ||
        !props.model.token ||
        !tokenEntity?.value
    )
      return 0;

    const res = getAmountWithDecimal(
        props.model.amount,
        tokenEntity.value.decimals,
    );

    return res;
  },
  set(newValue: string) {
    if (!tokenEntity?.value) return;

    const model =
        props.mode === 'from' ? swapStore.fromCurrency : swapStore.toCurrency;
    const res = getAmountInteger(+newValue, tokenEntity.value.decimals);
    model.amount = res;
  },
});

//watchers

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

    const data = {
      value: diff,
      mode: props.mode,
    };

    emits('change:decimal-difference', data);

    // if (diff > 0) {
    //   state.amount = +d(state.amount).mul(decimalsMultiplier(diff)).toFixed(0);
    // } else if (diff < 0) {
    //   state.amount = +d(state.amount).div(decimalsMultiplier(diff)).toFixed(0);
    // }
  },
  { flush: 'pre' },
);

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

/**
 * This watcher is needed to track
 * the status of the usdEquivalent calculation
 * and expected rendering of the zone
 * under the input.
 */
const isLabelStateEmpty = ref(true);
watchDebounced(
    () => [state.usdEquivalent],
    () => (isLabelStateEmpty.value = !state.usdEquivalent),
    {
      maxWait: 5000,
      debounce: 850,
    },
);

function showSelectCurrencyModal() {
  dialog.value.show();
}

function onClickMaxBalance() {
  let balance = tokenBalance.balance.value;
  if (state.token === mainStore.defaultToken.value) {
    // Bind 7500 tokens for gas
    balance = Math.max(balance - 7500, 0);
  }

  const data = {
    value: balance,
    mode: props.mode,
  };
  emits('click:max-balance', data);
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

function handleFocus(event: FocusEvent) {
  emits('focus:custom', event);
}

function handleInput(event: number | undefined) {
  if (event !== undefined && event < 0) {
    event = Math.abs(event);
  }

  const data = {
    value: event,
    mode: props.mode,
  };

  if (!props.model || isNil(tokenDecimals.value)) return;

  swapInputModel.value = data.value;
  swapStore.interactiveField = props.mode;
  emits('input:custom', data);
}


function handleUpdateModelValue(event: number | undefined) {
  if (event !== undefined && event < 0) {
    event = Math.abs(event);
  }

  const data = {
    value: event,
    mode: props.mode,
  };

  if (!props.model || isNil(tokenDecimals.value)) return;

  emits('update:model', data);
}
</script>
