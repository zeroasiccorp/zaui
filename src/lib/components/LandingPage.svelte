<script lang="ts">
  // LandingPage with optional hero and features sections
  // NOTE: hero looks best with fullwidth:true

  import { page } from '$app/stores';
  import type { Config } from '$lib/stores/model';
  import PageContent from '$lib/components/PageContent.svelte';
  import { appComponents } from '$lib/componentMaps';
  let config: Config = $page.data.config;
</script>

{#if config.hero}
  <svelte:component this={appComponents.Hero} hero={config.hero} />
{/if}

{#if config.features?.length}
  <svelte:component this={appComponents.Features} features={config.features} />
{/if}

<div class="p-4 max-w-4xl mx-auto">
  <PageContent />
</div>
