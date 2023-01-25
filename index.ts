import { loadWidget } from "./loader";
export { LiquidSwapWidget } from './main';

import widgetStyles from './src/styles/index.scss?inline';

loadWidget('liquidswap-widget');

export { loadWidget, widgetStyles };