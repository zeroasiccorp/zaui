<script lang="ts">
  import { page } from '$app/stores';
  import type { MarkdownFile } from '$lib/stores/model';
  import Markdoc from '$lib/components/Markdoc.svelte';
  import PageContent from '$lib/components/PageContent.svelte';
  import YamlError from '$lib/components/YamlError.svelte';
  import { fixlink } from '$lib/fixlink';

  let posts: MarkdownFile[] = [];
  $: posts = $page.data.dir;
</script>

<PageContent />

{#each posts as post}
  <div class="mt-4">
    <hr />
    <div class="text-sm font-display text-slate-600 dark:text-slate-400">{post.byline}</div>
    <h2 class="my-2"><a href={fixlink(post.filepath)}>{post.frontmatter?.title ?? 'Post'}</a></h2>
    <YamlError content={post} />
    {#if post.frontmatter?.excerpt}<Markdoc doc={post.frontmatter.excerpt} />{/if}
  </div>
{/each}
