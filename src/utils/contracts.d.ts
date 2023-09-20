import { TCurveType, TVersionType } from '../types';
export declare function composeType(address: string, generics: string[]): string;
export declare function composeType(address: string, struct: string, generics?: string[]): string;
export declare function composeType(address: string, module: string, struct: string, generics?: string[]): string;
export declare function extractAddressFromType(type: string): string;
export declare function withSlippage(slippage: number, value: number): number;
/**
 * Compute full curve type for given contract version
 *
 * @param type short name of curve
 * @param contract version
 * @returns curve full type
 */
export declare function getCurve(type: TCurveType, contract?: number): string;
/**
 * Compute short curve name for given curve full type
 *
 * @param type full type of curve
 * @returns short curve name
 */
export declare function getShortCurveFromFull(type: string): 'stable' | 'uncorrelated';
/**
 * Get Modules Account Address for a Contract Version
 *
 * @throws Unknown contract version requested
 *
 * @param contract version number
 * @returns string with modules account address
 */
export declare function getModulesAccount(contract?: number): string;
/**
 * Get Resources Account Address for a Contract Version
 *
 * @throws Unknown contract version requested
 *
 * @param contract version number
 * @returns string with resources account address
 */
export declare function getResourcesAccount(contract?: number): string;
/**
 * Get contract version number based on passed curve type
 *
 * @throws Unknown curve passed
 *
 * @param curve full type of curve
 * @returns version
 */
export declare function getContractVersionFromCurve(curve: string): TVersionType;
