---
title: Custom Tailwind CSS
---

# Custom Tailwind CSS
To use Tailwind VS Code Intellisense, your project needs [Tailwind dependencies](https://tailwindcss.com/docs/guides/sveltekit).

```sh
pnpm install -D tailwindcss postcss autoprefixer @tailwindcss/typography
```

You will also need your own `/src/tailwind.config.js`. Note the use of commonjs `require` (not ESM `import`). E.g.

```js
let defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
let config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  plugins: [require('@tailwindcss/typography')],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Lexend', ...defaultTheme.fontFamily.sans],
        logo: ['Oxanium', ...defaultTheme.fontFamily.sans]
      },
    },
  },
}
```

## Custom Fonts
You can provide your own list of font faces in `src/static/fonts.css` and add the `fontFamily` names into your tailwind.config as shown above.

#### Default fonts.css

```css
@font-face {
  font-family: 'Lexend';
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url(/fonts/lexend.woff2) format('woff2');
}
@font-face {
  font-family: 'Inter';
  font-weight: 100 900;
  font-display: block;
  font-style: normal;
  font-named-instance: 'Regular';
  src: url('/fonts/Inter-roman.var.woff2') format('woff2');
}
@font-face {
  font-family: 'Inter';
  font-weight: 100 900;
  font-display: block;
  font-style: italic;
  font-named-instance: 'Italic';
  src: url('/fonts/Inter-italic.var.woff2') format('woff2');
}
@font-face {
  font-family: 'Oxanium';
  font-weight: 200 800;
  font-display: swap;
  font-style: normal;
  src: url(/fonts/oxanium.woff2) format('woff2');
  unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
}
```