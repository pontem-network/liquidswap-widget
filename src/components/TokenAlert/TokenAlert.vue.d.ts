declare const _sfc_main: import("vue").DefineComponent<{
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
export default _sfc_main;
