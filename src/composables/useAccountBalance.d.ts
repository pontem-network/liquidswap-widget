import { MaybeRef } from '@vueuse/core';
export declare function useAccountBalance(address: MaybeRef<string | undefined>, token: MaybeRef<string | undefined>): {
    isFetching: import("vue").Ref<boolean>;
    isFirstFetching: import("vue").Ref<boolean>;
    isExists: import("vue").Ref<boolean>;
    balance: import("vue").Ref<number>;
    refetch: () => Promise<{
        balance: number;
        isExists: boolean;
    } | undefined>;
};
export declare function useCurrentAccountBalance(token: MaybeRef<string | undefined>, options?: {
    useSuffix?: boolean;
    _decimals?: number;
}): {
    alias: import("vue").ComputedRef<string>;
    symbol: import("vue").ComputedRef<string>;
    decimals: import("vue").ComputedRef<number>;
    formatted: import("vue").Ref<string>;
    isFetching: import("vue").Ref<boolean>;
    isFirstFetching: import("vue").Ref<boolean>;
    isExists: import("vue").Ref<boolean>;
    balance: import("vue").Ref<number>;
    refetch: () => Promise<{
        balance: number;
        isExists: boolean;
    } | undefined>;
};
