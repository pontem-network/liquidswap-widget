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
