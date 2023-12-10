<script lang="ts">
  import { icons } from '$lib/componentMaps';
  import { clsx } from 'clsx';

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
    <span class={clsx(cls, ico.class)}>{ico.image}</span>
  {:else if Object.keys(icons).includes(ico.image)}
    <svelte:component this={icons[ico.image]} class={clsx(cls, ico.class)} />
  {:else}
    <img src={ico.image} alt={ico.text ?? 'Icon'} class={clsx(cls, ico.class)} />
  {/if}
{/if}
{#if !ico.image || ico.text}
  <span class={clsx('font-logo leading-none tracking-widest font-medium', cls, ico.class)}>
    {ico.text ?? ''}
  </span>
{/if}
