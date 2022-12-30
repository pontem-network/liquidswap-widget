import { defineConfig } from 'vite';
import ViteRequireContext from '@originjs/vite-plugin-require-context';

import vue from '@vitejs/plugin-vue';
import path from 'path';

import rollupNodePolyFill from 'rollup-plugin-node-polyfills';

import requireTransform from 'vite-plugin-require-transform';

export default defineConfig({
  plugins: [vue(), ViteRequireContext(), requireTransform()],
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
  }
});
