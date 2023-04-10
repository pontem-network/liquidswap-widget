import { MaybeRef } from '@vueuse/core';
import { AptosCreateTx } from '../types/aptosResources';
type TxParams = MaybeRef<AptosCreateTx | undefined>;
export declare function useSendTransaction(): {
    state: import("vue").Ref<string | undefined>;
    isReady: import("vue").Ref<boolean>;
    isLoading: import("vue").Ref<boolean>;
    error: import("vue").Ref<unknown>;
    execute: (txParams: TxParams) => Promise<string | undefined>;
};
export {};
