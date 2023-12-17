<script lang="ts">
  import clsx from 'clsx';
  import { icons } from '$lib/componentMaps';

  export let type = 'note';

  const mapicons: { [key: string]: string } = {
    note: 'Info',
    tip: 'Lightbulb',
    important: 'MessageSquareWarning',
    warning: 'AlertTriangle',
    caution: 'AlertOctagon',
  };

  const textcolors: { [key: string]: string } = {
    note: 'text-blue-500',
    tip: 'text-green-600',
    important: 'text-violet-600',
    warning: 'text-orange-500',
    caution: 'text-red-600',
  };

  const bordercolors: { [key: string]: string } = {
    note: 'border-l-blue-500',
    tip: 'border-l-green-600',
    important: 'border-l-violet-600',
    warning: 'border-l-orange-500',
    caution: 'border-l-red-600',
  };

  $: icon = icons[mapicons[type.toLowerCase()]];
  $: textcolor = textcolors[type.toLowerCase()] || 'text-blue-500';
  $: bordercolor = bordercolors[type.toLowerCase()] || 'border-l-blue-500';
</script>

<div class={clsx('pl-4 py-1 my-3 border-l-4 prose-p:my-1', bordercolor)}>
  <div class={clsx('font-semibold', textcolor)}>
    <svelte:component this={icon} class="inline-block w-4 h-4 mr-1" />
    {type}
  </div>
  <slot />
</div>
