import { ICreateToken } from '../types';
export declare const getTokenDecimal: (token: string | undefined) => number | undefined;
/**
 * return blockchain format of decimal amount
 * @param amount
 * @param decimal
 * @returns
 */
export declare const getAmountInteger: (amount: number | undefined, decimal: number) => number | undefined;
export declare const getAmountWithDecimal: (amount: number | undefined, decimal: number) => number | undefined;
export declare const getStoredTokenUsdEquivalent: (storedToken: ICreateToken) => Promise<number | undefined>;
export declare function amount2NoENotation(amount: string, prefix: string): string;
