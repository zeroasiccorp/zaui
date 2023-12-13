---
title: Zaui Quickstart
---

# Quickstart

## Install

The following should work in an empty or an existing project.

1. `pnpm install -D @zeroasic/zaui`
2. `pnpm zaui dev`
3. Type `o` to open your browser.

If you don't already have a `content` directory you will see this zaui guide.

## Add Markdown

To get started, create an `index.md` file in the `content` directory.

_After creating the content directory, quit and restart the zaui dev server_

## Routing

Zaui will serve pages for every file with a `.md` extension in the `content` directory.

Website URLs will match the names of your markdown files, minus the '.md' extension. For consistency, we suggest using lower case filenames with hyphens and no spaces or other special characters.

A directory with an `index.md` file, will be served at a URL matching the directory name, with no trailing '/'.

## Menu

Add links to the main menu, by providing navlinks in the yaml frontmatter in `index.md`.

```yaml
---
icon:
  image: 😀
  text: my-website
navlinks:
  - href: /blog
    text: Blog
---

# Welcome to my zaui website
```

See [Menus](menus) for more details.