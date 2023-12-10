<script lang="ts">
  import { appComponents } from '$lib/componentMaps';

  import LoginDialog from '$lib/components/LoginDialog.svelte';

  import clsx from 'clsx';

  import type { Config, MarkdownFile } from '$lib/stores/model';
  import YamlError from '$lib/components/YamlError.svelte';

  // content may be undefined e.g. if this is a 404 page
  export let content: MarkdownFile;
  export let config: Config;

</script>

<svelte:head>
  <script src="/prism.js" defer></script>
</svelte:head>

<LoginDialog {config} />

<svelte:component this={appComponents.Nav} {config} />

<YamlError {content} />

<svelte:component this={appComponents.Splash} {content} />

<svelte:component this={appComponents.Prose} {content}>
  <slot />
</svelte:component>

<svelte:component this={appComponents.Footer} {config} />
