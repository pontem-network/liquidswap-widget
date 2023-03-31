import { IPersistedToken } from '@/store/useTokenStore';

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

export function titleForTokenSymbol(token: IPersistedToken) {
  const postfix = TITLES[token.source] ?? '';
  return postfix.length ? `${token.symbol} • ${postfix}` : `${token.symbol}`;
}

export function providerForToken(token: IPersistedToken) {
  const provider = TITLES[token.source] ?? '';
  return provider;
}