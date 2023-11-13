import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import mergeConfig from './mergeConfig';

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

config = mergeConfig(config, process.env.PUB_VITE_CONFIG);

export default config;
