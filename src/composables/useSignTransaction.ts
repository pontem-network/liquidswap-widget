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
        typeArguments: MaybeRef<string[]>;
        arguments: MaybeRef<string[]>;
      }>;
    }
  | undefined
>;

export function useSignTransaction() {
  const adapter = useWalletProviderStore();

  const { state, isReady, isLoading, error, execute } = useAsyncState<
    Uint8Array,
    // @ts-ignore
    [TxParams]
  >(
    (txParams: TxParams) => {
      const unrefTx = unref(txParams) as unknown as AptosCreateTx;
      const payload = camelCaseKeysToUnderscore(unrefTx.payload);

      return adapter.signTransaction(payload).catch((_e: any) => {
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
    new Uint8Array(),
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
