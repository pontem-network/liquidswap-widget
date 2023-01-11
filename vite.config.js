import { defineConfig } from 'vite';
import ViteRequireContext from '@originjs/vite-plugin-require-context';

import vue from '@vitejs/plugin-vue';
import path from 'path';

import rollupNodePolyFill from 'rollup-plugin-node-polyfills';

import requireTransform from 'vite-plugin-require-transform';
import ToastService from 'primevue/toastservice';
import PrimeVue from 'primevue/config';


export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('liquid-swap')
        }
      }
  }), ViteRequireContext(), requireTransform(), ToastService.setup, PrimeVue.setup],
  resolve:{
    alias:{
      '@' : path.resolve(__dirname, './src')
    },
  },
  optimizeDeps: {
    include: ['vue', '@vueuse/core'],
  },

  css: {
    postcss: 'sass',
  },

  build: {
    rollupOptions: {
      plugins: [
        // Enable rollup polyfills plugin
        // used during production bundling
        rollupNodePolyFill(),
      ],
    },
  },

  define: {
    'process.env': {}
  },

});
