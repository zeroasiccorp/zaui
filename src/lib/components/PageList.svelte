<script lang="ts">
  import { page } from '$app/stores';
  import type { MarkdownFile } from '$lib/stores/model';
  import PageContent from '$lib/components/PageContent.svelte';
  import YamlError from '$lib/components/YamlError.svelte';
  import { fixlink } from '$lib/fixlink';

  let posts: MarkdownFile[] = [];
  $: posts = $page.data.dir;
</script>

<PageContent />

{#each posts as post}
  <hr class="mt-6 mb-0" />
  <h3 class="mt-2">
    <a href={fixlink(post.filepath)}>{post.frontmatter?.title ?? 'Post'}</a>
  </h3>
  <YamlError content={post} />
{/each}
