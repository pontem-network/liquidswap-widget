declare const _sfc_main: import("vue").DefineComponent<{}, {
    swapStore: import("pinia").Store<"swapStore", import("pinia")._UnwrapAll<Pick<{
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
    }, "networkId" | "isBusy" | "isPoolAbsence" | "slippageAmount" | "priceImpact">, Pick<{
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
    }, "check" | "toggleCurrencies" | "refetchRates">>;
    fromToken: import("vue").ComputedRef<string | undefined>;
    toToken: import("vue").ComputedRef<string | undefined>;
    slippageAmount: import("vue").ComputedRef<number>;
    convertRate: import("vue").ComputedRef<number>;
    slippageToken: import("vue").ComputedRef<string | undefined>;
    rateTokens: {
        alias: import("vue").ComputedRef<string>;
        symbol: import("vue").ComputedRef<string>;
        decimals: import("vue").ComputedRef<number>;
        formatted: import("vue").Ref<string>;
    };
    outputTokens: {
        alias: import("vue").ComputedRef<string>;
        symbol: import("vue").ComputedRef<string>;
        decimals: import("vue").ComputedRef<number>;
        formatted: import("vue").Ref<string>;
    };
    slippageOutputTokens: {
        alias: import("vue").ComputedRef<string>;
        symbol: import("vue").ComputedRef<string>;
        decimals: import("vue").ComputedRef<number>;
        formatted: import("vue").Ref<string>;
    };
    convertRateTokens: {
        alias: import("vue").ComputedRef<string>;
        symbol: import("vue").ComputedRef<string>;
        decimals: import("vue").ComputedRef<number>;
        formatted: import("vue").Ref<string>;
    };
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
export default _sfc_main;
