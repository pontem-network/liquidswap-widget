import { ComputedRef } from 'vue';
import { IPersistedTokenExtended } from '../../store/useTokenStore';
import ProgressSpinner from 'primevue/progressspinner';
import InputText from 'primevue/inputtext';
declare type TokenInList = {
    token: IPersistedTokenExtended;
    selected: boolean;
    command: (...args: any[]) => void;
};
declare const _sfc_main: import("vue").DefineComponent<{
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
    rawTokenList_: import("vue").Ref<TokenInList[] | undefined>;
    tokenList_: import("vue").Ref<TokenInList[] | undefined>;
    isLoadingTokensList: import("vue").Ref<boolean>;
    onClose: () => void;
    tokensStore: import("pinia").Store<"tokensStore", import("pinia")._UnwrapAll<Pick<{
        getLogoUrl: ComputedRef<(symbol: string) => any>;
        getToken: (type?: string | undefined) => IPersistedTokenExtended | undefined;
        tokens: Record<string, IPersistedTokenExtended>;
        token: ComputedRef<() => import('../../store/useTokenStore').IPersistedToken | undefined>;
        registerToken: (token: import('../../store/useTokenStore').IPersistedToken, { rewrite }: {
            rewrite?: boolean | undefined;
        }) => IPersistedTokenExtended;
        searchToken: {
            (type: string, withCancel?: false | undefined): Promise<any>;
            (type: string, withCancel: true): {
                request: Promise<any>;
                cancel: (message?: string | undefined) => void;
            };
        };
        getTokenInfo: (token: string, remote?: boolean | undefined) => Promise<import('../../store/useTokenStore').IPersistedToken | undefined>;
        importedTokens: ComputedRef<IPersistedTokenExtended[]>;
        removeToken: (token: import('../../store/useTokenStore').IPersistedToken) => void;
        isReady: import("vue").Ref<boolean>;
        isTokenVerified: (type: string) => boolean;
        fetchCoinsList: () => Promise<void>;
    }, "isReady" | "tokens">>, Pick<{
        getLogoUrl: ComputedRef<(symbol: string) => any>;
        getToken: (type?: string | undefined) => IPersistedTokenExtended | undefined;
        tokens: Record<string, IPersistedTokenExtended>;
        token: ComputedRef<() => import('../../store/useTokenStore').IPersistedToken | undefined>;
        registerToken: (token: import('../../store/useTokenStore').IPersistedToken, { rewrite }: {
            rewrite?: boolean | undefined;
        }) => IPersistedTokenExtended;
        searchToken: {
            (type: string, withCancel?: false | undefined): Promise<any>;
            (type: string, withCancel: true): {
                request: Promise<any>;
                cancel: (message?: string | undefined) => void;
            };
        };
        getTokenInfo: (token: string, remote?: boolean | undefined) => Promise<import('../../store/useTokenStore').IPersistedToken | undefined>;
        importedTokens: ComputedRef<IPersistedTokenExtended[]>;
        removeToken: (token: import('../../store/useTokenStore').IPersistedToken) => void;
        isReady: import("vue").Ref<boolean>;
        isTokenVerified: (type: string) => boolean;
        fetchCoinsList: () => Promise<void>;
    }, "token" | "getLogoUrl" | "importedTokens">, Pick<{
        getLogoUrl: ComputedRef<(symbol: string) => any>;
        getToken: (type?: string | undefined) => IPersistedTokenExtended | undefined;
        tokens: Record<string, IPersistedTokenExtended>;
        token: ComputedRef<() => import('../../store/useTokenStore').IPersistedToken | undefined>;
        registerToken: (token: import('../../store/useTokenStore').IPersistedToken, { rewrite }: {
            rewrite?: boolean | undefined;
        }) => IPersistedTokenExtended;
        searchToken: {
            (type: string, withCancel?: false | undefined): Promise<any>;
            (type: string, withCancel: true): {
                request: Promise<any>;
                cancel: (message?: string | undefined) => void;
            };
        };
        getTokenInfo: (token: string, remote?: boolean | undefined) => Promise<import('../../store/useTokenStore').IPersistedToken | undefined>;
        importedTokens: ComputedRef<IPersistedTokenExtended[]>;
        removeToken: (token: import('../../store/useTokenStore').IPersistedToken) => void;
        isReady: import("vue").Ref<boolean>;
        isTokenVerified: (type: string) => boolean;
        fetchCoinsList: () => Promise<void>;
    }, "getToken" | "registerToken" | "searchToken" | "getTokenInfo" | "removeToken" | "isTokenVerified" | "fetchCoinsList">>;
    search: import("vue").Ref<string>;
    searchLoading: import("vue").Ref<boolean>;
    searchRegexp: ComputedRef<RegExp>;
    rawTokenList: () => Promise<TokenInList[]>;
    selectedTokens: ComputedRef<(string | undefined)[]>;
    searchToken: (resource: string) => () => void;
    filterTokenList: (list: TokenInList[]) => TokenInList[];
    selectToken: (token: string) => void;
    ProgressSpinner: typeof ProgressSpinner;
    InputText: typeof InputText;
    TextHighlight: import("vue").DefineComponent<unknown, object, {}, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<unknown>, {}>;
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
    TokenAlert: import("vue").DefineComponent<{
        type: {
            type: StringConstructor;
            required: true;
        };
    }, {
        tokensStore: import("pinia").Store<"tokensStore", import("pinia")._UnwrapAll<Pick<{
            getLogoUrl: ComputedRef<(symbol: string) => any>;
            getToken: (type?: string | undefined) => IPersistedTokenExtended | undefined;
            tokens: Record<string, IPersistedTokenExtended>;
            token: ComputedRef<() => import('../../store/useTokenStore').IPersistedToken | undefined>;
            registerToken: (token: import('../../store/useTokenStore').IPersistedToken, { rewrite }: {
                rewrite?: boolean | undefined;
            }) => IPersistedTokenExtended;
            searchToken: {
                (type: string, withCancel?: false | undefined): Promise<any>;
                (type: string, withCancel: true): {
                    request: Promise<any>;
                    cancel: (message?: string | undefined) => void;
                };
            };
            getTokenInfo: (token: string, remote?: boolean | undefined) => Promise<import('../../store/useTokenStore').IPersistedToken | undefined>;
            importedTokens: ComputedRef<IPersistedTokenExtended[]>;
            removeToken: (token: import('../../store/useTokenStore').IPersistedToken) => void;
            isReady: import("vue").Ref<boolean>;
            isTokenVerified: (type: string) => boolean;
            fetchCoinsList: () => Promise<void>;
        }, "isReady" | "tokens">>, Pick<{
            getLogoUrl: ComputedRef<(symbol: string) => any>;
            getToken: (type?: string | undefined) => IPersistedTokenExtended | undefined;
            tokens: Record<string, IPersistedTokenExtended>;
            token: ComputedRef<() => import('../../store/useTokenStore').IPersistedToken | undefined>;
            registerToken: (token: import('../../store/useTokenStore').IPersistedToken, { rewrite }: {
                rewrite?: boolean | undefined;
            }) => IPersistedTokenExtended;
            searchToken: {
                (type: string, withCancel?: false | undefined): Promise<any>;
                (type: string, withCancel: true): {
                    request: Promise<any>;
                    cancel: (message?: string | undefined) => void;
                };
            };
            getTokenInfo: (token: string, remote?: boolean | undefined) => Promise<import('../../store/useTokenStore').IPersistedToken | undefined>;
            importedTokens: ComputedRef<IPersistedTokenExtended[]>;
            removeToken: (token: import('../../store/useTokenStore').IPersistedToken) => void;
            isReady: import("vue").Ref<boolean>;
            isTokenVerified: (type: string) => boolean;
            fetchCoinsList: () => Promise<void>;
        }, "token" | "getLogoUrl" | "importedTokens">, Pick<{
            getLogoUrl: ComputedRef<(symbol: string) => any>;
            getToken: (type?: string | undefined) => IPersistedTokenExtended | undefined;
            tokens: Record<string, IPersistedTokenExtended>;
            token: ComputedRef<() => import('../../store/useTokenStore').IPersistedToken | undefined>;
            registerToken: (token: import('../../store/useTokenStore').IPersistedToken, { rewrite }: {
                rewrite?: boolean | undefined;
            }) => IPersistedTokenExtended;
            searchToken: {
                (type: string, withCancel?: false | undefined): Promise<any>;
                (type: string, withCancel: true): {
                    request: Promise<any>;
                    cancel: (message?: string | undefined) => void;
                };
            };
            getTokenInfo: (token: string, remote?: boolean | undefined) => Promise<import('../../store/useTokenStore').IPersistedToken | undefined>;
            importedTokens: ComputedRef<IPersistedTokenExtended[]>;
            removeToken: (token: import('../../store/useTokenStore').IPersistedToken) => void;
            isReady: import("vue").Ref<boolean>;
            isTokenVerified: (type: string) => boolean;
            fetchCoinsList: () => Promise<void>;
        }, "getToken" | "registerToken" | "searchToken" | "getTokenInfo" | "removeToken" | "isTokenVerified" | "fetchCoinsList">>;
        props: any;
        type: import("vue").Ref<string>;
        isNotDefaultCoin: ComputedRef<boolean>;
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
        tokenImageProps: ComputedRef<{
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
            icon: ComputedRef<any>;
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
export default _sfc_main;
