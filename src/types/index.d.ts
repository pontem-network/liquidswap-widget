import { AptosWalletAdapter, MartianWalletAdapter, PontemWalletAdapter, FewchaWalletAdapter, RiseWalletAdapter, MsafeWalletAdapter, WalletName } from '@pontem/aptos-wallet-adapter';
import { VERSION_0, VERSION_0_5 } from '../constants/constants';
export declare type AptosCoinInfoResource = {
    decimals: string;
    name: string;
    supply: {
        vec: [string];
    };
    symbol: string;
};
export interface IStorageBasic {
    version: number;
}
export declare type Resource<T = any> = {
    type: string;
    data: T;
};
export interface IWallet {
    key: WalletName<string>;
    label: string;
    logo: string;
    adapter: typeof PontemWalletAdapter | typeof AptosWalletAdapter | typeof MartianWalletAdapter | typeof FewchaWalletAdapter | typeof RiseWalletAdapter | typeof MsafeWalletAdapter;
    options?: any;
}
export declare type TCurveType = 'uncorrelated' | 'stable' | 'selectable';
export declare type TStableSwapType = 'normal' | 'high';
export declare type Network = {
    id: number;
    title: string;
    shortTitle: string;
    restUrl: string;
    defaultToken: string;
    modules: {
        Faucet: string;
        Scripts: string;
        LiquidityPool: string;
        CoinInfo: string;
        CoinStore: string;
    };
};
export interface ICreateToken {
    token?: string;
    amount?: number;
}
export interface IStoredToken extends ICreateToken {
    reserve: number;
}
export declare type TVersionType = typeof VERSION_0 | typeof VERSION_0_5;
export interface IPoolExist {
    fromCoin: string;
    toCoin: string;
    curve: string;
    version: TVersionType;
}
export declare type TStatusTransaction = "success" | "pending" | "error" | "rejected";
