import {defineConfig, loadEnv} from 'vite';

import vue from '@vitejs/plugin-vue';

import { resolve } from 'path';

import svgLoader from 'vite-svg-loader';

import dts from 'vite-plugin-dts';

const NODE_ENV = process.env.NODE_ENV || 'development';
const env = loadEnv(NODE_ENV, process.cwd(), '');

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
    'process.env.VITE_APP_APTOS_NODE_API_TOKEN': `"${env.VITE_APP_APTOS_NODE_API_TOKEN}"`,
  },

  base: '/liquidswap-widget/',
  }
)
