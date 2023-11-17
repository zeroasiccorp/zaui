<script lang="ts">
  import { page } from '$app/stores';
</script>

<h2>{$page.status}</h2>
<p>{$page.error?.message}</p>
