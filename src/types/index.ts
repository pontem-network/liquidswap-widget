import {
  AptosWalletAdapter,
  MartianWalletAdapter,
  PontemWalletAdapter,
  FewchaWalletAdapter,
  RiseWalletAdapter,
  MsafeWalletAdapter,
  WalletName,
} from '@pontem/aptos-wallet-adapter';

export type AptosCoinInfoResource = {
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

export type Resource<T = any> = {
  type: string;
  data: T;
};

export interface IWallet {
  key: WalletName<string>;
  label: string;
  logo: string;
  adapter:
    | typeof PontemWalletAdapter
    | typeof AptosWalletAdapter
    | typeof MartianWalletAdapter
    | typeof FewchaWalletAdapter
    | typeof RiseWalletAdapter
    | typeof MsafeWalletAdapter;
  options?: any;
}

export type TCurveType = 'uncorrelated' | 'stable' | 'selectable';

export type TStableSwapType = 'normal' | 'high';

export type Network = {
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
  // tokens: IPersistedToken[];
};

export interface ICreateToken {
  token?: string;
  amount?: number;
}

export interface IStoredToken extends ICreateToken {
  reserve: number;
}

export interface IPoolExist {
  fromCoin: string;
  toCoin: string;
  curve: string;
}