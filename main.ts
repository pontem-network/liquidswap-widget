import { defineCustomElement, createApp } from 'vue';
import { createPinia, setActivePinia } from 'pinia';

import { SwapContainer } from './src/Swap';
import App from './src/App.vue';
import { useWalletProviderStore } from "@pontem/aptos-wallet-adapter";
import { walletsList } from "./src/constants/wallets";
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';

const pinia = createPinia();

const app = createApp(App);

app.use(PrimeVue);
app.use(ToastService);
app.use(pinia);
app.directive('tooltip', Tooltip);


const adapter = useWalletProviderStore(pinia);

import './src/styles/index.scss';

setTimeout(() => {
  adapter.init({
    wallets: walletsList.map((one) => new one.adapter(one.options)),
    localStorageKey: 'pontem_widget',
    autoConnect: true,
  });
}, 300);

// const SwapComponent = defineCustomElement(SwapContainer);
//
// customElements.define('swap-component', SwapComponent);

app.mount('#app');
