<script lang="ts">
  import type { MarkdownFile } from '$lib/stores/model';
  export let content: MarkdownFile;
</script>

{#if content?.yamlError}
  <div class="p-4 bg-red-100 font-mono whitespace-pre">
    <strong>{content.filepath + '\n\n'}</strong>
    {content.yamlError}
  </div>
{/if}
