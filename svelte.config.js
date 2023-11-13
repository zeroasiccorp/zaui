import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [vitePreprocess()],

  kit: {
    outDir: process.env.PUB_OUT_DIR,
    // https://kit.svelte.dev/docs/adapter-static
    adapter: adapter({
      pages: process.env.PUB_BUILD_DIR,
      assets: process.env.PUB_ASSET_DIR,
      // https://kit.svelte.dev/docs/adapter-static#options-fallback
      fallback: "404.html",
      precompress: false,
      strict: true,
    }),
    prerender: {
      crawl: true,
      entries: ["*"],
      handleHttpError: ({ status, message }) => {
        if (status !== 404) throw new Error(message);
        console.log(message);
      },
      handleMissingId: "warn",
    },
  },
};

export default config;
