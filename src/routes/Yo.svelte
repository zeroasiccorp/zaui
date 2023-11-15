<script lang="ts">
  import * as env from '$lib/environment';
  import Box from '$lib/components/Box.svelte';
  let text = 'From sveltekit-template';
</script>

<h1 class="font-display text-sky-900 rounded shadow-lg bg-indigo-50 p-2 -mx-2">{text}</h1>

<Box class="text-green-700">Another box which isn't a box.</Box>

<div class="whitespace-pre-wrap p-2 bg-green-50">
env
{JSON.stringify(env,null,2)}
</div>