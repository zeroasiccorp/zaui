<script lang="ts">
  import { page } from '$app/stores';
  import type { MarkdownFile } from '$lib/stores/model';

  import pkg from '@markdoc/markdoc';
  const { parse, transform, Tag } = pkg;

  import type { Node, Config, RenderableTreeNode } from '@markdoc/markdoc';

  import MarkdocTags from '$lib/components/MarkdocTags.svelte';

  // Svelte components usable from markdown
  import Callout from '$lib/components/Callout.svelte';
  import Codeblock from '$lib/components/Codeblock.svelte';
  import CopyPasteCodeBlock from '$lib/components/CopyPasteCodeBlock.svelte';
  import Table from '$lib/components/Table.svelte';
  import Embed from '$lib/components/Embed.svelte';
  import BlockQuote from '$lib/components/BlockQuote.svelte';
  import { markdownComponents } from '$lib/componentMaps';

  import { afterUpdate } from 'svelte';
  afterUpdate(async () => {
    // @ts-ignore
    window.Prism?.highlightAll();
  });

  // Adapted from https://svelte.dev/repl/39fdc4d5e7af4c9ea0712aef6204ebba

  // either pass markdown as a string
  export let doc = '';

  // or pass a MarkdownFile object with ast and frontmatter properties
  export let content: MarkdownFile | null = null;

  let params = $page.params;

  const baseMarkdownComponents = {
    Callout,
    Codeblock,
    Table,
    Embed,
    CopyPasteCodeBlock,
    BlockQuote,
  };

  import yaml from 'js-yaml';
  import { fixlink } from '../fixlink';

  const markdoc_config: Config = {
    nodes: {
      link: {
        transform(node, config) {
          return new Tag(
            'a',
            {
              href: fixlink(node.attributes.href, '', params.path),
              title: node.attributes.title,
            },
            node.transformChildren(config)
          );
        },
      },
      image: {
        transform(node, config) {
          return new Tag('img', {
            ...node.transformAttributes(config),
            src: fixlink(node.attributes.src, '', params.path),
          });
        },
      },
      fence: {
        attributes: {
          content: { type: String, render: false, required: true },
          language: { type: String },
        },
        transform(node, config) {
          const attributes = node.transformAttributes(config);
          const children = [node.attributes.content.replace(/\n$/, '')];
          return new Tag('Codeblock', attributes, children);
        },
      },
      table: {
        transform(node, config) {
          const attributes = node.transformAttributes(config);
          const children = node.transformChildren(config);
          return new Tag('Table', attributes, children);
        },
      },
      blockquote: {
        transform(node, config) {
          // check for GFM alert
          // https://github.com/orgs/community/discussions/16925
          let line1 = node.children[0]?.children[0]?.children[0]?.attributes?.content ?? '';
          let alert = line1.match(/^\[!((NOTE|TIP|IMPORTANT|CAUTION|WARNING)|([^\]]+))\]$/);
          if (alert) {
            // uppercase only the first letter to match GFM
            let type = alert[2] ? alert[1].slice(0,1) + alert[2].slice(1).toLowerCase() : alert[3];
            node.children[0].children[0].children.shift(); // remove alert
            node.children[0].children[0].children.shift(); // remove whitespace
            return new Tag(
              'Callout',
              {...node.transformAttributes(config), ...{type}},
              node.transformChildren(config)
            );
          }
          const attributes = node.transformAttributes(config);
          const children = node.transformChildren(config);
          return new Tag('BlockQuote', attributes, children);
        },
      },
    },
    tags: {
      embed: {
        render: 'Embed',
      },
      callout: {
        attributes: {
          type: { type: String },
        },
        render: 'Callout',
      },
      command: {
        render: 'CopyPasteCodeBlock',
      },
    },
  };

  Object.keys(markdownComponents).forEach((key) => {
    // @ts-ignore
    markdoc_config.tags[key.toLowerCase()] = { render: key };
  });

  const components = {
    ...baseMarkdownComponents,
    ...markdownComponents,
  };

  let ast: Node;
  $: ast = content?.ast ?? parse(doc);
  // TODO: make content?.frontmatter available to transform()

  let tags: RenderableTreeNode | RenderableTreeNode[];
  $: tags = transform(ast, markdoc_config);
</script>

<MarkdocTags {tags} {components} />
