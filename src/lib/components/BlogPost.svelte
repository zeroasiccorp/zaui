<script lang="ts">
  import Markdoc from '$lib/components/Markdoc.svelte';
  import type { MarkdownFile } from '$lib/stores/model';

  export let content: MarkdownFile;
</script>

<div class="text-sm font-display text-slate-600 mb-2">{content.byline}</div>
<Markdoc {content} />
