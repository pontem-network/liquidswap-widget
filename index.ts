import { LoadWidget } from "./loader";
export { LiquidSwapWidget } from './main';

import widgetStyles from './src/styles/index.scss?inline';

LoadWidget('liquidswap-widget');

export { LoadWidget, widgetStyles };