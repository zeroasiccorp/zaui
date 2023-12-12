# Layouts

The `Default` layout template produces a simple, single-column markdown-driven HTML page layout, with an optional splash image at the top.

For other layouts such as views with specialized metadata, you can specify a `layout` in the markdown frontmatter. E.g.

```yaml
---
title: Machine Learning Software Engineer
date: 2023-08-07
layout: Job
---
```

## Built-in layouts
- **Blog** - Blog post list - see [Blogging](blogging).
- **BlogPost** - Single blog post page.
- **Jobs** - Job postings list.
- **Job** - Single job posting page.
- **Team** - Team list with photos.
- **LandingPage** - Hero and features

## Utility layouts
- **Default** - The Default layout.
- **Icons** - List of available icons.
- **Debug** - A debug layout with configuration info for the current page.

## Forms (coming soon)
- **Contact** - Contact form.
- **Newsletter** - Newsletter signup form.

## Custom layouts
See [custom components](custom-components) for details on how to create your own.
