import { TVersionType } from '../types';
export declare function getPoolStr(coinX: string, coinY: string, curve: string, contract?: TVersionType): string;
export declare function getPoolLpStr(coinX: string, coinY: string, curve: string, contract?: TVersionType): string;
export declare function getPoolLpInfoStr(lp: string): string;
export declare function getTitleForPool(coinX: string, coinY: string, curve: string, contract?: number): string;
export declare function destructCoinStorePoolStr(type: string): string[];
