import { MaybeRef, useAsyncState } from '@vueuse/core';
import { useWalletProviderStore } from '@pontem/aptos-wallet-adapter';
import { AptosCreateTx } from '@/types/aptosResources';
import { camelCaseKeysToUnderscore, getFormattedValidationCode } from '@/utils/utils';
import { unref } from 'vue';

type TxParams = MaybeRef<
  | {
      sender: MaybeRef<string>;
      payload: MaybeRef<{
        type: MaybeRef<string>;
        function: MaybeRef<string>;
        type_arguments: MaybeRef<string[]>;
        arguments: MaybeRef<string[]>;
      }>;
    }
  | undefined
>;

export function useSendTransaction() {
  const adapter = useWalletProviderStore();

  const { state, isReady, isLoading, error, execute } = useAsyncState<
    string | undefined
  >(
    (txParams: TxParams) => {
      const unrefTx = unref(txParams) as AptosCreateTx;
      const payload = camelCaseKeysToUnderscore(unrefTx.payload);

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
