import { NETWORKS_MODULES } from '@/constants/constants';
import { useTokensStore } from '@/store';
import { composeType, getResourcesAccount } from './contracts';
import { is_sorted } from './utils';
import { getCurve, getModulesAccount } from '@/utils/contracts';
import { TVersionType } from "@/types";


export function getPoolStr(
  coinX: string,
  coinY: string,
  curve: string,
  contract?: TVersionType,
): string {
  const [sortedX, sortedY] = is_sorted(coinX, coinY)
    ? [coinX, coinY]
    : [coinY, coinX];
  const moduleAccount = getModulesAccount(contract);
  return composeType(
    composeType(moduleAccount, 'liquidity_pool', 'LiquidityPool'),
    [sortedX, sortedY, curve],
  );
}

export function getPoolLpStr(
  coinX: string,
  coinY: string,
  curve: string,
  contract?: TVersionType,
): string {
  const [sortedX, sortedY] = is_sorted(coinX, coinY)
    ? [coinX, coinY]
    : [coinY, coinX];
  const resourceAccount = getResourcesAccount(contract);
  return composeType(
    resourceAccount,
    'lp_coin',
    'LP',
    [sortedX, sortedY, curve],
  );
}

export function getPoolLpInfoStr(lp: string): string {
  return composeType(NETWORKS_MODULES.CoinInfo, [lp]);
}

export function destructCoinStorePoolStr(type: string): string[] {
  if (type.length === 0) return [];
  return (
    type
      //
      .split('<')[2]
      .split('>')[0]
      .replaceAll(' ', '')
      .split(',')
  );
}

export function getTitleForPool(coinX: string, coinY: string) {
  if (!coinX || !coinY) return '';
  const tokensStore = useTokensStore();
  const [sortedX, sortedY] = is_sorted(coinX, coinY)
    ? [coinX, coinY]
    : [coinY, coinX];
  const tokenX = tokensStore.getToken(sortedX);
  const tokenY = tokensStore.getToken(sortedY);
  if (!tokenX || !tokenY) return '';
  const { alias: symbolX } = tokenX;
  const { alias: symbolY } = tokenY;

  return `${symbolX}/${symbolY}`;
}
