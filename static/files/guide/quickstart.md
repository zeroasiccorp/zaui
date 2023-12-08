# Quickstart

The following should work in an empty or an existing project.

1. `pnpm install -D @zeroasic/zaui`
2. `pnpm zaui dev`
3. Type `o` to open your browser.

If you don't already have a `content` directory you will see this zaui guide.

To get started, create an `index.md` file in the `content` directory.

After creating the directory, quit and restart the zaui dev server to see your new content. While editing markdown, simply reload the page to see your updates.


## Main menu
Link to other files in the nav bar using navlinks in the yaml frontmatter in `index.md`. E.g.

_index.md_

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

## Blog content

_my-first-post.md_

```yaml
---
title: My first post
splash:
  image: images/hello.jpg
date: 2023-12-08
excerpt: |
  My first blog post using  [zaui](https://github.com/zeroasiccorp/zaui), the npm-installable SvelteKit toolchain to build websites from markdown with a minimum of fuss.
---

## Hello World
```