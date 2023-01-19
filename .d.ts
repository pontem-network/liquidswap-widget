/// <reference types="vite/client" />
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
