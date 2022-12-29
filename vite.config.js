import { defineConfig } from 'vite';
import ViteRequireContext from '@originjs/vite-plugin-require-context';

import vue from '@vitejs/plugin-vue';
import path from 'path';

import rollupNodePolyFill from 'rollup-plugin-node-polyfills';

import requireTransform from 'vite-plugin-require-transform';

export default defineConfig({
  plugins: [vue({ customElement: true }), ViteRequireContext(), requireTransform()],
  resolve:{
    alias:{
      '@' : path.resolve(__dirname, './src')
    },
  },
  optimizeDeps: {
    include: ['vue', '@vueuse/core'],
  },

  css: {
    devSourcemap: true
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
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
});
