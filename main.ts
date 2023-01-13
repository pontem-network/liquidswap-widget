import { defineCustomElement, h, getCurrentInstance, createApp } from 'vue';
import {createPinia, setActivePinia} from 'pinia';

import App from './src/App.ce.vue';
import { useWalletProviderStore } from "@pontem/aptos-wallet-adapter";
import { walletsList } from "./src/constants/wallets";
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';
import appStyles from './src/styles/index.scss';

interface ICreateElementInstance {
  component: Element;
  props?: any;
  plugins?: Array<any>;
  components?: Record<string, any>;
  directives?: Record<string, any>;
}

const config = {
  component: App,
  plugins: [PrimeVue, ToastService],
  directives: {'tooltip': Tooltip},
  props: {}
}

const createElementInstance = ({ component, props = {}, plugins = [], directives = {}, components = [] }: ICreateElementInstance) => {
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

      for (const [name, directive] of Object.entries(directives)) {
        app.directive(name, directive)
      }

      const inst = getCurrentInstance();
      if (inst === null) return;
      Object.assign(inst.appContext, app._context)
      Object.assign(inst.provides, app._context.provides)
    },
    styles: [appStyles],
  });
}

customElements.define('liquid-swap-widget', createElementInstance(config));
