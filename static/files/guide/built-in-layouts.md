---
title: Built-in Layouts
---

# Layouts

The `Default` layout template produces a simple, single-column markdown-driven HTML page layout, with an optional splash image at the top.

For other layouts such as views with specialized metadata, you can specify a `layout` in the markdown frontmatter. E.g.

```yaml
---
title: Machine Learning Software Engineer
date: 2023-08-07
layout: Post
---
```

## Built-in layouts
- **Default** - The Default page layout - renders only markdown.
- **LandingPage** - Page with hero section and features section.
- **PageList** - Simple list of pages showing titles.
- **Posts** - Blog post list with bylines and excerpts - see [Blogging](blogging).
- **Post** - Single blog post page.
- **Team** - Team list with photos.

## Utility layouts
- **Icons** - List of available icons.
- **Debug** - A debug layout with configuration info for the current page.

## Forms (coming soon)
- **Contact** - Contact form.
- **Newsletter** - Newsletter signup form.

## Custom layouts
See [custom components](custom-components) for details on how to create your own.
