<script lang="ts">
  import { page } from '$app/stores';
  // console.log('$page.data.layout', $page.data.layout);
</script>

<svelte:component this={$page.data.layout} content={$page.data.content} />
