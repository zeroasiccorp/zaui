import typography from '@tailwindcss/typography';
import mergeConfig from './mergeConfig';

// https://tailwindcss.com/docs/guides/sveltekit
// https://tailwindcss.com/docs/typography-plugin

/** @type {import('tailwindcss').Config}*/
let config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [typography],
};

config = mergeConfig(config, process.env.PUB_TAILWIND_CONFIG);

export default config;
