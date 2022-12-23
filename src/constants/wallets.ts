import { IWallet } from '@/types';
import {
  AptosWalletAdapter,
  MartianWalletAdapter,
  PontemWalletAdapter,
  FewchaWalletAdapter,
  RiseWalletAdapter,
  MsafeWalletAdapter,
  WalletName,
} from '@pontem/aptos-wallet-adapter';

export const walletsList: IWallet[] = [
  {
    key: 'Pontem' as WalletName<'Pontem'>,
    label: 'Pontem Wallet',
    logo: require('@/assets/wallets/pontem.svg'),
    adapter: PontemWalletAdapter,
  },
  {
    key: 'Petra' as WalletName<'Petra'>,
    label: 'Petra Wallet',
    logo: require('@/assets/wallets/petra.png'),
    adapter: AptosWalletAdapter,
  },
  {
    key: 'Martian' as WalletName<'Martian'>,
    label: 'Martian Wallet',
    logo: require('@/assets/wallets/martians.svg'),
    adapter: MartianWalletAdapter,
  },
  {
    key: 'Rise Wallet' as WalletName<'Rise Wallet'>,
    label: 'Rise Wallet',
    logo: require('@/assets/wallets/rise.svg'),
    adapter: RiseWalletAdapter,
  },
  {
    key: 'Fewcha' as WalletName<'Fewcha'>,
    label: 'Fewcha Wallet',
    logo: require('@/assets/wallets/fewcha.svg'),
    adapter: FewchaWalletAdapter,
  },
  {
    key: 'Msafe' as WalletName<'Msafe'>,
    label: 'Msafe Wallet',
    logo: require('@/assets/wallets/msafe.svg'),
    adapter: MsafeWalletAdapter,
    options: 'https://partner.m-safe.io/',
  },
];
