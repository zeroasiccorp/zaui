# [WIP] sveltekit-template
Npm-installable SvelteKit toolchain for publishing websites from Markdown files.

The goal is to enable static site publishing possible with a minimum of boilerplate and configuration.

A typical project contains just a package json, and a tree of markdown files.

Inspiration for the developer experience and implementation comes from VitePress.

The SvelteKit app is pre-configured with:

- Static adapter
- Tailwind css, and the tailwind typography plugin
- TypeScript
- Vitest for unit tests
- Playwright for integration tests

### Install
{npm,pnpm,yarn} install -D sveltekit-template

### Usage
The built-in `pub` command delegates to vite

```
pub command [project-root]

command is one of
- dev
- build
- preview

[project-root] defaults to the current working directory
```

### MVP TODO
- Markdown file scan and rendering
- Custom components - must work with TypeScript 😬
- Themes - essential for effective re-use 😍
- Testing - for components and markdown-driven UI ✅