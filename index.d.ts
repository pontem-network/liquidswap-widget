/// <reference types="vite/client" />
import { VueElementConstructor } from "vue";

declare module "@metamask/jazzicon" {
  export default function (diameter: number, seed: number): HTMLElement;
}

declare module '*.scss'

declare module '*.svg' {
  const content: any
  export default content
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare global {
  interface HTMLElementTagNameMap {
    "liquid-swap-widget": typeof Widget,
  }
}

export const LiquidSwapWidget: VueElementConstructor<{}>;

export const LoadWidget: (tagName: string) => void;
