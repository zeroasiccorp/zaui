<script lang="ts">
  import { icons } from '$lib/componentMaps';
  import { fixlink } from '$lib/fixlink';

  type Icon = {
    image?: string;
    text?: string;
    class?: string;
  };

  export let imageclass = '';
  export let textclass = '';

  export let icon: Icon | string = {};
  let ico: Icon = {};
  $: ico = typeof icon === 'string' ? { image: icon } : icon;
</script>

<div class="flex flex-row gap-2">
{#if ico.image}
  <!-- TODO: replace with https://github.com/mathiasbynens/emoji-regex -->
  {#if /\p{Emoji}/u.test(ico.image)}
    <span class={ico.class || textclass}>{ico.image}</span>
  {:else if Object.keys(icons).includes(ico.image)}
    <svelte:component this={icons[ico.image]} class={ico.class || imageclass} />
  {:else}
    <img src={fixlink(ico.image)} alt={ico.text ?? 'Icon'} class={ico.class || imageclass} />
  {/if}
{/if}
{#if !ico.image || ico.text}
  <span class={ico.class || textclass}>
    {ico.text ?? ''}
  </span>
{/if}
</div>