import PDialog from 'primevue/dialog';
declare const _sfc_main: import("vue").DefineComponent<{
    actionToken: {
        type: StringConstructor;
        required: false;
    };
    secondaryToken: {
        type: StringConstructor;
        required: false;
    };
    field: {
        type: StringConstructor;
        required: false;
    };
}, {
    emits: (event: "update:actionToken" | "update:secondaryToken", ...args: any[]) => void;
    props: any;
    display: import("vue").Ref<boolean>;
    view: import("vue").Ref<"root" | "mange-presets">;
    history: import("vue").Ref<string[]>;
    localActionToken: import("vue").WritableComputedRef<string | undefined>;
    localSecondaryToken: import("vue").WritableComputedRef<string | undefined>;
    onNavigate: (next: string | undefined) => void;
    onClose: () => void;
    onBack: () => void;
    show: () => void;
    hide: () => void;
    TokenList: import("vue").DefineComponent<{
        actionToken: {
            type: StringConstructor;
            required: false;
        };
        secondaryToken: {
            type: StringConstructor;
            required: false;
        };
        poolId: {
            type: StringConstructor;
            required: false;
        };
        field: {
            type: StringConstructor;
            required: false;
        };
    }, {
        props: any;
        emits: (event: "close" | "update:actionToken" | "navigate" | "update:poolId", ...args: any[]) => void;
        rawTokenList_: import("vue").Ref<{
            token: import("../../store/useTokenStore").IPersistedTokenExtended;
            selected: boolean;
            command: (...args: any[]) => void;
        }[] | undefined>;
        tokenList_: import("vue").Ref<{
            token: import("../../store/useTokenStore").IPersistedTokenExtended;
            selected: boolean;
            command: (...args: any[]) => void;
        }[] | undefined>;
        isLoadingTokensList: import("vue").Ref<boolean>;
        onClose: () => void;
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
        search: import("vue").Ref<string>;
        searchLoading: import("vue").Ref<boolean>;
        searchRegexp: import("vue").ComputedRef<RegExp>;
        rawTokenList: () => Promise<{
            token: import("../../store/useTokenStore").IPersistedTokenExtended;
            selected: boolean;
            command: (...args: any[]) => void;
        }[]>;
        selectedTokens: import("vue").ComputedRef<(string | undefined)[]>;
        searchToken: (resource: string) => () => void;
        filterTokenList: (list: {
            token: import("../../store/useTokenStore").IPersistedTokenExtended;
            selected: boolean;
            command: (...args: any[]) => void;
        }[]) => {
            token: import("../../store/useTokenStore").IPersistedTokenExtended;
            selected: boolean;
            command: (...args: any[]) => void;
        }[];
        selectToken: (token: string) => void;
        readonly ProgressSpinner: typeof import("primevue/progressspinner").default;
        readonly InputText: typeof import("primevue/inputtext").default;
        readonly TextHighlight: import("vue").DefineComponent<unknown, object, {}, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<unknown>, {}>;
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
            readonly PButton: typeof import("primevue/button").default;
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
        readonly TokenAlert: import("vue").DefineComponent<{
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
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("close" | "update:actionToken" | "navigate" | "update:poolId")[], "close" | "update:actionToken" | "navigate" | "update:poolId", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        actionToken: {
            type: StringConstructor;
            required: false;
        };
        secondaryToken: {
            type: StringConstructor;
            required: false;
        };
        poolId: {
            type: StringConstructor;
            required: false;
        };
        field: {
            type: StringConstructor;
            required: false;
        };
    }>> & {
        onClose?: ((...args: any[]) => any) | undefined;
        "onUpdate:actionToken"?: ((...args: any[]) => any) | undefined;
        onNavigate?: ((...args: any[]) => any) | undefined;
        "onUpdate:poolId"?: ((...args: any[]) => any) | undefined;
    }, {}>;
    readonly PDialog: typeof PDialog;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:actionToken" | "update:secondaryToken")[], "update:actionToken" | "update:secondaryToken", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    actionToken: {
        type: StringConstructor;
        required: false;
    };
    secondaryToken: {
        type: StringConstructor;
        required: false;
    };
    field: {
        type: StringConstructor;
        required: false;
    };
}>> & {
    "onUpdate:actionToken"?: ((...args: any[]) => any) | undefined;
    "onUpdate:secondaryToken"?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _sfc_main;
