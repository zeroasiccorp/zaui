<script lang="ts">
  import type { MarkdownFile } from '$lib/stores/model';
  import { fixlink } from '$lib/fixlink';

  export let content: MarkdownFile;

  let pg: any;
  $: pg = content?.frontmatter;
</script>

{#if pg?.splash}
  <div
    class="text-center p-10 sm:p-20 text-slate-100 font-display font-extralight bg-cover"
    style="background-image: url({fixlink(pg.splash.image || pg.splash)})"
  >
    <h1
      class="text-balance text-5xl sm:text-6xl md:text-7xl max-w-screen-xl mx-auto tracking-wide backdrop-blur-sm"
    >
      {pg.splash.title ?? pg.title ?? ''}
    </h1>
    <p class="text-3xl sm:text-4xl max-w-screen-xl mx-auto leading-[1.5] backdrop-blur-sm mt-2">
      {pg.splash.subtitle ?? pg.subtitle ?? ''}
    </p>
  </div>
{/if}