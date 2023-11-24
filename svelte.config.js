import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [vitePreprocess()],

  kit: {
    alias: {
      // Similar to $lib but for appConfig
      // Points to directory with custom components and pub.config.{js,ts}
      // Results in path alias in .svelte-kit/tsconfig.json
      $appconfig: process.env.PUB_APPCONFIG_DIR || 'src/appconfig',
    },
    files: {
      // Points to directory with static assets
      // pub.js creates temp dir with overlay of static + user-static + content dirs
      assets: process.env.PUB_STATIC_DIR || 'static',
    },
    adapter: adapter({
      pages: process.env.PUB_BUILD_DIR || 'build',
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
