declare type TManageSwitch = 'lists' | 'coins';
declare const _sfc_main: import("vue").DefineComponent<{}, {
    emits: (event: "close" | "back" | "navigate", ...args: any[]) => void;
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
    manageSwitch: import("vue").Ref<TManageSwitch>;
    addressImportStr: import("vue").Ref<string>;
    error: import("vue").Ref<boolean>;
    onClose: () => void;
    DialogHeader: import("vue").DefineComponent<{
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
        PButton: typeof import("primevue/button").default;
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
    CoinsList: import("vue").DefineComponent<{}, {
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
        addressImportStr: import("vue").Ref<string>;
        tokenPreview: import("vue").Ref<any>;
        importDialog: import("vue").Ref<any>;
        tokenType: import("vue").ComputedRef<any>;
        hasPreview: import("vue").ComputedRef<boolean>;
        importToken: () => void;
        importedCoins: import("vue").ComputedRef<import("../../store/useTokenStore").IPersistedTokenExtended[]>;
        removeToken: (toRemove: import("../../store/useTokenStore").IPersistedTokenExtended) => void;
        ImportTokenDialog: import("vue").DefineComponent<{
            token: {
                type: StringConstructor;
                required: true;
            };
            mode: {
                type: StringConstructor;
                required: false;
            };
            hasBack: {
                type: BooleanConstructor;
                required: false;
            };
        }, {
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
            tokenPreview: import("vue").Ref<any>;
            display: import("vue").Ref<boolean>;
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
                priceImpactFormatted: import("vue").ComputedRef<string>;
                version: import("vue").WritableComputedRef<number>;
                predefinedCurve: import("vue").ComputedRef<string | false>;
            }, "curve" | "version" | "convertRate" | "convertFee" | "convertFeeAmount" | "fromCurrency" | "interactiveField" | "isUpdatingRate" | "lastInteractiveField" | "slippage" | "slippageIsDefault" | "toCurrency" | "poolExists" | "convertError" | "stableSwapType">>, Pick<{
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
                version: import("vue").WritableComputedRef<number>;
                predefinedCurve: import("vue").ComputedRef<string | false>;
            }, "networkId" | "isBusy" | "isPoolAbsence" | "slippageAmount" | "priceImpact" | "priceImpactFormatted" | "predefinedCurve">, Pick<{
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
                version: import("vue").WritableComputedRef<number>;
                predefinedCurve: import("vue").ComputedRef<string | false>;
            }, "check" | "toggleCurrencies" | "refetchRates">>;
            emits: (event: "close", ...args: any[]) => void;
            getToken: () => Promise<void>;
            importToken: () => void;
            show: () => void;
            hide: () => void;
            onClose: () => void;
            DialogHeader: import("vue").DefineComponent<{
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
                PButton: typeof import("primevue/button").default;
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
            TokenIcon: import("vue").DefineComponent<{
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
                IdentificationIcon: import("vue").DefineComponent<{
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
                    icon: import("vue").ComputedRef<any>;
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
            PDialog: typeof import("primevue/dialog").default;
            PButton: typeof import("primevue/button").default;
        }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "close"[], "close", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
            token: {
                type: StringConstructor;
                required: true;
            };
            mode: {
                type: StringConstructor;
                required: false;
            };
            hasBack: {
                type: BooleanConstructor;
                required: false;
            };
        }>> & {
            onClose?: ((...args: any[]) => any) | undefined;
        }, {
            hasBack: boolean;
        }>;
        TokenAlert: import("vue").DefineComponent<{
            type: {
                type: StringConstructor;
                required: true;
            };
        }, {
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
            props: any;
            type: import("vue").Ref<string>;
            isNotDefaultCoin: import("vue").ComputedRef<boolean>;
            ToolTip: {
                name: string;
                props: {
                    tooltipText: {
                        type: StringConstructor;
                        default: string;
                    };
                    position: {
                        default: string;
                        type: StringConstructor;
                    };
                };
            };
        }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
            type: {
                type: StringConstructor;
                required: true;
            };
        }>>, {}>;
        TokenIcon: import("vue").DefineComponent<{
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
            IdentificationIcon: import("vue").DefineComponent<{
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
                icon: import("vue").ComputedRef<any>;
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
        PButton: typeof import("primevue/button").default;
        InputText: typeof import("primevue/inputtext").default;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("close" | "back" | "navigate")[], "close" | "back" | "navigate", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>> & {
    onClose?: ((...args: any[]) => any) | undefined;
    onBack?: ((...args: any[]) => any) | undefined;
    onNavigate?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _sfc_main;
