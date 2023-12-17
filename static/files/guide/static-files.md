---
title: Static Files
---

# Static files

All files and directories in `src/static` and `content/static` will be copied straight into the root of the output build.

This is useful for robots.txt, _redirects, favicon.jpg etc.

See [jldec.me](https://github.com/jldec/jldec.me/) for an example.

## Prism

The built-in prism.js highlighter is configured for a limited number of languages, and a dark themed stylesheet. The list of languages appears in the comment at the top of [/prism.js](https://github.com/zeroasiccorp/zaui/blob/main/static/prism.js) 

Here is an example of a yaml code block from [/blog/zaui-release](/blog/zaui-release).

```yaml
title: Zaui, our npm-installable SvelteKit toolchain
author: Jürgen Leschner
splash:
  image: images/daisy.jpg
date: 2023-12-09
excerpt: |
  We are pleased to announce the open source release of [zaui](https://github.com/zeroasiccorp/zaui), our npm-installable SvelteKit toolchain for building websites from markdown.
```



You can download your own prism.js with a different selection of languages, or your own prism.css stylesheet, at [prismjs.com/download](https://prismjs.com/download.html#themes=prism-okaidia&languages=markup+css+clike+javascript+bash+go+json+markdown+python+rust+typescript+yaml).

Place the dowloaded prism files in `src/static/prism.js` or `src/static/prism.css`.

> [!TIP]
> Restart zaui after adding files to `src/static`.

## Fonts

You can configure custom fonts by providing your own `src/static/fonts.css` file. This can either point to externally hosted fonts, or to your own static font files e.g. in a `src/static/fonts/...` directory.

See [Custom Tailwind](custom-tailwind) for more details.