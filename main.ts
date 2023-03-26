import { defineCustomElement, h, getCurrentInstance, createApp } from 'vue';
import { createPinia, setActivePinia } from 'pinia';

import App from './src/App.ce.vue';
import { useWalletProviderStore } from "@pontem/aptos-wallet-adapter";
import { walletsList } from "@/constants/wallets";
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

import appStyles from './src/styles/index.scss?inline';

const plugins = [PrimeVue, ToastService];

export const LiquidSwapWidget = defineCustomElement({
  props: App.props,
  setup(props) {
    // @ts-ignore
    const app = createApp();
    const pinia = createPinia();
    const adapter = useWalletProviderStore(pinia);

    setTimeout(() => {
      adapter.init({
        wallets: walletsList.map((one) => new one.adapter(one.options)),
        localStorageKey: 'pontem_widget',
        autoConnect: true,
      });
    }, 300);

    setActivePinia(pinia);

    plugins.forEach(plugin => app.use(plugin));

    const inst = getCurrentInstance();
    if (inst === null) return;
    Object.assign(inst.appContext, app._context);
    // @ts-ignore
    Object.assign(inst.provides, app._context.provides);
    Object.assign(inst.appContext.provides, app._context.provides);

    return () => h(App, props)
  },
  styles: [appStyles],
});
