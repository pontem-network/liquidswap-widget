import { IPersistedTokenExtended } from '../../store/useTokenStore';
import PButton from 'primevue/button';
declare const _sfc_main: import("vue").DefineComponent<{
    tokenEntity: {
        type: null;
        required: false;
    };
}, {
    props: any;
    token: import("vue").ComputedRef<IPersistedTokenExtended | undefined>;
    tokenProvider: import("vue").ComputedRef<string>;
    TokenAlert: import("vue").DefineComponent<{
        type: {
            type: StringConstructor;
            required: true;
        }; /**
         * Token entity
         */
    }, {
        tokensStore: import("pinia").Store<"tokensStore", import("pinia")._UnwrapAll<Pick<{
            getLogoUrl: import("vue").ComputedRef<(symbol: string) => any>;
            getToken: (type?: string | undefined) => IPersistedTokenExtended | undefined;
            tokens: Record<string, IPersistedTokenExtended>;
            token: import("vue").ComputedRef<() => import('../../store/useTokenStore').IPersistedToken | undefined>;
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
            importedTokens: import("vue").ComputedRef<IPersistedTokenExtended[]>;
            removeToken: (token: import('../../store/useTokenStore').IPersistedToken) => void;
            isReady: import("vue").Ref<boolean>;
            isTokenVerified: (type: string) => boolean;
            fetchCoinsList: () => Promise<void>;
        }, "isReady" | "tokens">>, Pick<{
            getLogoUrl: import("vue").ComputedRef<(symbol: string) => any>;
            getToken: (type?: string | undefined) => IPersistedTokenExtended | undefined;
            tokens: Record<string, IPersistedTokenExtended>;
            token: import("vue").ComputedRef<() => import('../../store/useTokenStore').IPersistedToken | undefined>;
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
            importedTokens: import("vue").ComputedRef<IPersistedTokenExtended[]>;
            removeToken: (token: import('../../store/useTokenStore').IPersistedToken) => void;
            isReady: import("vue").Ref<boolean>;
            isTokenVerified: (type: string) => boolean;
            fetchCoinsList: () => Promise<void>;
        }, "token" | "getLogoUrl" | "importedTokens">, Pick<{
            getLogoUrl: import("vue").ComputedRef<(symbol: string) => any>;
            getToken: (type?: string | undefined) => IPersistedTokenExtended | undefined;
            tokens: Record<string, IPersistedTokenExtended>;
            token: import("vue").ComputedRef<() => import('../../store/useTokenStore').IPersistedToken | undefined>;
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
            importedTokens: import("vue").ComputedRef<IPersistedTokenExtended[]>;
            removeToken: (token: import('../../store/useTokenStore').IPersistedToken) => void;
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
        }; /**
         * Token entity
         */
    }>>, {}>;
    TokenIcon: import("vue").DefineComponent<{
        logo: {
            type: StringConstructor;
            required: false;
        };
        type: {
            type: StringConstructor; /**
             * Token entity
             */
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
            type: StringConstructor; /**
             * Token entity
             */
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
    PButton: typeof PButton;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "close"[], "close", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    tokenEntity: {
        type: null;
        required: false;
    };
}>> & {
    onClose?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _sfc_main;
