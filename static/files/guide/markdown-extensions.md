---
title: Markdown Extensions
---
# Markdown Extensions

### Callouts
Zaui supports the recently introduced GitHub [Alerts markdown extension](https://github.blog/changelog/2023-12-14-new-markdown-extension-alerts-provide-distinctive-styling-for-significant-content/).

#### Examples
> [!NOTE]
> [Useful information](markdown) that users _should_ know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.

> [!🚨 Custom NOTE]
> This does not work on GitHub.

{% callout type="Tip" %}
This works too. It uses a custom [Markdoc tag](https://markdoc.dev/docs/tags).
{% /callout %}

#### Markdown source
```md
> [!NOTE]
> [Useful information](markdown) that users _should_ know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.

> [!🚨 Custom NOTE]
> This does not work on GitHub.

{% callout type="Tip" %}
This works too. It uses a custom [Markdoc tag](https://markdoc.dev/docs/tags).
{% /callout %}
```

### embed
You can embed literal html snippets using an `embed` custom [Markdoc tag](https://markdoc.dev/docs/tags).

Here is an example of [embedding a google docs](https://support.google.com/docs/answer/183965)  presentation.

{% embed %}
<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRC_4GpMdSfnPjbarNOsowqrRp54McTZI9CTCOUedDu05dUFGfI4Xn14_LWOzmwQ7Q9k400KCZ-Tv2A/embed?start=false&loop=false&delayms=3000" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
{% /embed %}

#### Markdown source
```html
{% embed %}
<iframe
  src="https://docs.google.com/presentation/d/e/2PACX-1vRC_4GpMdSfnPjbarNOsowqrRp54McTZI9CTCOUedDu05dUFGfI4Xn14_LWOzmwQ7Q9k400KCZ-Tv2A/embed?start=false&loop=false&delayms=3000"
  allowfullscreen="true"
  mozallowfullscreen="true"
  webkitallowfullscreen="true"
>
</iframe>
{% /embed %}
```