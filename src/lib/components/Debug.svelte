<script lang="ts">
  import { page } from '$app/stores';
  import appConfig from '$appconfig/app.config';
</script>

<h2>appConfig.layoutComponents</h2>
<div class="whitespace-pre-wrap">
  {JSON.stringify(Object.keys(appConfig.layoutComponents || {}), null, 2)}
</div>

<h2>appConfig</h2>
<div class="whitespace-pre-wrap">
  {JSON.stringify(appConfig || {}, null, 2)}
</div>

<h2>page</h2>
<div class="whitespace-pre-wrap">
  {JSON.stringify($page, null, 2)}
</div>
