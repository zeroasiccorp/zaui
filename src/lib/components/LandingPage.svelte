<script lang="ts">
  // LandingPage with optional hero and features sections
  // NOTE: hero looks best with fullwidth:true
  // TODO: extract hero and features into customizable appComponents

  import { page } from '$app/stores';
  import type { Config, MarkdownFile } from '$lib/stores/model';
  import { appComponents } from '$lib/componentMaps';

  import Markdoc from '$lib/components/Markdoc.svelte';

  let content: MarkdownFile = $page.data.content;
  let config: Config = $page.data.config;
</script>

{#if config.hero}
  <svelte:component this={appComponents.Hero} hero={config.hero} />
{/if}

{#if config.features?.length}
  <svelte:component this={appComponents.Features} features={config.features} />
{/if}

<Markdoc {content} />
