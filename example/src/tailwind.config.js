/** @type {import('tailwindcss').Config} */
let config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  plugins: [require('@tailwindcss/typography')],
}

module.exports = config;