import { defineConfig } from 'vite';

// https://vite.dev/config
export default defineConfig({
  base: '/',
  resolve: {
    alias: { '@': '/src', '#': '/src/assets' }
  }
});
