import { d } from "@/utils/utils";

import {
  VERSION_0_5,
  CURVE_STABLE_V05,
  CURVE_STABLE,
  CURVE_UNCORRELATED,
  CURVE_UNCORRELATED_V05,
  VERSION_0,
  MODULES_V05_ACCOUNT,
  MODULES_ACCOUNT,
  RESOURCES_ACCOUNT,
  RESOURCES_V05_ACCOUNT,
} from "@/constants/constants";
import {TCurveType, TVersionType} from "@/types";

export function composeType(address: string, generics: string[]): string;

export function composeType(
  address: string,
  struct: string,
  generics?: string[],
): string;

export function composeType(
  address: string,
  module: string,
  struct: string,
  generics?: string[],
): string;

export function composeType(address: string, ...args: unknown[]): string {
  const generics: string[] = Array.isArray(args[args.length - 1])
    ? (args.pop() as string[])
    : [];
  const chains = [address, ...args].filter(Boolean);

  let result: string = chains.join('::');

  if (generics && generics.length) {
    result += `<${generics.join(',')}>`;
  }

  return result;
}

export function extractAddressFromType(type: string) {
  return type.split('::')[0];
}

export function withSlippage(slippage: number, value: number) {
  const multiply = 10000;
  const slippagePercent = slippage * multiply;

  return d(value).minus(d(value).mul(slippagePercent).div(multiply)).toNumber();
}

/**
 * Compute full curve type for given contract version
 *
 * @param type short name of curve
 * @param contract version
 * @returns curve full type
 */
export function getCurve(type: TCurveType, contract?: number): string {
  if (contract === VERSION_0_5) {
    if (type === 'stable') {
      return CURVE_STABLE_V05;
    }
    return CURVE_UNCORRELATED_V05;
  }
  if (type === 'uncorrelated') {
    return CURVE_UNCORRELATED;
  }
  return CURVE_STABLE;
}

/**
 * Compute short curve name for given curve full type
 *
 * @param type full type of curve
 * @returns short curve name
 */
export function getShortCurveFromFull(type: string): TCurveType {
  if (type === CURVE_STABLE || type === CURVE_STABLE_V05) return 'stable';
  if (type === CURVE_UNCORRELATED || type === CURVE_UNCORRELATED_V05) return 'uncorrelated';
  throw new Error('Wrong curve type passed');
}

/**
 * Get Modules Account Address for a Contract Version
 *
 * @throws Unknown contract version requested
 *
 * @param contract version number
 * @returns string with modules account address
 */
export function getModulesAccount(contract?: number): string {
  if (contract === undefined || contract === VERSION_0) {
    return MODULES_ACCOUNT;
  }
  if (contract === VERSION_0_5) return MODULES_V05_ACCOUNT;
  throw new Error('Unknown contract version requested');
}

/**
 * Get Resources Account Address for a Contract Version
 *
 * @throws Unknown contract version requested
 *
 * @param contract version number
 * @returns string with resources account address
 */
export function getResourcesAccount(contract?: number): string {
  if (contract === undefined || contract === VERSION_0) {
    return RESOURCES_ACCOUNT;
  }
  if (contract === VERSION_0_5) return RESOURCES_V05_ACCOUNT;
  throw new Error('Unknown contract version requested');
}

/**
 * Get contract version number based on passed curve type
 *
 * @throws Unknown curve passed
 *
 * @param curve full type of curve
 * @returns version
 */
export function getContractVersionFromCurve(curve: string): TVersionType {
  if ([CURVE_STABLE_V05, CURVE_UNCORRELATED_V05].includes(curve)) {
    return VERSION_0_5;
  }
  if ([CURVE_STABLE, CURVE_UNCORRELATED].includes(curve)) return VERSION_0;
  throw new Error(`Unknown curve passed: ${curve}`);
}