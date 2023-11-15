import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

let config = defineConfig({
  plugins: [sveltekit()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
  server: {
    fs: {
      // https://vitejs.dev/config/server-options.html#server-fs-strict
      strict: false,
    },
  },
});

export default config;
