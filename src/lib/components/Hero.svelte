<script lang="ts">
  import { page } from '$app/stores';
  import type { Hero, Config } from '$lib/stores/model';
  import NavIcon from '$lib/components/NavIcon.svelte';

  export let hero: Hero;

  let config: Config = $page.data.config;
  $: pg = $page.data.frontmatter;
</script>

<section
  class="sm:py-8 flex sm:gap-8 flex-wrap-reverse justify-center items-center p-4 bg-slate-100 dark:bg-slate-700"
>
  <div class="max-w-lg">
    <h1 class="text-7xl my-4 text-slate-800 dark:text-slate-100">{hero.name || pg?.title || ''}</h1>
    <h2 class="text-5xl my-4 text-slate-600 dark:text-slate-300">{hero.text || pg?.subtitle || ''}</h2>
    <div class="text-xl my-4 text-slate-600 dark:text-slate-300">{hero.tagline || pg?.description || ''}</div>
  </div>
  <NavIcon icon={hero.icon || config.icon} class="text-9xl" />
</section>
