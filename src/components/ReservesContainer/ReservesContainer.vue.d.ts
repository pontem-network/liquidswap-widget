declare const _sfc_main: import("vue").DefineComponent<{
    type: {
        type: StringConstructor;
        required: true;
    };
}, {
    props: any;
    store: import("pinia").Store<"swapStore", import("pinia")._UnwrapAll<Pick<{
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
    poolsStore: import("pinia").Store<"poolsStore", import("pinia")._UnwrapAll<Pick<{
        isLoading: import("vue").Ref<boolean>;
        isReady: import("vue").Ref<boolean>;
        getPool: import("vue").ComputedRef<(coinX: string, coinY: string, curve: string) => Promise<import("../../types/pools").IPersistedPool>>;
        getCurveType: (coinX?: string | undefined, coinY?: string | undefined) => string | false;
        fetchPoolsList: () => Promise<void>;
        pools: import("vue").Ref<{
            title: string;
            reserveX: number;
            reserveY: number;
            addedX: number;
            addedY: number;
            lp: number;
            isDefault: boolean;
            apr?: number | undefined;
            coinX: string;
            coinY: string;
            curve: import("../../types").TCurveType;
            networkId: number;
        }[]>;
        poolsMap: Record<string, import("../../types/pools").IPersistedPool>;
        poolsTitleMap: Record<string, string>;
        defaultPools: import("vue").ComputedRef<import("../../types/pools").IPersistedPool[]>;
    }, "isLoading" | "isReady" | "pools" | "poolsMap" | "poolsTitleMap">>, Pick<{
        isLoading: import("vue").Ref<boolean>;
        isReady: import("vue").Ref<boolean>;
        getPool: import("vue").ComputedRef<(coinX: string, coinY: string, curve: string) => Promise<import("../../types/pools").IPersistedPool>>;
        getCurveType: (coinX?: string | undefined, coinY?: string | undefined) => string | false;
        fetchPoolsList: () => Promise<void>;
        pools: import("vue").Ref<{
            title: string;
            reserveX: number;
            reserveY: number;
            addedX: number;
            addedY: number;
            lp: number;
            isDefault: boolean;
            apr?: number | undefined;
            coinX: string;
            coinY: string;
            curve: import("../../types").TCurveType;
            networkId: number;
        }[]>;
        poolsMap: Record<string, import("../../types/pools").IPersistedPool>;
        poolsTitleMap: Record<string, string>;
        defaultPools: import("vue").ComputedRef<import("../../types/pools").IPersistedPool[]>;
    }, "getPool" | "defaultPools">, Pick<{
        isLoading: import("vue").Ref<boolean>;
        isReady: import("vue").Ref<boolean>;
        getPool: import("vue").ComputedRef<(coinX: string, coinY: string, curve: string) => Promise<import("../../types/pools").IPersistedPool>>;
        getCurveType: (coinX?: string | undefined, coinY?: string | undefined) => string | false;
        fetchPoolsList: () => Promise<void>;
        pools: import("vue").Ref<{
            title: string;
            reserveX: number;
            reserveY: number;
            addedX: number;
            addedY: number;
            lp: number;
            isDefault: boolean;
            apr?: number | undefined;
            coinX: string;
            coinY: string;
            curve: import("../../types").TCurveType;
            networkId: number;
        }[]>;
        poolsMap: Record<string, import("../../types/pools").IPersistedPool>;
        poolsTitleMap: Record<string, string>;
        defaultPools: import("vue").ComputedRef<import("../../types/pools").IPersistedPool[]>;
    }, "getCurveType" | "fetchPoolsList">>;
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
    poolRes: import("vue").Ref<{
        coinX: string;
        coinY: string;
        reserveX: number;
        reserveY: number;
    }>;
    getReserves: () => Promise<void>;
    toTokenEntity: import("vue").ComputedRef<import("../../store/useTokenStore").IPersistedTokenExtended | undefined>;
    fromTokenEntity: import("vue").ComputedRef<import("../../store/useTokenStore").IPersistedTokenExtended | undefined>;
    hasReserves: import("vue").ComputedRef<boolean | 0>;
    isSorted: import("vue").ComputedRef<boolean | 0>;
    fromCoin: import("vue").ComputedRef<"coinX" | "coinY">;
    toCoin: import("vue").ComputedRef<"coinX" | "coinY">;
    fromReserve: import("vue").ComputedRef<"reserveX" | "reserveY">;
    toReserve: import("vue").ComputedRef<"reserveX" | "reserveY">;
    reserveFrom: import("vue").ComputedRef<{
        alias: import("vue").ComputedRef<string>;
        symbol: import("vue").ComputedRef<string>;
        decimals: import("vue").ComputedRef<number>;
        formatted: import("vue").Ref<string>;
    }>;
    reserveTo: import("vue").ComputedRef<{
        alias: import("vue").ComputedRef<string>;
        symbol: import("vue").ComputedRef<string>;
        decimals: import("vue").ComputedRef<number>;
        formatted: import("vue").Ref<string>;
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
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    type: {
        type: StringConstructor;
        required: true;
    };
}>>, {}>;
export default _sfc_main;
