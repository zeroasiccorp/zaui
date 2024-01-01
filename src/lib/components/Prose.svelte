<script lang="ts">
  import clsx from 'clsx';
  import type { MarkdownFile } from '$lib/stores/model';
  import { page } from '$app/stores';

  // content may be undefined e.g. if this is a 404 page
  export let content: MarkdownFile;
  let config = $page.data.config;

  $: fullwidth = content?.frontmatter?.fullwidth;
  $: sidebar = $page.data.sidebar;

  // https://tailwindcss.com/docs/typography-plugin#element-modifiers
  const PROSE = clsx(
    'prose prose-slate max-w-none dark:prose-invert dark:text-slate-200',
    'prose-blockquote:font-normal prose-blockquote:not-italic before:prose-p:content-none after:prose-p:content-none',
    'prose-headings:font-display prose-headings:font-normal',
    'prose-a:font-normal prose-a:text-sky-600 prose-a:no-underline hover:prose-a:underline prose-a:dark:text-sky-400',
    'prose-li:my-1',
    // Avoid changing code blocks styles by prefixing prose-code: with [&:not(.pre)]: - see Codeblock.svelte
    '[&:not(.pre)]:prose-code:px-[3px] [&:not(.pre)]:prose-code:py-[2px] [&:not(.pre)]:prose-code:rounded prose-code:font-normal prose-code:before:content-none prose-code:after:content-none [&:not(.pre)]:prose-code:dark:text-slate-200 [&:not(.pre)]:prose-code:text-slate-500 [&:not(.pre)]:prose-code:bg-slate-100 [&:not(.pre)]:prose-code:dark:bg-slate-700/60'
  );
</script>

<div class={sidebar ? 'md:ml-60' : ''}>
  <div class={clsx(fullwidth ? '' : 'px-4 max-w-4xl mx-auto', config.pagetop ?? 'pt-8')}>
    <div class={PROSE}>
      <slot />
    </div>
  </div>
</div>
