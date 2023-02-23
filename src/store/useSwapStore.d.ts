export declare const useSwapStore: import("pinia").StoreDefinition<"swapStore", import("pinia")._UnwrapAll<Pick<{
    check: () => Promise<void>;
    isBusy: import("vue").ComputedRef<import("vue").Ref<boolean>>;
    isPoolAbsence: import("vue").ComputedRef<boolean>;
    convertRate: import("vue").Ref<number>;
    convertFee: import("vue").Ref<number>;
    convertFeeAmount: import("vue").Ref<number>;
    fromCurrency: {
        reserve: number;
        token?: string | undefined;
        amount?: number | undefined;
    };
    interactiveField: import("vue").Ref<"from" | "to">;
    isUpdatingRate: import("vue").Ref<boolean>;
    lastInteractiveField: import("vue").Ref<"from" | "to">;
    networkId: import("vue").ComputedRef<Readonly<import("vue").Ref<number>>>;
    slippage: import("vue").Ref<number>;
    slippageAmount: import("vue").ComputedRef<number>;
    slippageIsDefault: import("vue").Ref<boolean>;
    toCurrency: {
        reserve: number;
        token?: string | undefined;
        amount?: number | undefined;
    };
    curve: import("vue").Ref<string>;
    toggleCurrencies: () => void;
    refetchRates: (silent?: boolean) => Promise<void>;
    poolExists: import("vue").Ref<boolean>;
    convertError: import("vue").Ref<string | undefined>;
    stableSwapType: import("vue").Ref<"high" | "normal">;
    priceImpact: import("vue").ComputedRef<number>;
    priceImpactFormatted: import("vue").ComputedRef<string>;
}, "curve" | "convertRate" | "convertFee" | "convertFeeAmount" | "fromCurrency" | "interactiveField" | "isUpdatingRate" | "lastInteractiveField" | "slippage" | "slippageIsDefault" | "toCurrency" | "poolExists" | "convertError" | "stableSwapType">>, Pick<{
    check: () => Promise<void>;
    isBusy: import("vue").ComputedRef<import("vue").Ref<boolean>>;
    isPoolAbsence: import("vue").ComputedRef<boolean>;
    convertRate: import("vue").Ref<number>;
    convertFee: import("vue").Ref<number>;
    convertFeeAmount: import("vue").Ref<number>;
    fromCurrency: {
        reserve: number;
        token?: string | undefined;
        amount?: number | undefined;
    };
    interactiveField: import("vue").Ref<"from" | "to">;
    isUpdatingRate: import("vue").Ref<boolean>;
    lastInteractiveField: import("vue").Ref<"from" | "to">;
    networkId: import("vue").ComputedRef<Readonly<import("vue").Ref<number>>>;
    slippage: import("vue").Ref<number>;
    slippageAmount: import("vue").ComputedRef<number>;
    slippageIsDefault: import("vue").Ref<boolean>;
    toCurrency: {
        reserve: number;
        token?: string | undefined;
        amount?: number | undefined;
    };
    curve: import("vue").Ref<string>;
    toggleCurrencies: () => void;
    refetchRates: (silent?: boolean) => Promise<void>;
    poolExists: import("vue").Ref<boolean>;
    convertError: import("vue").Ref<string | undefined>;
    stableSwapType: import("vue").Ref<"high" | "normal">;
    priceImpact: import("vue").ComputedRef<number>;
    priceImpactFormatted: import("vue").ComputedRef<string>;
}, "networkId" | "isBusy" | "isPoolAbsence" | "slippageAmount" | "priceImpact" | "priceImpactFormatted">, Pick<{
    check: () => Promise<void>;
    isBusy: import("vue").ComputedRef<import("vue").Ref<boolean>>;
    isPoolAbsence: import("vue").ComputedRef<boolean>;
    convertRate: import("vue").Ref<number>;
    convertFee: import("vue").Ref<number>;
    convertFeeAmount: import("vue").Ref<number>;
    fromCurrency: {
        reserve: number;
        token?: string | undefined;
        amount?: number | undefined;
    };
    interactiveField: import("vue").Ref<"from" | "to">;
    isUpdatingRate: import("vue").Ref<boolean>;
    lastInteractiveField: import("vue").Ref<"from" | "to">;
    networkId: import("vue").ComputedRef<Readonly<import("vue").Ref<number>>>;
    slippage: import("vue").Ref<number>;
    slippageAmount: import("vue").ComputedRef<number>;
    slippageIsDefault: import("vue").Ref<boolean>;
    toCurrency: {
        reserve: number;
        token?: string | undefined;
        amount?: number | undefined;
    };
    curve: import("vue").Ref<string>;
    toggleCurrencies: () => void;
    refetchRates: (silent?: boolean) => Promise<void>;
    poolExists: import("vue").Ref<boolean>;
    convertError: import("vue").Ref<string | undefined>;
    stableSwapType: import("vue").Ref<"high" | "normal">;
    priceImpact: import("vue").ComputedRef<number>;
    priceImpactFormatted: import("vue").ComputedRef<string>;
}, "check" | "toggleCurrencies" | "refetchRates">>;
