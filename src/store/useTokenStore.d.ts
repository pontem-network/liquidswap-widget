import { ComputedRef } from 'vue';
import { TCoinSource } from '../types/coins';
export interface IPersistedToken {
    type: string;
    chainId: number;
    decimals: number;
    symbol: string;
    name: string;
    address?: string;
    logoURI?: string;
    verified?: boolean;
    source: TCoinSource;
    order?: number;
    caution?: boolean;
}
export interface IPersistedTokenExtended extends IPersistedToken {
    logo: string;
    alias: string;
    title: string;
}
export declare const useTokensStore: import("pinia").StoreDefinition<"tokensStore", import("pinia")._UnwrapAll<Pick<{
    getLogoUrl: ComputedRef<(symbol: string, source: string | undefined) => any>;
    getToken: (type?: string) => IPersistedTokenExtended | undefined;
    tokens: Record<string, IPersistedTokenExtended>;
    token: ComputedRef<() => IPersistedToken | undefined>;
    registerToken: (token: IPersistedToken, { rewrite }: {
        rewrite?: boolean | undefined;
    }) => IPersistedTokenExtended;
    searchToken: {
        (type: string, withCancel?: false): Promise<any>;
        (type: string, withCancel: true): {
            request: Promise<any>;
            cancel: (message?: string) => void;
        };
    };
    getTokenInfo: (token: string, remote?: boolean) => Promise<IPersistedToken | undefined>;
    importedTokens: ComputedRef<IPersistedTokenExtended[]>;
    removeToken: (token: IPersistedToken) => void;
    isReady: import("vue").Ref<boolean>;
    isTokenVerified: (type: string) => boolean;
    fetchCoinsList: () => Promise<void>;
}, "tokens" | "isReady">>, Pick<{
    getLogoUrl: ComputedRef<(symbol: string, source: string | undefined) => any>;
    getToken: (type?: string) => IPersistedTokenExtended | undefined;
    tokens: Record<string, IPersistedTokenExtended>;
    token: ComputedRef<() => IPersistedToken | undefined>;
    registerToken: (token: IPersistedToken, { rewrite }: {
        rewrite?: boolean | undefined;
    }) => IPersistedTokenExtended;
    searchToken: {
        (type: string, withCancel?: false): Promise<any>;
        (type: string, withCancel: true): {
            request: Promise<any>;
            cancel: (message?: string) => void;
        };
    };
    getTokenInfo: (token: string, remote?: boolean) => Promise<IPersistedToken | undefined>;
    importedTokens: ComputedRef<IPersistedTokenExtended[]>;
    removeToken: (token: IPersistedToken) => void;
    isReady: import("vue").Ref<boolean>;
    isTokenVerified: (type: string) => boolean;
    fetchCoinsList: () => Promise<void>;
}, "getLogoUrl" | "token" | "importedTokens">, Pick<{
    getLogoUrl: ComputedRef<(symbol: string, source: string | undefined) => any>;
    getToken: (type?: string) => IPersistedTokenExtended | undefined;
    tokens: Record<string, IPersistedTokenExtended>;
    token: ComputedRef<() => IPersistedToken | undefined>;
    registerToken: (token: IPersistedToken, { rewrite }: {
        rewrite?: boolean | undefined;
    }) => IPersistedTokenExtended;
    searchToken: {
        (type: string, withCancel?: false): Promise<any>;
        (type: string, withCancel: true): {
            request: Promise<any>;
            cancel: (message?: string) => void;
        };
    };
    getTokenInfo: (token: string, remote?: boolean) => Promise<IPersistedToken | undefined>;
    importedTokens: ComputedRef<IPersistedTokenExtended[]>;
    removeToken: (token: IPersistedToken) => void;
    isReady: import("vue").Ref<boolean>;
    isTokenVerified: (type: string) => boolean;
    fetchCoinsList: () => Promise<void>;
}, "getToken" | "registerToken" | "searchToken" | "getTokenInfo" | "removeToken" | "isTokenVerified" | "fetchCoinsList">>;
