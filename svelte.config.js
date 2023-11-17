import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [vitePreprocess()],

  kit: {
    alias: {
      $src: process.env.PUB_SRC_DIR || './src/lib/$src',
    },
    adapter: adapter({
      pages: process.env.PUB_BUILD_DIR,
      // https://kit.svelte.dev/docs/adapter-static#options-fallback
      fallback: '404.html',
      precompress: false,
      strict: true,
    }),
    prerender: {
      crawl: true,
      entries: ['*'],
      handleHttpError: ({ status, message }) => {
        if (status !== 404) throw new Error(message);
        console.log(message);
      },
      handleMissingId: 'warn',
    },
  },
};

export default config;
