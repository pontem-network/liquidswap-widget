import { defineCustomElement, createApp, h, getCurrentInstance } from 'vue';
import { createPinia } from 'pinia';

import App from './src/App.ce.vue';
import { useWalletProviderStore } from "@pontem/aptos-wallet-adapter";
import { walletsList } from "./src/constants/wallets";
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';

import PButton from 'primevue/button';
import Pconfirm from 'primevue/confirmpopup';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import OverlayPanel from 'primevue/overlaypanel';
import PMenu from 'primevue/menu';
import SelectButton from 'primevue/selectbutton';
import PDialog from 'primevue/dialog';
import BlockUI from 'primevue/blockui';
import PToast from 'primevue/toast';
import ProgressSpinner from 'primevue/progressspinner';
import PAccordion from 'primevue/accordion';
import PAccordionTab from 'primevue/accordiontab';
import PMessage from 'primevue/message';
import PInlineMessage from 'primevue/inlinemessage';
import PInputSwitch from 'primevue/inputswitch';
import PFileUpload from 'primevue/fileupload';
import Carousel from 'primevue/carousel';
import Checkbox from 'primevue/checkbox';

// const pinia = createPinia();

// const app = createApp(App);

// app.use(PrimeVue);
// app.use(ToastService);
// app.use(pinia);
// app.directive('tooltip', Tooltip);


// const adapter = useWalletProviderStore(pinia);

import './src/styles/index.scss';

// setTimeout(() => {
//   adapter.init({
//     wallets: walletsList.map((one) => new one.adapter(one.options)),
//     localStorageKey: 'pontem_widget',
//     autoConnect: true,
//   });
// }, 300);

// const SwapComponent = defineCustomElement(SwapContainer);
//
// customElements.define('swap-component', SwapComponent);

// app.mount('#app');

const app = createApp(App);

interface ICreateElementInstance {
  app: App<Element>;
  props?: any;
  plugins?: Array<any>;
  directives?: Record<string, any>;
}

const config = {
  app: app,
  plugins: [PrimeVue, ToastService],
  directives: {'tooltip': Tooltip},
  props: {}
}

const createElementInstance = ({ app, props = {}, plugins = [], directives = {} }: ICreateElementInstance) => {
  return defineCustomElement({
    props: props,
    setup() {
      const pinia = createPinia();
      app.use(pinia);
      const adapter = useWalletProviderStore(pinia);
      app.use(PrimeVue);
      app.use(ToastService);

      setTimeout(() => {
        adapter.init({
          wallets: walletsList.map((one) => new one.adapter(one.options)),
          localStorageKey: 'pontem_widget',
          autoConnect: true,
        });
      }, 300);
      // plugins.forEach(plugin => app.use(plugin));

      for (const [name, directive] of Object.entries(directives)) {
        app.directive(name, directive)
      }
      app.component('PButton', PButton);
      app.component('InputNumber', InputNumber);
      app.component('InputText', InputText);
      app.component('OverlayPanel', OverlayPanel);
      app.component('PMenu', PMenu);
      app.component('SelectButton', SelectButton);
      app.component('PConfirm', Pconfirm);
      app.component('PDialog', PDialog);
      app.component('BlockUI', BlockUI);
      app.component('PToast', PToast);
      app.component('ProgressSpinner', ProgressSpinner);
      app.component('PAccordion', PAccordion);
      app.component('PAccordionTab', PAccordionTab);
      app.component('PMessage', PMessage);
      app.component('PCarousel', Carousel);
      app.component('PInlineMessage', PInlineMessage);
      app.component('PInputSwitch', PInputSwitch);
      app.component('PFileUpload', PFileUpload);
      app.component('PCheckbox', Checkbox);

      const inst = getCurrentInstance();
      if (inst === null) return;
      Object.assign(inst.appContext, app._context);
      Object.assign(inst.appContext.provides, app._context.provides);

      // app.mount("#app");
    },
    render: () => h(app)
  });
}

customElements.define('liquid-swap-widget', createElementInstance(config));
