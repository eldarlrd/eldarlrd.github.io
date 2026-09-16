import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config
export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@': '/src',
      '$': '/src/data',
      '%': '/src/utils',
      '#': '/src/assets',
    },
  },
  plugins: [
    tailwindcss(),
    svelte({
      inspector: true,
    }),
  ],
});
