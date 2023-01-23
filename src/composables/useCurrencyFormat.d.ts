import { MaybeRef } from '@vueuse/core';
export declare function useNumberFormat(amount: MaybeRef<string | number | undefined>, options?: {
    decimals: MaybeRef<number>;
    suffix: MaybeRef<string | undefined>;
}): import("vue").Ref<string>;
export declare function useCurrencyFormat(amount: MaybeRef<string | number | undefined>, token: MaybeRef<string | undefined>, options?: {
    useSuffix?: boolean;
    _decimals?: number;
}): {
    alias: import("vue").ComputedRef<string>;
    symbol: import("vue").ComputedRef<string>;
    decimals: import("vue").ComputedRef<number>;
    formatted: import("vue").Ref<string>;
};
