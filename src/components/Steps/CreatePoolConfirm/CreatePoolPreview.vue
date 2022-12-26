<template>
  <div class="dialog-step">
    <DialogHeader
      :title="`Create ${fromToken.alias}-${toToken.alias} pool`"
      @close="onClose"
    />
    <div class="dialog-step__content">
      <div class="swap-tokens">
        <div class="swap-tokens__token">
          <div class="swap-tokens__value">{{ fromAmount.formatted.value }}</div>
          <div class="swap-tokens__symbol">
            <TokenIcon
              :logo="fromToken?.logo"
              :type="fromToken?.type"
              class="img"
              size="24"
            />
            {{ fromAmount.alias.value }}
          </div>
        </div>
        <div class="swap-tokens__token">
          <div class="swap-tokens__value">{{ toAmount.formatted.value }}</div>
          <div class="swap-tokens__symbol">
            <TokenIcon
              :logo="toToken?.logo"
              :type="toToken?.type"
              class="img"
              size="24"
            />
            {{ toAmount.alias.value }}
          </div>
        </div>
      </div>

      <CreatePoolInfo />
    </div>
    <div class="dialog-step__footer mt-3">
      <p-button class="justify-content-center w-full" @click="onConfirm">
        Confirm
      </p-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DialogHeader from '@/components/UI/DialogHeader/DialogHeader.vue';
import { TokenIcon } from '@/components/UI/TokenIcon';
import { useCurrencyFormat } from '@/composables/useCurrencyFormat';
import { useCreatePoolStore, useTokensStore } from '@/store';
import { computed } from 'vue';
import CreatePoolInfo from './CreatePoolInfo.vue';

const emits = defineEmits(['close', 'confirm']);

const tokensStore = useTokensStore();
const createPoolStore = useCreatePoolStore();

const fromToken = computed(() =>
  createPoolStore.fromCurrency.token
    ? tokensStore.getToken(createPoolStore.fromCurrency.token)
    : undefined,
);
const toToken = computed(() =>
  createPoolStore.toCurrency.token
    ? tokensStore.getToken(createPoolStore.toCurrency.token)
    : undefined,
);

const fromAmount = useCurrencyFormat(
  computed(() => createPoolStore.fromCurrency.amount),
  computed(() => createPoolStore.fromCurrency.token),
  { useSuffix: false },
);
const toAmount = useCurrencyFormat(
  computed(() => createPoolStore.toCurrency.amount),
  computed(() => createPoolStore.toCurrency.token),
  { useSuffix: false },
);

function onClose() {
  emits('close');
}

function onConfirm() {
  emits('confirm');
}
</script>

<style scoped lang="scss">
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
    margin-left: auto;
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

  &__value {
    color: var(--text-color);
    font-size: 30px;
    font-weight: 500;
    padding-right: 16px;

    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__toggle {
    position: relative;
    div {
      position: absolute;
      padding: 4px;
      border-radius: 12px;
      height: 32px;
      width: 32px;
      margin-top: -18px;
      margin-bottom: -18px;
      left: calc(50% - 16px);
      background-color: #24243a;
      border: 6px solid var(--surface-card);
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;

      i {
        font-size: 12px;
        color: var(--text-color);
        font-weight: 800;
      }
    }
  }
}
</style>
