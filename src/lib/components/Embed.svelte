<script lang="ts">
  // https://stackoverflow.com/questions/56104899/how-do-i-access-the-value-of-a-slot-in-a-svelte-3-component
  let content;
</script>

<div class="hidden" bind:this={content}><slot /></div>
{#if content}
  <div class="-mt-4">{@html content.textContent}</div>
{/if}
