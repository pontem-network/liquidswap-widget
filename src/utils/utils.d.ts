import Decimal from 'decimal.js';
export declare function d(value?: Decimal.Value): Decimal.Instance;
export declare function decimalsMultiplier(decimals?: Decimal.Value): Decimal.Instance;
export declare function checkAddress(address: any, options?: {
    leadingZero: boolean;
}): boolean;
export declare function checkAptosType(type: any, options?: {
    leadingZero: boolean;
}): boolean;
/**
 * Compare sorting between two coin types
 *
 * @param coin_x string with full address of coin
 * @param coin_y string with full address of coin
 * @returns boolean
 */
export declare function is_sorted(coin_x: string, coin_y: string): boolean;
export declare const splitValue: (value: string) => {
    spiltValue_: string[];
    lastIndex: number;
};
export declare function camelCaseKeysToUnderscore(obj: any): any;
export declare function getFormattedValidationCode(error: Error): any;
export declare function nope(): void;
