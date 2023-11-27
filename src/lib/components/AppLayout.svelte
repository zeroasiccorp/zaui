<script lang="ts">
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';

  import clsx from 'clsx';
  import { fixlink } from '$lib/fixlink';

  import type { Config, MarkdownFile } from '$lib/stores/model';
  import YamlError from '$lib/components/YamlError.svelte';

  // content may be undefined e.g. if this is a 404 page
  export let content: MarkdownFile;
  export let config: Config;

  let pg: any;
  $: pg = content?.frontmatter;

  let fullwidth: boolean;
  $: fullwidth = !!pg?.fullwidth;

  // https://tailwindcss.com/docs/typography-plugin#element-modifiers
  const PROSE = clsx(
    'prose prose-slate max-w-none dark:prose-invert dark:text-slate-200',
    'prose-headings:font-display prose-headings:font-normal',
    'prose-a:font-normal prose-a:text-sky-600 prose-a:no-underline hover:prose-a:underline prose-a:dark:text-sky-400',
    'prose-li:my-1',
    // Avoid changing code blocks styles by prefixing prose-code: with [&:not(.pre)]: - see Codeblock.svelte
    '[&:not(.pre)]:prose-code:px-[3px] [&:not(.pre)]:prose-code:py-[2px] [&:not(.pre)]:prose-code:rounded prose-code:font-normal prose-code:before:content-none prose-code:after:content-none [&:not(.pre)]:prose-code:dark:text-slate-200 [&:not(.pre)]:prose-code:text-slate-500 [&:not(.pre)]:prose-code:bg-slate-100 [&:not(.pre)]:prose-code:dark:bg-slate-700/60'
  );
</script>

<svelte:head>
  <script src="/js/prism.js" defer></script>
</svelte:head>

<Nav {config} />

<YamlError {content} />

{#if pg?.splash}
  <div
    class="text-center p-10 sm:p-20 text-slate-100 font-display font-extralight bg-cover"
    style="background-image: url({fixlink(pg.splash.image || pg.splash)})"
  >
    <h1
      class="text-balance text-5xl sm:text-6xl md:text-7xl max-w-screen-xl mx-auto tracking-wide backdrop-blur-sm"
    >
      {pg.splash.title ?? ''}
    </h1>
    <p class="text-3xl sm:text-4xl max-w-screen-xl mx-auto leading-[1.5] backdrop-blur-sm mt-2">
      {pg.splash.subtitle ?? ''}
    </p>
  </div>
{/if}


<div class="">
  {#if fullwidth}
    <div class={PROSE}>
      <slot />
    </div>
  {:else}
    <div class="px-4 max-w-4xl mx-auto pt-8">
      <div class={PROSE}>
        <slot />
      </div>
    </div>
  {/if}
</div>

<Footer {config} />
