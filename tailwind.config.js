// https://tailwindcss.com/docs/guides/sveltekit
// https://tailwindcss.com/docs/typography-plugin
let merge = require('ts-deepmerge');
let path = require('path');
let fs = require('fs');

let content = ['./src/**/*.{html,js,svelte,ts}'];

/** @type {import('tailwindcss').Config} */
let config = {
  content,
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}

let srcDir = process.env.PUB_SRC_DIR;

if (srcDir) {
  content.push(path.join(srcDir, '**/*.{html,js,svelte,ts}'))

  const configFile = path.join(srcDir, 'tailwind.config.js');
  if (fs.existsSync(configFile)) {
    let userConfig = require(configFile);
    config = { ...merge(config, userConfig), content };
  }
}

module.exports = config;