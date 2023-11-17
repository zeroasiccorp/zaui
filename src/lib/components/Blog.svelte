<script lang="ts">
  import { model, type MarkdownFile, compareMDFDates } from '$lib/stores/model';
  import Markdoc from '$lib/components/Markdoc.svelte';
  import YamlError from '$lib/components/YamlError.svelte';
  import { fixlink } from '$lib/fixlink';

  export let content: MarkdownFile;

  let blogfiles = $model?.files.filter((f) => f.startsWith('blog/') && !f.endsWith('/index.md'));
  let posts = blogfiles.map((f) => $model?.fileMap[f]).sort(compareMDFDates);
</script>

{#if content}
  <Markdoc {content} />
{:else}
  <h1>Blog</h1>
{/if}

{#each posts as post}
  <div class="mt-4">
    <div class="text-sm font-display text-slate-600 dark:text-slate-400">{post.byline}</div>
    <h2 class="my-2"><a href={fixlink(post.filepath)}>{post.frontmatter?.title ?? 'Post'}</a></h2>
    <YamlError content={post} />
    {#if post.frontmatter?.excerpt}<Markdoc doc={post.frontmatter.excerpt} />{/if}
    <hr />
  </div>
{/each}
