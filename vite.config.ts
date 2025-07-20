import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    basicSsl(),
  ],
  resolve: {
    alias: {
      buffer: 'buffer',
      process: 'process/browser',
    },
  },
  base: '/skinbits-web/',
  server: {
    https: true,
    proxy: {
      '/api': {
        target: 'https://skinbits-api-production.up.railway.app/',
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
