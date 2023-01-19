import PButton from "primevue/button";
declare const _sfc_main: import("vue").DefineComponent<{}, {
    emits: (event: "close" | "confirm", ...args: any[]) => void;
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
    tokensStore: import("pinia").Store<"tokensStore", import("pinia")._UnwrapAll<Pick<{
        getLogoUrl: import("vue").ComputedRef<(symbol: string) => any>;
        getToken: (type?: string | undefined) => import("../../store/useTokenStore").IPersistedTokenExtended | undefined;
        tokens: Record<string, import("../../store/useTokenStore").IPersistedTokenExtended>;
        token: import("vue").ComputedRef<() => import("../../store/useTokenStore").IPersistedToken | undefined>;
        registerToken: (token: import("../../store/useTokenStore").IPersistedToken, { rewrite }: {
            rewrite?: boolean | undefined;
        }) => import("../../store/useTokenStore").IPersistedTokenExtended;
        searchToken: {
            (type: string, withCancel?: false | undefined): Promise<any>;
            (type: string, withCancel: true): {
                request: Promise<any>;
                cancel: (message?: string | undefined) => void;
            };
        };
        getTokenInfo: (token: string, remote?: boolean | undefined) => Promise<import("../../store/useTokenStore").IPersistedToken | undefined>;
        importedTokens: import("vue").ComputedRef<import("../../store/useTokenStore").IPersistedTokenExtended[]>;
        removeToken: (token: import("../../store/useTokenStore").IPersistedToken) => void;
        isReady: import("vue").Ref<boolean>;
        isTokenVerified: (type: string) => boolean;
        fetchCoinsList: () => Promise<void>;
    }, "isReady" | "tokens">>, Pick<{
        getLogoUrl: import("vue").ComputedRef<(symbol: string) => any>;
        getToken: (type?: string | undefined) => import("../../store/useTokenStore").IPersistedTokenExtended | undefined;
        tokens: Record<string, import("../../store/useTokenStore").IPersistedTokenExtended>;
        token: import("vue").ComputedRef<() => import("../../store/useTokenStore").IPersistedToken | undefined>;
        registerToken: (token: import("../../store/useTokenStore").IPersistedToken, { rewrite }: {
            rewrite?: boolean | undefined;
        }) => import("../../store/useTokenStore").IPersistedTokenExtended;
        searchToken: {
            (type: string, withCancel?: false | undefined): Promise<any>;
            (type: string, withCancel: true): {
                request: Promise<any>;
                cancel: (message?: string | undefined) => void;
            };
        };
        getTokenInfo: (token: string, remote?: boolean | undefined) => Promise<import("../../store/useTokenStore").IPersistedToken | undefined>;
        importedTokens: import("vue").ComputedRef<import("../../store/useTokenStore").IPersistedTokenExtended[]>;
        removeToken: (token: import("../../store/useTokenStore").IPersistedToken) => void;
        isReady: import("vue").Ref<boolean>;
        isTokenVerified: (type: string) => boolean;
        fetchCoinsList: () => Promise<void>;
    }, "token" | "getLogoUrl" | "importedTokens">, Pick<{
        getLogoUrl: import("vue").ComputedRef<(symbol: string) => any>;
        getToken: (type?: string | undefined) => import("../../store/useTokenStore").IPersistedTokenExtended | undefined;
        tokens: Record<string, import("../../store/useTokenStore").IPersistedTokenExtended>;
        token: import("vue").ComputedRef<() => import("../../store/useTokenStore").IPersistedToken | undefined>;
        registerToken: (token: import("../../store/useTokenStore").IPersistedToken, { rewrite }: {
            rewrite?: boolean | undefined;
        }) => import("../../store/useTokenStore").IPersistedTokenExtended;
        searchToken: {
            (type: string, withCancel?: false | undefined): Promise<any>;
            (type: string, withCancel: true): {
                request: Promise<any>;
                cancel: (message?: string | undefined) => void;
            };
        };
        getTokenInfo: (token: string, remote?: boolean | undefined) => Promise<import("../../store/useTokenStore").IPersistedToken | undefined>;
        importedTokens: import("vue").ComputedRef<import("../../store/useTokenStore").IPersistedTokenExtended[]>;
        removeToken: (token: import("../../store/useTokenStore").IPersistedToken) => void;
        isReady: import("vue").Ref<boolean>;
        isTokenVerified: (type: string) => boolean;
        fetchCoinsList: () => Promise<void>;
    }, "getToken" | "registerToken" | "searchToken" | "getTokenInfo" | "removeToken" | "isTokenVerified" | "fetchCoinsList">>;
    ratesHasChanged: import("vue").Ref<boolean>;
    animationPause: import("vue").Ref<boolean>;
    inputTokens: import("vue").ComputedRef<number | undefined>;
    outputTokens: import("vue").ComputedRef<number | undefined>;
    inputCache: import("vue").Ref<number | undefined>;
    outputCache: import("vue").Ref<number | undefined>;
    fromToken: import("vue").ComputedRef<import("../../store/useTokenStore").IPersistedTokenExtended | undefined>;
    toToken: import("vue").ComputedRef<import("../../store/useTokenStore").IPersistedTokenExtended | undefined>;
    isDanger: import("vue").ComputedRef<boolean | 0 | undefined>;
    buttonState: import("vue").ComputedRef<{
        rateChanged: boolean;
        text: string;
    } | {
        text: string;
        rateChanged?: undefined;
    }>;
    animation: import("vue").Ref<{
        animation: string;
    } | undefined>;
    fromAmount: {
        alias: import("vue").ComputedRef<string>;
        symbol: import("vue").ComputedRef<string>;
        decimals: import("vue").ComputedRef<number>;
        formatted: import("vue").Ref<string>;
    };
    toAmount: {
        alias: import("vue").ComputedRef<string>;
        symbol: import("vue").ComputedRef<string>;
        decimals: import("vue").ComputedRef<number>;
        formatted: import("vue").Ref<string>;
    };
    onClose: () => void;
    onConfirm: () => void;
    readonly DialogHeader: import("vue").DefineComponent<{
        title: {
            type: StringConstructor;
            required: true;
        };
        hasBack: {
            type: BooleanConstructor;
            required: false;
        };
    }, {
        props: any;
        emits: (event: "close" | "back", ...args: any[]) => void;
        onClose: () => void;
        onBack: () => void;
        readonly PButton: typeof PButton;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("close" | "back")[], "close" | "back", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        title: {
            type: StringConstructor;
            required: true;
        };
        hasBack: {
            type: BooleanConstructor;
            required: false;
        };
    }>> & {
        onClose?: ((...args: any[]) => any) | undefined;
        onBack?: ((...args: any[]) => any) | undefined;
    }, {
        hasBack: boolean;
    }>;
    readonly TokenIcon: import("vue").DefineComponent<{
        logo: {
            type: StringConstructor;
            required: false;
        };
        type: {
            type: StringConstructor;
            required: false;
        };
        size: {
            type: StringConstructor;
            required: false;
        };
        class: {
            type: StringConstructor;
            required: false;
        };
    }, {
        props: any;
        tokenImageProps: import("vue").ComputedRef<{
            src: string;
            size?: undefined;
            address?: undefined;
            class?: undefined;
        } | {
            size: string | undefined;
            address: string | undefined;
            class: string | undefined;
            src?: undefined;
        }>;
        readonly IdentificationIcon: import("vue").DefineComponent<{
            address: {
                type: StringConstructor;
                required: true;
            };
            useHash: {
                type: BooleanConstructor;
                required: false;
            };
            size: {
                type: (StringConstructor | NumberConstructor)[];
                required: false;
            };
        }, {
            props: any;
            iconRef: import("vue").Ref<HTMLElement | undefined>;
            address: import("vue").Ref<string>;
            hashCode: (s?: string | undefined) => number;
            icon: import("vue").ComputedRef<HTMLElement>;
        }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
            address: {
                type: StringConstructor;
                required: true;
            };
            useHash: {
                type: BooleanConstructor;
                required: false;
            };
            size: {
                type: (StringConstructor | NumberConstructor)[];
                required: false;
            };
        }>>, {
            useHash: boolean;
        }>;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        logo: {
            type: StringConstructor;
            required: false;
        };
        type: {
            type: StringConstructor;
            required: false;
        };
        size: {
            type: StringConstructor;
            required: false;
        };
        class: {
            type: StringConstructor;
            required: false;
        };
    }>>, {}>;
    SwapGasSwitch: import("vue").DefineComponent<{}, {
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
        curves: {
            stable: string;
            uncorrelated: string;
        };
        isAvailable: import("vue").ComputedRef<boolean>;
        type: import("vue").Ref<import("../../types").TStableSwapType>;
        switchType: (_type: import("../../types").TStableSwapType) => void;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
    SwapInfo: import("vue").DefineComponent<{}, {
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
    readonly PButton: typeof PButton;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("close" | "confirm")[], "close" | "confirm", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>> & {
    onClose?: ((...args: any[]) => any) | undefined;
    onConfirm?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _sfc_main;
