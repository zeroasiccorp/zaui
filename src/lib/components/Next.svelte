<script lang="ts">
  import { page } from '$app/stores';
  import { fixlink } from '$lib/fixlink';
  let shownext = $page.data.config.shownext;

  $: content = $page.data.content;
</script>

{#if content.next && shownext}
  <a href={fixlink('/' + content.next.filepath)} class="not-prose float-right text-center text-sm tracking-tight leading-5 w-32 p-2 rounded bg-slate-100 dark:bg-slate-700 border-b-2 border-transparent hover:border-orange-500">
    <span class="font-semibold">Next:</span> {content.next.frontmatter?.title ?? ''}
  </a>
{/if}