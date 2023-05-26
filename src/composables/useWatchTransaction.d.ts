import { MaybeRef } from '@vueuse/core';
export declare function useWatchTransaction(txHash: MaybeRef<string | undefined>, options?: {
    onError?: (e: any) => void;
    onComplete?: (state: any) => void;
}): {
    state: import("vue").Ref<any>;
    isStopped: import("vue").Ref<boolean>;
    isActive: Readonly<import("vue").Ref<boolean>>;
    isLoading: import("vue").ComputedRef<false | Readonly<import("vue").Ref<boolean>>>;
    error: import("vue").Ref<unknown>;
    cancel: () => void;
};
