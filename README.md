# [WIP] zaui
SvelteKit-powered toolchain for publishing websites from Markdown files.

The goal is to enable static site publishing possible with a minimum of boilerplate and configuration.

A typical project contains just a package json, and a tree of markdown files.

This library provides:
- A preconfigured SvelteKit app with a Vite dev server and build
- SvelteKit static adapter
- Tailwind CSS, and the Tailwind typography plugin
- TypeScript

Inspiration for the developer experience and implementation comes from [VitePress](https://vitepress.dev/). The main achitectural difference is that the UI can also fetch and render markdown dynamically in the browser, similar to [docsify](https://docsify.js.org/).

### Install
{npm,pnpm,yarn} install -D @zeroasic/zaui

### Usage
The built-in `zaui` command delegates to vite, which is installed as part SvelteKit bundled with this package.

`zaui command [project-root]`

where command is one of

- dev
- build
- preview

`[project-root]` defaults to the current working directory

### MVP TODO
- Document custom config, ts limitations
- Package to initialize a project with `npm create zaui@latest`
- zaui commands to run tests
- Nice docs sidebar
- head section: title, meta og header tags
- Generated redirects
- Generated sitemap.xml and robots.txt
- In-page TOC and ids for markdown headers
- Analytics