import { TCurveType } from './index';

export interface IPoolInfo {
  coinX: string;
  coinY: string;
  curve: TCurveType;
  networkId: number;
}

export interface IPoolBase {
  coinX: string;
  coinY: string;
  curve: string;
  networkId: number;
}

export interface IPersistedPool extends IPoolInfo {
  title: string;
  reserveX: number;
  reserveY: number;
  addedX: number;
  addedY: number;
  lp: number;
  isDefault: boolean;
  apr?: number;
}
