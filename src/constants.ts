export type Network = {
  id: number;
  title: string;
  shortTitle: string;
  restUrl: string;
  defaultToken: string;
  modules: {
    Faucet: string;
    Scripts: string;
    LiquidityPool: string;
    CoinInfo: string;
    CoinStore: string;
  };
  // tokens: IPersistedToken[];
};

export const STATS_URL =
  process.env.VUE_APP_STATS_API_URL || 'https://sentrio-api.pontem.network';

export const MODULES_ACCOUNT =
  process.env.VUE_APP_MODULES_ACCOUNT ||
  '0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12';
export const RESOURCES_ACCOUNT =
  process.env.VUE_APP_RESOURCES_ACCOUNT ||
  '0x05a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948';
export const COINS_ACCOUNT =
  process.env.VUE_APP_COINS_ACCOUNT ||
  '0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9';

export const COIN_INFO = '0x1::coin::CoinInfo';
export const COIN_STORE = '0x1::coin::CoinStore';

export const CURVE_STABLE = `${MODULES_ACCOUNT}::curves::Stable`;
export const CURVE_UNCORRELATED = `${MODULES_ACCOUNT}::curves::Uncorrelated`;
export const RECALCULATION_BALANCE_TIME = 5000;

export const NETWORKS_MODULES = {
  Scripts: `${MODULES_ACCOUNT}::scripts_v2`,
  Faucet: `${COINS_ACCOUNT}::faucet`,
  LiquidityPool: `${RESOURCES_ACCOUNT}::liquidity_pool`,
  CoinInfo: `${COIN_INFO}`,
  CoinStore: `${COIN_STORE}`,
};

export const MAINNET_CHAIN_ID = 1;
export const APTOS_TESTNET_CHAIN_ID = 2;
export const PONTEM_TESTNET_CHAIN_ID = 4;

export const APTOS = '0x1::aptos_coin::AptosCoin';

export const NETWORKS: Network[] = [
  {
    id: MAINNET_CHAIN_ID,
    title: 'Aptos Mainnet',
    shortTitle: 'Aptos',
    restUrl: 'https://aptos-mainnet.pontem.network/v1',
    defaultToken: '0x1::aptos_coin::AptosCoin',
    modules: NETWORKS_MODULES,
  },
  {
    id: APTOS_TESTNET_CHAIN_ID,
    title: 'Aptos Testnet',
    shortTitle: 'Aptos',
    restUrl: 'https://aptos-testnet.pontem.network/v1',
    defaultToken: '0x1::aptos_coin::AptosCoin',
    modules: NETWORKS_MODULES,
  },
];

export const CORRECT_CHAIN = process.env.VUE_APP_CORRECT_CHAIN || 'mainnet'; // testnet

export const CORRECT_CHAIN_ID =
  CORRECT_CHAIN === 'mainnet'
    ? MAINNET_CHAIN_ID
    : CORRECT_CHAIN === 'testnet'
      ? APTOS_TESTNET_CHAIN_ID
      : CORRECT_CHAIN === 'testpontem'
        ? PONTEM_TESTNET_CHAIN_ID
        : 0;