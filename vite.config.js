import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

import rollupNodePolyFill from 'rollup-plugin-node-polyfills';

import svgLoader from 'vite-svg-loader'

import dts from 'vite-plugin-dts'


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
    svgLoader({
      defaultImport: 'url' // or 'raw'
    })
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
