<script lang="ts">
  import { page } from '$app/stores';
  import { model, type Config } from '$lib/stores/model';
  import clsx from 'clsx';

  export let config: Config;

  $: sidebar = $page.data.sidebar;
</script>

<div class={clsx('mt-72 text-center text-slate-500 mb-8', sidebar ? 'md:ml-60' : '')}>
  {#if config?.footer?.text}
    {config.footer.text}
    <br />
  {/if}
  {#if $model?.fileMap['terms.md']}
    <a href="/terms" class="hover:underline">Terms</a>
  {/if}
  {#if $model?.fileMap['terms.md'] && $model?.fileMap['privacy.md']}
    |
  {/if}
  {#if $model?.fileMap['privacy.md']}
    <a href="/privacy" class="hover:underline">Privacy</a>
  {/if}
</div>
