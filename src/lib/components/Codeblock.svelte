<script lang="ts">
  import { page } from '$app/stores';
  export let language = '';
</script>

{#key $page.params.path}
<pre><code class="pre language-{language}"><slot /><code /></pre>
{/key}
