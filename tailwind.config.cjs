import typography from '@tailwindcss/typography';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config}*/
const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Lexend', ...defaultTheme.fontFamily.sans],
        logo: ['Oxanium', ...defaultTheme.fontFamily.sans]
      },
      screens: {
        'xs': '400px'
      }
    }
  },
  plugins: [
    typography,
  ]
};

export default config;