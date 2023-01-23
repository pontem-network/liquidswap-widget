import { LiquidSwapWidget } from './main';

export const LoadWidget = (tagName = 'liquidswap-widget') => {
  const el = customElements.get(tagName);

  if (!el) {
    customElements.define(tagName, LiquidSwapWidget);
  }
}