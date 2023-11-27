<script lang="ts">
  import { model, type MarkdownFile, compareMDFDates } from '$lib/stores/model';
  import Markdoc from '$lib/components/Markdoc.svelte';
  import YamlError from '$lib/components/YamlError.svelte';
  import { fixlink } from '$lib/fixlink';

  export let content: MarkdownFile;

  let jobfiles = $model?.files.filter((f) => f.startsWith('jobs/') && !f.endsWith('/index.md'));
  let jobs = jobfiles.map((f) => $model?.fileMap[f]).sort(compareMDFDates);
</script>

{#if content}
  <Markdoc {content} />
{:else}
  <h1>Career Opportunities</h1>
{/if}

{#each jobs as job}
  <hr class="mt-6 mb-0" />
  <h3 class="mt-2">
    <a href={fixlink(job.filepath)}>{job.frontmatter?.title || 'Opportunity'}</a>
  </h3>
  <YamlError content={job} />
  {#if job.frontmatter?.excerpt}<Markdoc doc={job.frontmatter.excerpt} />{/if}
{/each}
