import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

import svgLoader from 'vite-svg-loader';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';


import dts from 'vite-plugin-dts';

process.env.VUE_APP_CORRECT_CHAIN = "mainnet";

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
      defaultImport: 'url'
    }),
    chunkSplitPlugin()
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
    sourcemap: true,
  },

  define: {
    'process.env.NODE_ENV': '"production"',
    'process.env.VUE_APP_CORRECT_CHAIN': '"mainnet"',
    // For testnet environment:
    // 'process.env.VUE_APP_MODULES_ACCOUNT': '"0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12"',
    // 'process.env.VUE_APP_MODULES_V05_ACCOUNT': '"0x45ef7a3a1221e7c10d190a550aa30fa5bc3208ed06ee3661ec0afa3d8b418580"',
    // 'process.env.VUE_APP_RESOURCES_ACCOUNT': '"0x05a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948"',
    // 'process.env.VUE_APP_RESOURCES_V05_ACCOUNT': '"0x9cc3c27b8d398ab6fc82cbc9dc6b43bb9164f72da465631628163822662a8580"',
    // 'process.env.VUE_APP_COINS_ACCOUNT': '"0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9"'
  },

  base: '/liquidswap-widget/',
});
