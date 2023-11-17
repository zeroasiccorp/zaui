<script lang="ts">
  import '$lib/css/tailwind.css';
  import { page } from '$app/stores';
  import { model } from '$lib/stores/model';
  import AppLayout from '$lib/components/AppLayout.svelte';
  import { setContext } from 'svelte';

  // appcontext container for global funcctions
  // instantiated here and passed down to all components
  // NOTE: this is non-reactive (not a store)
  // https://learn.svelte.dev/tutorial/context-api
  setContext('appContext', {});
</script>

<AppLayout content={$page.data.content} config={$model.config} >
  <slot />
</AppLayout>
