import Yo from '$lib/components/Yo.svelte';
import { layoutComponents as userLayoutComponents } from '$src/pub.config';

export let layoutComponents: App.ComponentMap = {
  Yo,
  ...userLayoutComponents,
};
