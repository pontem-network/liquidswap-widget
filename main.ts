import { defineCustomElement, h, getCurrentInstance, createApp } from 'vue';
import { createPinia, setActivePinia } from 'pinia';

import App from './src/App.ce.vue';
import { useWalletProviderStore } from "@pontem/aptos-wallet-adapter";
import { walletsList } from "@/constants/wallets";
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

import appStyles from './src/styles/index.scss?inline';

interface ICreateElementInstance {
  component: Element;
  props?: any;
  plugins?: Array<any>;
}

const config = {
  component: App,
  plugins: [PrimeVue, ToastService],
  props: {}
}

const createElementInstance = ({ component, props = {}, plugins = [] }: ICreateElementInstance) => {
  return defineCustomElement({
    render: () => h(component),
    props: props,
    setup() {
      const app = createApp();
      const pinia = createPinia();
      setActivePinia(pinia);
      const adapter = useWalletProviderStore(pinia);

      plugins.forEach(plugin => app.use(plugin));

      setTimeout(() => {
        adapter.init({
          wallets: walletsList.map((one) => new one.adapter(one.options)),
          localStorageKey: 'pontem_widget',
          autoConnect: true,
        });
      }, 300);

      const inst = getCurrentInstance();
      if (inst === null) return;
      Object.assign(inst.appContext, app._context)
      Object.assign(inst.provides, app._context.provides)
    },
    styles: [appStyles],
  });
}

export const LiquidSwapWidget = createElementInstance(config);
