import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [vitePreprocess()],

  kit: {
    alias: {
      // Points to directory with custom components
      // Results in path alias in .svelte-kit/tsconfig.json
      $src: process.env.PUB_SRC_DIR || 'src',

      // Points to directory with app.config.{js,ts}
      // This is to avoid conditional imports while supporting optional custom config.
      // Value is the same as $src only when an app.config.{js,ts} file is found.
      // If $src has no custom app.config, the fallback src/app.config.js will be used.
      $appconfig: process.env.PUB_APPCONFIG_DIR || 'src',
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
