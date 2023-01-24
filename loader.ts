import { LiquidSwapWidget } from './main';

import './src/styles/index.scss';

import styles from './src/styles/index.scss';

export const LoadWidget = (tagName = 'liquidswap-widget') => {
  const el = customElements.get(tagName);

  if (!el) {
    customElements.define(tagName, LiquidSwapWidget);

    customElements.whenDefined('liquidswap-widget').then(() => {
      if (import.meta.env.PROD) {
        const el = document.createElement('style');
        el.type = 'text/css';
        el.textContent = styles;
        document.head.appendChild(el);
      }
    });
  }
}