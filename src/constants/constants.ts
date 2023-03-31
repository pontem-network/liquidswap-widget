import { Network } from '@/types';

export const STATS_URL = 'https://sentrio-api.pontem.network';

export const DENOMINATOR = 10000;

export const RECALCULATION_TX_TIME = 1000;
export const RECALCULATION_TIME = 2000; // 2sec
export const LOADING_ANIMATION_TIME = 3000;
export const ANIMATION_PAUSE_TIME = 3000;

export const MODULES_ACCOUNT = '0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12';
export const RESOURCES_ACCOUNT = '0x05a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948';
export const COINS_ACCOUNT = '0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9';
export const MODULES_V05_ACCOUNT = '0x163df34fccbf003ce219d3f1d9e70d140b60622cb9dd47599c25fb2f797ba6e'; // mainnet
export const RESOURCES_V05_ACCOUNT = '0x61d2c22a6cb7831bee0f48363b0eec92369357aece0d1142062f7d5d85c7bef8'; // mainnet

export const COIN_INFO = '0x1::coin::CoinInfo';
export const COIN_STORE = '0x1::coin::CoinStore';

export const CURVE_UNCORRELATED = `${MODULES_ACCOUNT}::curves::Uncorrelated`;
export const CURVE_UNCORRELATED_V05 = `${MODULES_V05_ACCOUNT}::curves::Uncorrelated`;
export const CURVE_STABLE = `${MODULES_ACCOUNT}::curves::Stable`;
export const CURVE_STABLE_V05 = `${MODULES_V05_ACCOUNT}::curves::Stable`;

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

export const CORRECT_CHAIN = 'mainnet';

export const CORRECT_CHAIN_ID =
  CORRECT_CHAIN === 'mainnet'
    ? MAINNET_CHAIN_ID
    : CORRECT_CHAIN === 'testnet'
      ? APTOS_TESTNET_CHAIN_ID
      : CORRECT_CHAIN === 'testpontem'
        ? PONTEM_TESTNET_CHAIN_ID
        : 0;

export const VERSION_0 = 0;
export const VERSION_0_5 = 0.5;
export const VALID_VERSIONS = [VERSION_0, VERSION_0_5];

export const WALLET_GOOGLE_PLAY_URL =
  'https://play.google.com/store/apps/details?id=com.pontemmobilewallet&hl=en&gl=US';
export const WALLET_CHROME_STORE_URL =
  'https://chrome.google.com/webstore/detail/pontem-aptos-wallet/phkbamefinggmakgklpkljjmgibohnba';

