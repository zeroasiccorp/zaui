<script lang="ts">
  import type { Navlink } from '$lib/stores/model';
  import NavIcon from '$lib/components/NavIcon.svelte';

  export let features: Navlink[];
</script>

<section class="flex flex-wrap justify-center gap-4 sm:mt-8 p-4 max-w-7xl mx-auto">
  {#each features as feature}
    <a
      href={feature.href}
      class="not-prose w-full sm:w-64 sm:min-h-[250px] border-2 border-transparent hover:border-sky-400 bg-slate-50 dark:bg-slate-700 rounded-lg shadow-md dark:shadow-slate-700 p-6 lg:p-6"
    >
      <NavIcon icon={feature.icon} class="text-2xl" />
      <h3 class="mt-2 font-semibold leading-tight">{feature.text}</h3>
      <div class="mt-4 leading-normal">{feature.details}</div>
    </a>
  {/each}
</section>
