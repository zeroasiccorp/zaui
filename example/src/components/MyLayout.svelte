<script lang="ts">
  import { page } from '$app/stores';
  import PageContent from '$lib/components/PageContent.svelte';
  import Json from '$lib/components/Json.svelte';

  $: config = $page.data.config;
  $: pg = $page.data.frontmatter;
</script>

<h2>Page Markdown</h2>
<PageContent />

<h2>Page Frontmatter</h2>
<Json o={pg} />

<h2>Site Config</h2>
<Json o={config} />



