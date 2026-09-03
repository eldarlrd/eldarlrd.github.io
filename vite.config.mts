import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config
export default defineConfig({
  base: '/',
  resolve: {
    alias: { '@': '/src', '#': '/src/assets' }
  },
  plugins: [
    tailwindcss()
  ]
});
