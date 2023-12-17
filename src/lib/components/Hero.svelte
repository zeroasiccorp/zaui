<script lang="ts">
  import { page } from '$app/stores';
  import type { Hero, Config } from '$lib/stores/model';
  import NavIcon from '$lib/components/NavIcon.svelte';
  import { fixlink } from '$lib/fixlink';
  import clsx from 'clsx';

  export let hero: Hero;

  let config: Config = $page.data.config;
  $: pg = $page.data.frontmatter;
</script>

<section
  class="p-4 sm:p-8 flex sm:gap-8 flex-wrap-reverse justify-center items-center bg-slate-100 dark:bg-slate-700"
>
  <div class="max-w-lg">
    <h1 class="text-7xl my-4 text-slate-800 dark:text-slate-100">{hero.name || pg?.title || ''}</h1>
    <h2 class="text-5xl my-4 text-slate-600 dark:text-slate-300">
      {hero.text || pg?.subtitle || ''}
    </h2>
    <div class="text-xl my-4 text-slate-600 dark:text-slate-300">
      {hero.tagline || pg?.description || ''}
    </div>
    {#if hero.actionlinks}
      <div class="flex flex-row flex-wrap items-end gap-4 pb-4">
        {#each hero.actionlinks as link, i}
          <a
            href={link.href}
            class={clsx(
              'not-prose px-4 w-32 min-w-fit pt-1 pb-[2px] rounded text-center font-semibold text-lg border-b-4 border-transparent hover:border-orange-400',
              i
                ? 'bg-slate-200 dark:bg-slate-600 dark:text-slate-300 dark:hover:text-white'
                : 'bg-slate-500 dark:bg-slate-500 text-white'
            )}
          >
            {link.text}
          </a>
        {/each}
      </div>
    {/if}
  </div>
  <NavIcon
    icon={hero.icon || config.icon}
    textclass="text-9xl"
    imageclass="w-[150px] h-[150px] object-cover rounded-full"
  />
</section>
