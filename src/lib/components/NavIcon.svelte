<script lang="ts">
  import { icons } from '$lib/componentMaps';
  import { clsx } from 'clsx';
  import { fixlink } from '$lib/fixlink';

  type Icon = {
    image?: string;
    text?: string;
    class?: string;
  };

  let cls = '';
  export { cls as class };

  export let icon: Icon | string = {};
  let ico: Icon = {};
  $: ico = typeof icon === 'string' ? { image: icon } : icon;
</script>

{#if ico.image}
  <!-- TODO: replace with https://github.com/mathiasbynens/emoji-regex -->
  {#if /\p{Emoji}/u.test(ico.image)}
    <span class={ico.class || cls}>{ico.image}</span>
  {:else if Object.keys(icons).includes(ico.image)}
    <svelte:component this={icons[ico.image]} class={ico.class || cls} />
  {:else}
    <img src={fixlink(ico.image)} alt={ico.text ?? 'Icon'} class={ico.class || cls} />
  {/if}
{/if}
{#if !ico.image || ico.text}
  <span class={ico.class || cls}>
    {ico.text ?? ''}
  </span>
{/if}
