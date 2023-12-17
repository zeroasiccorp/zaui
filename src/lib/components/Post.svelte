<script lang="ts">
  import { page } from '$app/stores';
  import PageContent from '$lib/components/PageContent.svelte';
  import Next from '$lib/components/Next.svelte';
</script>

<Next />
<div class="mb-2 text-sm font-display text-slate-600 dark:text-slate-400">{$page.data.content?.byline ?? ''}</div>
<PageContent />
