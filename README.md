# [WIP] sveltekit-template
SvelteKit-powered toolchain for publishing websites from Markdown files.

The goal is to enable static site publishing possible with a minimum of boilerplate and configuration.

A typical project contains just a package json, and a tree of markdown files.

This library provides:
- A preconfigured SvelteKit app with a Vite dev server and build
- SvelteKit static adapter
- Tailwind CSS, and the Tailwind typography plugin
- TypeScript

Inspiration for the developer experience and implementation comes from [VitePress](https://vitepress.dev/). The main achitectural difference is that the UI continues to render markdown dynamically in the browser, without running a dev server.

This makes it possible to embed a static bundle in other language frameworks e.g. in a python module, and continue to enjoy instant-preview of the rendered UI.

### Install
{npm,pnpm,yarn} install -D sveltekit-template

### Usage
The built-in `pub` command delegates to vite

`pub command [project-root]`

command is one of
- dev
- build
- preview

`[project-root]` defaults to the current working directory

### MVP TODO
- Document custom config, ts limitations
- Package to initialize a project with `npm create zaui@latest`
- Nice docs sidebar
- head section: title, meta og header tags
- generated redirects
- generated sitemap.xml and robots.txt
- In-page TOC and ids for markdown headers
- analytics