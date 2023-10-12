/* eslint-disable no-undef */
import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
      {
        find: '@common',
        replacement: path.resolve(__dirname, 'src/components/common'),
      },
      {
        find: '@script',
        replacement: path.resolve(__dirname, 'src/components/script'),
      },
      {
        find: '@assets',
        replacement: path.resolve(__dirname, 'src/assets'),
      },
    ],
  },
});
