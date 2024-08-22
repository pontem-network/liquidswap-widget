import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';

import { resolve } from 'path';

import svgLoader from 'vite-svg-loader';

import dts from 'vite-plugin-dts';


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
  ],
  resolve: {
    alias: {
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
    outDir: 'docs',
  },

  define: {
    'process.env.NODE_ENV': '"production"',
    'process.env.VUE_APP_CORRECT_CHAIN': '"mainnet"',
    'process.env.VUE_APP_APTOS_NODE_API_TOKEN': JSON.stringify(process.env.VUE_APP_APTOS_NODE_API_TOKEN),
  },

  base: '/liquidswap-widget/',
  }
)
