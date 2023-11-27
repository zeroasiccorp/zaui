<script lang="ts">
  import Markdoc from '$lib/components/Markdoc.svelte';
  import type { MarkdownFile } from '$lib/stores/model';

  import { icons } from '$lib/componentMaps';

  export let content: MarkdownFile;
</script>

{#if content?.markdown}
  <Markdoc {content} />
{:else}
  <h1>Icons</h1>
{/if}

<div class="flex flex-row flex-wrap gap-4">
  {#each Object.keys(icons) as icon}
    <div class="flex flex-col items-center rounded border pb-2">
      <div
        class="font-logo w-full text-center mb-2 rounded-t p-2 bg-slate-200 dark:bg-slate-600 dark:text-slate-200 text-slate-800"
      >
        {icon}
      </div>
      <svelte:component this={icons[icon]} class="h-8 m-4 border-b text-sky-600" />
    </div>
  {/each}
</div>
