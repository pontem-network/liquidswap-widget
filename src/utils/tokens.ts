import { IPersistedToken } from '@/types/coins';

const PREFIXES: Record<string, string> = {
  // layerzero: 'lz',
  wormhole: 'wh',
  celer: 'cl',
};

export function aliasForToken(token: IPersistedToken) {
  const prefix = PREFIXES[token.source] ?? '';
  return `${prefix}${token.symbol}`;
}

const TITLES: Record<string, string> = {
  layerzero: 'Layer Zero',
  wormhole: 'Wormhole',
  chainx: 'ChainX',
  celer: 'Celer',
};

export function titleForToken(token: IPersistedToken) {
  const prefix = TITLES[token.source] ?? '';
  return prefix.length ? `${prefix} • ${token.name}` : `${token.name}`;
}
