<script lang="ts">
  import { appComponents } from '$lib/componentMaps';
  import { fixlink } from '$lib/fixlink';
  import LoginDialog from '$lib/components/LoginDialog.svelte';

  import type { Config, MarkdownFile } from '$lib/stores/model';
  import YamlError from '$lib/components/YamlError.svelte';

  // content may be undefined e.g. if this is a 404 page
  export let content: MarkdownFile;
  export let config: Config;
</script>

<svelte:head>
  <script src="/prism.js" defer></script>
  <link rel="icon" href="{config?.favicon ? fixlink(config?.favicon) : '/favicon.jpg' }" />
</svelte:head>

<LoginDialog {config} />

<svelte:component this={appComponents.Nav} {config} />

<YamlError {content} />

<svelte:component this={appComponents.Splash} />

<svelte:component this={appComponents.Prose} {content}>
  <slot />
</svelte:component>

<svelte:component this={appComponents.Footer} {config} />
