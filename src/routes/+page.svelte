<script lang="ts">
  import Box from '$lib/components/Box.svelte';
  import { page } from '$app/stores';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#each Object.keys($page.data.layoutComponents) as name}
  <h2>{name}</h2>
  <svelte:component this={$page.data.layoutComponents[name]} />
{/each}

