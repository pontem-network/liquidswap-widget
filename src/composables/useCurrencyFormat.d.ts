import { MaybeRef } from '@vueuse/core';
export declare function useNumberFormat(amount: MaybeRef<string | number | undefined>, options?: {
    decimals: MaybeRef<number>;
    suffix: MaybeRef<string | undefined>;
    bridge: MaybeRef<string | undefined>;
}): import("vue").Ref<string>;
export declare function useCurrencyFormat(amount: MaybeRef<string | number | undefined>, token: MaybeRef<string | undefined>, options?: {
    useBridge?: boolean;
    _decimals?: number;
    useSuffix?: boolean;
}): {
    alias: import("vue").ComputedRef<string>;
    symbol: import("vue").ComputedRef<string>;
    decimals: import("vue").ComputedRef<number>;
    formatted: import("vue").Ref<string>;
};
