<script lang="ts">
  import { page } from '$app/stores';
  import appConfig from '$src/pub.config';

  import Markdoc from '$lib/components/Markdoc.svelte';
  import type { MarkdownFile } from '$lib/stores/model';

  export let content: MarkdownFile;
</script>

{#if content}
  <Markdoc {content} />
{:else}
  <h1>Debug</h1>
{/if}

<h2>app</h2>
<div class="whitespace-pre-wrap">
  {JSON.stringify(appConfig, null, 2)}
</div>

<h2>page</h2>
<div class="whitespace-pre-wrap">
  {JSON.stringify($page, null, 2)}
</div>
