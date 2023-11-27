<script lang="ts">
  import type { MarkdownFile } from '$lib/stores/model';
  import Markdoc from '$lib/components/Markdoc.svelte';

  export let content: MarkdownFile;

  let title = '';
  $: title = content?.frontmatter?.title ?? 'Career Opportunity';
</script>

<h1>{title}</h1>

<Markdoc {content} />
