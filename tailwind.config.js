// https://tailwindcss.com/docs/guides/sveltekit
// https://tailwindcss.com/docs/typography-plugin
let defaultTheme = require('tailwindcss/defaultTheme');
let merge = require('ts-deepmerge');
let path = require('path');
let fs = require('fs');

let content = ['./src/**/*.{html,js,svelte,ts}'];

/** @type {import('tailwindcss').Config} */
let config = {
  content,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Lexend', ...defaultTheme.fontFamily.sans],
        logo: ['Oxanium', ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
    screens: {
      xs: '400px',
      ...defaultTheme.screens,
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

// Merge user config from ZAUI_SRC_DIR if it exists
// TODO: make sure that the typography plugin features are available
//       for Intelliesense inside the srcDir of a user package.
//       If not, we may need to merge in the other direction

let srcDir = process.env.ZAUI_SRC_DIR;

if (srcDir) {
  content.push(path.join(srcDir, '**/*.{html,js,svelte,ts}'));

  const configFile = path.join(srcDir, 'tailwind.config.js');
  if (fs.existsSync(configFile)) {
    // console.log(`Using custom tailwind config from ${configFile}`);
    let userConfig = require(configFile);
    config = { ...merge(config, userConfig), content };
  }
}

module.exports = config;
