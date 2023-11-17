<script lang="ts">
  import { layoutComponents } from '$lib/components';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#each Object.keys(layoutComponents) as name}
  <h2>{name}</h2>
  <svelte:component this={layoutComponents[name]} />
{/each}
