import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

import dts from 'vite-plugin-dts';
import requireTransform from 'vite-plugin-require-transform';
import ViteRequireContext from '@originjs/vite-plugin-require-context';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('liquidswap-')
        }
      }
    }),
    dts(),
    ViteRequireContext(),
    requireTransform()
  ],
  resolve:{
    alias:{
      '@' : resolve(__dirname, './src')
    },
  },
  optimizeDeps: {
    include: ['vue', '@vueuse/core'],
  },
  css: {
    postcss: 'sass',
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'index.ts'),
      name: 'Liquidswap widget',
      formats: ['es'],
      // the proper extensions will be added
      fileName: 'index',
    },
    commonjsOptions: {
      include: [/node_modules/],
    },
    // Reduce bloat from legacy polyfills.
    target: 'esnext',
    outDir: 'dist',
  },
  define: { 'process.env.NODE_ENV': '"production"' },
  base: '/liquidswap-widget/',
});
