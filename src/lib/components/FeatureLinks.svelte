<script lang="ts">
  import { model, type MarkdownFile } from '$lib/stores/model';
  import Markdoc from '$lib/components/Markdoc.svelte';
  import { fixlink } from '$lib/fixlink';
  import { page } from '$app/stores';

  export let content: MarkdownFile;

  let config = $model?.config || {};
  let submenuMap = $model?.submenuMap || {};

  // TODO: sidebar sections
  $: submenu = submenuMap[$page.url.pathname] ?? {};
  $: links = submenu.links.filter((link) => !link.previewOnly || config?.preview);
</script>

{#if content}
  <Markdoc {content} />
{/if}

<div class="flex flex-wrap gap-8 justify-center">
  {#if links}
    {#each links as link}
      <a
        href={link.href}
        class="flex flex-col items-start text-center w-1/3 sm:w-1/5 p-2 rounded-xl border-2 dark:border-4 border-slate-100 shadow-2xl bg-white hover:border-sky-600"
      >
        <h2 class="w-full m-0 text-slate-800 text-lg">{link.text}</h2>
        {#if link.image}
          <img class="my-2 mx-auto" src={fixlink(link.image)} alt={link.text} />
        {/if}
      </a>
    {/each}
  {/if}
</div>
