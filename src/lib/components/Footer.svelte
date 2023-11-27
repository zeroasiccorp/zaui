<script lang="ts">
  import type { Config } from '$lib/stores/model';
  export let config: Config;
</script>

<div class="mt-72 text-center text-slate-500 mb-8">
  {#if config?.footer?.text}
    {config.footer.text}
    <br>
  {/if}
  <a href="/terms" class="hover:underline">Terms</a> |
  <a href="/privacy" class="hover:underline">Privacy</a>
</div>
