import { defineCustomElement } from 'vue';

import { SwapContainer } from './src/Swap/index';

const SwapComponent = defineCustomElement(SwapContainer);

customElements.define('swap-component', SwapComponent);