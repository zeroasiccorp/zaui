<script lang="ts">
  import { page } from '$app/stores';
</script>

<svelte:component this={$page.data.layout} content={$page.data.content} />
