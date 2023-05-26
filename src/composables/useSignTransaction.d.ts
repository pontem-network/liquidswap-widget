import { MaybeRef } from '@vueuse/core';
export type TxParams = MaybeRef<{
    sender: MaybeRef<string>;
    payload: MaybeRef<{
        type: MaybeRef<string>;
        function: MaybeRef<string>;
        typeArguments: MaybeRef<string[]>;
        arguments: MaybeRef<string[]>;
    }>;
} | undefined>;
export declare function useSignTransaction(): {
    state: import("vue").Ref<Uint8Array>;
    isReady: import("vue").Ref<boolean>;
    isLoading: import("vue").Ref<boolean>;
    error: import("vue").Ref<unknown>;
    execute: (txParams: TxParams) => Promise<Uint8Array>;
};
