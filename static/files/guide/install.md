---
title: Zaui Install
---

# Install

Use npm, pnpm, or yarn. E.g.

```sh
pnpm install -D @zeroasic/zaui
```

Use -D for `devDependencies``.

Redistributing zaui as a dependency for redistribution in another npm package is not currently supported - but could be in the future ;-)

## package.json

For non-global installs, zaui commands should be added to your package.json scripts E.g.

```json
{
  "name": "my-site",
  "private": true,
  "scripts": {
    "dev": "zaui dev",
    "build": "zaui build"
  },
  "devDependencies": {
    "@zeroasic/zaui": "^0.5.1"
  }
}
```

## Custom components

There is no need to install or configure SvelteKit, since that is included with zaui.

### VS Code

The following VS Code extensions are recommended if you are developing custom components.

- [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)
- [Tailwind CSS Intellisense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

You can also run [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens) for faster error reporting, even though it can be a bit niggly.

### Tailwind
To use Tailwind VS Code Intellisense while developing custom components, you need [Tailwind dependencies](https://tailwindcss.com/docs/guides/sveltekit) in your project, and your own `tailwind.config.js` in the src directory.

```sh
pnpm install -D tailwindcss postcss autoprefixer @tailwindcss/typography
```

See [Custom Tailwind](custom-tailwind) for more details.