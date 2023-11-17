<script lang="ts">
  import Markdoc from '$lib/components/Markdoc.svelte';
  import type { MarkdownFile } from '$lib/stores/model';

  export let content: MarkdownFile;
</script>

{#if content?.markdown}
  <Markdoc {content} />
{:else}
  <p>No content to see here, yet.</p>
{/if}
