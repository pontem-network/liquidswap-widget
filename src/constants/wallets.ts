import { IWallet } from '../types';
import {
  AptosWalletAdapter,
  MartianWalletAdapter,
  PontemWalletAdapter,
  FewchaWalletAdapter,
  RiseWalletAdapter,
  WalletName,
} from '@pontem/aptos-wallet-adapter';

import pontemLogo from '../assets/wallets/pontem.svg';
import petraLogo from '../assets/wallets/petra.png';
import martianLogo from '../assets/wallets/martians.svg';
import riseLogo from '../assets/wallets/rise.svg';
import fewchaLogo from '../assets/wallets/fewcha.svg';
// import msafeLogo from '../assets/wallets/msafe.svg';


export const walletsList: IWallet[] = [
  {
    key: 'Pontem' as WalletName<'Pontem'>,
    label: 'Pontem Wallet',
    logo: pontemLogo,
    adapter: PontemWalletAdapter,
  },
  {
    key: 'Petra' as WalletName<'Petra'>,
    label: 'Petra Wallet',
    logo: petraLogo,
    adapter: AptosWalletAdapter,
  },
  {
    key: 'Martian' as WalletName<'Martian'>,
    label: 'Martian Wallet',
    logo: martianLogo,
    adapter: MartianWalletAdapter,
  },
  {
    key: 'Rise Wallet' as WalletName<'Rise Wallet'>,
    label: 'Rise Wallet',
    logo: riseLogo,
    adapter: RiseWalletAdapter,
  },
  {
    key: 'Fewcha' as WalletName<'Fewcha'>,
    label: 'Fewcha Wallet',
    logo: fewchaLogo,
    adapter: FewchaWalletAdapter,
  },
  // {
  //   key: 'Msafe' as WalletName<'Msafe'>,
  //   label: 'Msafe Wallet',
  //   logo: msafeLogo,
  //   adapter: MsafeWalletAdapter,
  //   options: 'https://app.m-safe.io/',
  // },
];
