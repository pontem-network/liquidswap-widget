import { defineCustomElement } from 'vue';
import { createPinia, setActivePinia } from 'pinia';

import { SwapContainer } from './src/Swap';
import { useWalletProviderStore } from "@pontem/aptos-wallet-adapter";
import { walletsList } from "./src/constants/wallets";

const pinia = createPinia();

import '@/styles/index.scss';

const adapter = useWalletProviderStore(pinia);

setActivePinia(pinia);

setTimeout(() => {
  adapter.init({
    wallets: walletsList.map((one) => new one.adapter(one.options)),
    localStorageKey: 'pontem_widget',
    autoConnect: true,
  });
}, 300);

const SwapComponent = defineCustomElement(SwapContainer);

customElements.define('swap-component', SwapComponent);
