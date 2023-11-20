<script lang="ts">
  import { page } from '$app/stores';
  import type { MarkdownFile } from '$lib/stores/model'; 

  import pkg from '@markdoc/markdoc';
  const { parse, transform, Tag } = pkg;

  import type { Node, Config, RenderableTreeNode } from '@markdoc/markdoc';

  import MarkdocTags from '$lib/components/MarkdocTags.svelte';

  // Svelte components usable from markdown
  import Callout from '$lib/components/Callout.svelte';
  import Time from '$lib/components/Time.svelte';
  import Codeblock from '$lib/components/Codeblock.svelte';
  import CopyPasteCodeBlock from '$lib/components/CopyPasteCodeBlock.svelte';
  import Table from '$lib/components/Table.svelte';
  import Embed from '$lib/components/Embed.svelte';

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
  let route = $page.route.id;
  let frontmatter = {};

  const components = {
    Callout,
    Time,
    Codeblock,
    Table,
    Embed,
    CopyPasteCodeBlock,
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
              href: fixlink(
                node.attributes.href,
                // TODO: try to simplify reconstructing the pageprefix from params
                params.proj
                  ? `/za/${params.proj}`
                  : params.blog
                  ? `/${params.blog}`
                  : params.docs
                  ? `/${params.docs}`
                  : '',
                (route?.startsWith('/blog/')
                  ? 'blog/'
                  : route?.startsWith('/careers/')
                  ? 'careers/'
                  : '') + params.path
              ),
              title: node.attributes.title
            },
            node.transformChildren(config)
          );
        }
      },
      image: {
        transform(node, config) {
          return new Tag('img', {
            ...node.transformAttributes(config),
            src: fixlink(
              node.attributes.src,
              params.proj
                ? `/za/${params.proj}`
                : params.blog
                ? `/${params.blog}`
                : params.docs
                ? `/${params.docs}`
                : '',
              (route?.startsWith('/blog/')
                ? 'blog/'
                : route?.startsWith('/careers/')
                ? 'careers/'
                : '') + params.path
            )
          });
        }
      },
      fence: {
        attributes: {
          content: { type: String, render: false, required: true },
          language: { type: String }
        },
        transform(node, config) {
          const attributes = node.transformAttributes(config);
          const children = [node.attributes.content.replace(/\n$/, '')];
          return new Tag('Codeblock', attributes, children);
        }
      },
      table: {
        transform(node, config) {
          const attributes = node.transformAttributes(config);
          const children = node.transformChildren(config);
          return new Tag('Table', attributes, children);
        }
      }
    },
    tags: {
      embed: {
        render: 'Embed'
      },
      callout: {
        render: 'Callout'
      },
      time: {
        render: 'Time'
      },
      command: {
        render: 'CopyPasteCodeBlock'
      },
      suggest_layout: {
        render: 'SuggestLayout',
      }
    }
  };

  let ast: Node;
  $: ast = content?.ast ?? parse(doc);
  // TODO: make content?.frontmatter available to transform()

  let tags: RenderableTreeNode | RenderableTreeNode[];
  $: tags = transform(ast, markdoc_config);
</script>

<MarkdocTags {tags} {components} />
