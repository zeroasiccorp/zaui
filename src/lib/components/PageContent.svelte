<script lang="ts">
  import { page } from '$app/stores';
  import Markdoc from '$lib/components/Markdoc.svelte';

  $: content = $page.data.content;
  </script>

{#if content?.markdown}
  <Markdoc {content} />
{/if}