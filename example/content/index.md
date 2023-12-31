---
title: Zaui Example
appurl: https://zaui-example.jldec.me
mobilemenu: true
usermenu: true

icon:
  image: 😀
  text: 'Example'

navlinks:
  - href: /page-1
    text: Page 1
  - href: /docs
    text: Docs

fullwidth: true

hero:
  name: Zaui Example
  text: Get started pronto
  tagline: With a custom layout
  icon: 😀
  actionlinks:
    - text: Check it out
      href: /page-1
    - text: Docs
      href: /docs

features:
  - icon: ⚙️
    text: Custom Layout
    details: Some Svelte knowledge required. Tailwind already configured.
    href: /page-1
  - icon: 📘
    text: Docs
    details: With a sidebar, next button, and landing page.
    href: /docs

sidebars:
  - text: Docs
    href: /docs
    sections:
      - text: Getting Started
        links:
          - text: Docs Page 1
            href: /docs/docs-page-1
          - text: Docs Page 2
            href: /docs/docs-page-2
footer:
  text: (c) Example Inc. All rights reserved.
---

