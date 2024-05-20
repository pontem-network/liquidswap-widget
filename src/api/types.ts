import { ChainId } from '@/types';
import { TCoinSource } from "@/types/coins";

interface PoolCoin {
  type: string; // '0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDT'
  chainId: number;
  decimals: number;
  logoUrl: string;
  name: string;
  source: string;
  symbol: string;
  symbolWithBridge: string;
  reserve: string; // '1442786121500'
  reserveUsd: string; // '1442945.712815217778'
  priceUsd: number; // 1.0001106132869173
}

export interface Pool {
  type: string;
  version: 0 | 0.5;
  curve: 'stable' | 'unstable';
  tvl: string;
  coinX: PoolCoin;
  coinY: PoolCoin;
  networkId: number;
  fee: string;
  lastBlockTimestamp: string;
  exceptional?: boolean;
}

export namespace GetRegisteredCoins {
  interface Coin {
    caution: boolean;
    chainId: ChainId;
    decimals: number;
    logo_url: string;
    name: string;
    order: number;
    source: TCoinSource;
    symbol: string;
    type: string;
    symbol_with_bridge: string;
    priceUsd: number;
    unsafe?: boolean;
  }

  export type Query = {
    /**
     * @default 1
     */
    networkId?: ChainId;
  };

  export type Response = Coin[];
}

export namespace GetRegisteredPools {
  export type Query = {
    networkId?: number;
  };
  export type Response = Pool[];
}
