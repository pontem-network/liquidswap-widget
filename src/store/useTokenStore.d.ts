import { TCoinSource } from '../types/coins';
import { ComputedRef } from 'vue';
export interface IPersistedToken {
    type: string;
    chainId: number;
    decimals: number;
    symbol: string;
    name: string;
    address?: string;
    logo?: string;
    logo_url?: string;
    verified?: boolean;
    source: TCoinSource;
    order?: number;
    caution?: boolean;
    unsafe?: boolean;
}
export interface IPersistedTokenExtended extends IPersistedToken {
    logo: string;
    alias: string;
    title: string;
}
export declare const useTokensStore: import("pinia").StoreDefinition<"tokensStore", import("pinia")._UnwrapAll<Pick<{
    getToken: (type?: string) => IPersistedTokenExtended | undefined;
    tokens: Record<string, IPersistedTokenExtended>;
    token: ComputedRef<() => IPersistedToken | undefined>;
    registerToken: (token: IPersistedToken, { rewrite }: {
        rewrite?: boolean | undefined;
    }) => Promise<IPersistedTokenExtended>;
    searchToken: {
        (type: string, withCancel?: false): Promise<IPersistedTokenExtended>;
        (type: string, withCancel: true): {
            request: Promise<IPersistedTokenExtended>;
            cancel: (message?: string) => void;
        };
    };
    getTokenInfo: (token: string, remote?: boolean) => Promise<IPersistedToken | undefined>;
    importedTokens: ComputedRef<IPersistedTokenExtended[]>;
    removeToken: (token: IPersistedToken) => void;
    isReady: import("vue").Ref<boolean>;
    isTokenVerified: (type: string) => boolean;
    fetchCoinsList: () => Promise<IPersistedTokenExtended[]>;
    fetchCoinsData: () => Promise<[(IPersistedTokenExtended | undefined)[] | undefined, IPersistedTokenExtended[]]>;
}, "tokens" | "isReady">>, Pick<{
    getToken: (type?: string) => IPersistedTokenExtended | undefined;
    tokens: Record<string, IPersistedTokenExtended>;
    token: ComputedRef<() => IPersistedToken | undefined>;
    registerToken: (token: IPersistedToken, { rewrite }: {
        rewrite?: boolean | undefined;
    }) => Promise<IPersistedTokenExtended>;
    searchToken: {
        (type: string, withCancel?: false): Promise<IPersistedTokenExtended>;
        (type: string, withCancel: true): {
            request: Promise<IPersistedTokenExtended>;
            cancel: (message?: string) => void;
        };
    };
    getTokenInfo: (token: string, remote?: boolean) => Promise<IPersistedToken | undefined>;
    importedTokens: ComputedRef<IPersistedTokenExtended[]>;
    removeToken: (token: IPersistedToken) => void;
    isReady: import("vue").Ref<boolean>;
    isTokenVerified: (type: string) => boolean;
    fetchCoinsList: () => Promise<IPersistedTokenExtended[]>;
    fetchCoinsData: () => Promise<[(IPersistedTokenExtended | undefined)[] | undefined, IPersistedTokenExtended[]]>;
}, "token" | "importedTokens">, Pick<{
    getToken: (type?: string) => IPersistedTokenExtended | undefined;
    tokens: Record<string, IPersistedTokenExtended>;
    token: ComputedRef<() => IPersistedToken | undefined>;
    registerToken: (token: IPersistedToken, { rewrite }: {
        rewrite?: boolean | undefined;
    }) => Promise<IPersistedTokenExtended>;
    searchToken: {
        (type: string, withCancel?: false): Promise<IPersistedTokenExtended>;
        (type: string, withCancel: true): {
            request: Promise<IPersistedTokenExtended>;
            cancel: (message?: string) => void;
        };
    };
    getTokenInfo: (token: string, remote?: boolean) => Promise<IPersistedToken | undefined>;
    importedTokens: ComputedRef<IPersistedTokenExtended[]>;
    removeToken: (token: IPersistedToken) => void;
    isReady: import("vue").Ref<boolean>;
    isTokenVerified: (type: string) => boolean;
    fetchCoinsList: () => Promise<IPersistedTokenExtended[]>;
    fetchCoinsData: () => Promise<[(IPersistedTokenExtended | undefined)[] | undefined, IPersistedTokenExtended[]]>;
}, "getToken" | "registerToken" | "searchToken" | "getTokenInfo" | "removeToken" | "isTokenVerified" | "fetchCoinsList" | "fetchCoinsData">>;
