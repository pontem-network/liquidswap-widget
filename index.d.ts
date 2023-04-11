declare module "@metamask/jazzicon" {
  export default function (diameter: number, seed: number): HTMLElement;
}

declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.scss?inline' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: any
  export default content
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
