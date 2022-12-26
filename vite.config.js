import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const path = require('path');
import ViteRequireContext from '@originjs/vite-plugin-require-context';


export default defineConfig({
  plugins: [vue({ customElement: true }), ViteRequireContext()],
  resolve:{
    alias:{
      '@' : path.resolve(__dirname, './src')
    },
  },
});
