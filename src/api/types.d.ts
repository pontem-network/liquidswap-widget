import { ChainId } from '../types';
import { TCoinSource } from '../types/coins';
interface PoolCoin {
    type: string;
    chainId: number;
    decimals: number;
    logoUrl: string;
    name: string;
    source: string;
    symbol: string;
    symbolWithBridge: string;
    reserve: string;
    reserveUsd: string;
    priceUsd: number;
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
export declare namespace GetRegisteredCoins {
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
    export {};
}
export declare namespace GetRegisteredPools {
    type Query = {
        networkId?: number;
    };
    type Response = Pool[];
}
export {};
