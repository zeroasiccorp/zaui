<script lang="ts">
  import type { MarkdownFile } from '$lib/stores/model';
  import Markdoc from '$lib/components/Markdoc.svelte';

  export let content: MarkdownFile;

  let title = '';
  $: title = content?.frontmatter?.title ?? 'Career Opportunity';
</script>

<h1>{title}</h1>

<Markdoc {content} />
<a
  href="mailto:work@zeroasic.com"
  class="inline-block border-2 p-2 mt-6 rounded-lg hover:bg-slate-100">Get in touch</a
>
