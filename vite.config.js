import { defineConfig } from 'vite';
import ViteRequireContext from '@originjs/vite-plugin-require-context';

import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

import rollupNodePolyFill from 'rollup-plugin-node-polyfills';

import requireTransform from 'vite-plugin-require-transform';
import ToastService from 'primevue/toastservice';
import PrimeVue from 'primevue/config';
import dts from 'vite-plugin-dts'


export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('liquid-swap')
        }
      }
  }), ViteRequireContext(), requireTransform(), dts()],
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
      entry: resolve(__dirname, 'main.ts'),
      name: 'Liquidswap widget',
      formats: ['es'],
      // the proper extensions will be added
      fileName: 'liquidswap-widget',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      plugins: [
        // Enable rollup polyfills plugin
        // used during production bundling
        rollupNodePolyFill(),
      ],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
    // Reduce bloat from legacy polyfills.
    target: 'esnext',
    outDir: 'dist',
  },

  define: { 'process.env.NODE_ENV': '"production"' },

  base: '/liquidswap-widget/',
});
