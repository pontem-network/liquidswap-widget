import { MaybeRef, useAsyncState, useIntervalFn } from '@vueuse/core';
import { useWalletProviderStore } from '@pontem/aptos-wallet-adapter';
import { AptosCreateTx } from '@/types/aptosResources';
import { camelCaseKeysToUnderscore, getFormattedValidationCode } from '@/utils/utils';
import { computed, unref } from 'vue';
import { useStore } from "@/store";

type TxParams = MaybeRef<AptosCreateTx | undefined>;

export function useSendTransaction() {
  const adapter = useWalletProviderStore();
  const { insideNativeWallet, dappStatusTransaction, dappTransactionHash } = useStore();

  const actualNativeStatusTransaction = computed(() => dappStatusTransaction.value);
  const actualNativeTransactionHash = computed(() => dappTransactionHash.value);

  const { state, isReady, isLoading, error, execute } = useAsyncState<
    string | undefined
  >(
    (txParams: TxParams) => {
      const unrefTx = unref(txParams) as AptosCreateTx;
      const payload = camelCaseKeysToUnderscore(unrefTx.payload);
      if (insideNativeWallet.value) {
        const event = new CustomEvent('signAndSubmitTransaction', {
            detail: payload,
            composed: true,
            bubbles: true,
        });
        document.querySelector('liquidswap-widget')!.dispatchEvent(event);

        // @TODO need to use abort controller here instead of promise. In case closing confirm window - setInterval still running.
        return new Promise((resolve, reject) => {
          const { pause } = useIntervalFn(checkStatus, 400);
          function checkStatus() {
            if (actualNativeStatusTransaction.value === "success" && actualNativeTransactionHash.value) {
              pause();
              return resolve(actualNativeTransactionHash.value)
            }
            if (actualNativeStatusTransaction.value === "error") {
              pause();
              return reject('Sorry, something went wrong. Reopen the page and try again later.');
            }
            if (actualNativeStatusTransaction.value === "rejected") {
              pause();
              return reject('Rejected by User');
            }
          }
        }).then((response: any) => response).catch((errorMessage: any) => {
          throw new Error(errorMessage);
        })
      }

      return adapter
        .signAndSubmitTransaction(payload)
        .then((response: any) => {
          return response.hash;
        })
        .catch((_e: any) => {
          let errorMessage;
          try {
            errorMessage = getFormattedValidationCode(_e);
          } catch (e) {
            errorMessage = _e.message;
          }
          throw new Error(
            errorMessage
              ? errorMessage
              : 'Sorry, something went wrong. Reload the page and try again later.',
          );
        });
    },
    undefined,
    {
      immediate: false,
      resetOnExecute: true,
    },
  );

  return {
    state,
    isReady,
    isLoading,
    error,
    execute: (txParams: TxParams) => execute(0, txParams),
  };
}
