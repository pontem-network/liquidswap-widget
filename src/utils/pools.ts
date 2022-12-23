import {CURVE_STABLE, NETWORKS_MODULES} from '@/constants';
import { useTokensStore } from '@/store';
import { MODULES_ACCOUNT, RESOURCES_ACCOUNT } from '@/constants';
import { composeType } from './contracts';
import { is_sorted } from './utils';

const modulesLiquidityPool = composeType(
  MODULES_ACCOUNT,
  'liquidity_pool',
  'LiquidityPool',
);

export function getPoolStr(
  coinX: string,
  coinY: string,
  curve: string,
): string {
  const [sortedX, sortedY] = is_sorted(coinX, coinY)
    ? [coinX, coinY]
    : [coinY, coinX];
  return composeType(modulesLiquidityPool, [sortedX, sortedY, curve]);
}

export function getPoolLpStr(
  coinX: string,
  coinY: string,
  curve: string,
): string {
  const [sortedX, sortedY] = is_sorted(coinX, coinY)
    ? [coinX, coinY]
    : [coinY, coinX];
  return composeType(
    //
    RESOURCES_ACCOUNT,
    'lp_coin',
    'LP',
    [sortedX, sortedY, curve],
  );
}

export function getPoolLpInfoStr(lp: string): string {
  return composeType(NETWORKS_MODULES.CoinInfo, [lp]);
}

export function getTitleForPool(coinX: string, coinY: string, curve: string) {
  if (!coinX || !coinY) return '';
  const tokensStore = useTokensStore();
  const [sortedX, sortedY] = is_sorted(coinX, coinY)
    ? [coinX, coinY]
    : [coinY, coinX];
  const tokenX = tokensStore.getToken(sortedX);
  const tokenY = tokensStore.getToken(sortedY);
  if (!tokenX || !tokenY) return '';
  const { alias: aliasX } = tokenX;
  const { alias: aliasY } = tokenY;
  const curveStar = curve === CURVE_STABLE ? '*' : '';
  return `${aliasX}/${aliasY}${curveStar}`;
}
