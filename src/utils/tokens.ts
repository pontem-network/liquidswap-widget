import { IPersistedToken } from '@/store/useTokenStore';

const PREFIXES: Record<string, string> = {
  // layerzero: 'lz',
  wormhole: 'wh',
  celer: 'cl',
  amnis: 'am',
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
  multichain: 'Multichain',
  amnis: 'Amnis',
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

const PREFIXES_VALUES = Object.values(PREFIXES);

export function formatAliasForToken(alias: string) {
  if (!alias) {
    return '';
  }

  for (const prefix of PREFIXES_VALUES) {
    if (alias.startsWith(prefix)) {
      return alias.substring(prefix.length);
    }
  }

  return alias;
}