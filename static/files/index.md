---
icon:
  image: 💥
  text: zaui
navlinks:
  - text: README
    href: /README

sidebars:
  - text: Guide
    href: /guide
    sections:
      - text: Start Here
        href: /guide/getting-started
        collapsed: false
        links:
          - text: Install
            href: /guide/install
          - text: Markdown
            href: /guide/markdown
          - text: Main menu
            href: /guide/menu
          - text: Sub-menus
            href: /guide/sub-menus
          - text: Blogging
            href: /guide/blogging
          - text: Built-in Layouts
            href: /guide/built-in-layouts
      - text: Customization
        href: /guide/customization
        collapsed: true
        links:
          - text: Tailwind
            href: /guide/custom-tailwind
          - text: Layouts
            href: /guide/custom-layouts
          - text: Markdown
            href: /guide/custom-markdown
          - text: Icons
            href: /guide/custom-icons
          - text: Static files
            href: /guide/static-files
---

# Welcome to zaui

To get started, create an `index.md` file in the `content` directory.  
Link to other files in the nav bar using yaml frontmatter.

_index.md_

```yaml
---
icon:
  image: 💥
  text: zaui
navlinks:
  - href: /README
    text: README
---

# Welcome to zaui
```