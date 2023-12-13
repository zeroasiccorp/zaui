<script lang="ts">
  import { page } from '$app/stores';
  import { fixlink } from '$lib/fixlink';
  import type { Config } from '$lib/stores/model';

  let config: Config = $page.data.config ?? {};
  let appurl = config.appurl;

  $: pg = $page.data.frontmatter ?? {};
  $: splash = pg.splash ?? {};
  $: splashlink = splash.image ? fixlink(splash.image, '', $page.params.path) : '';
  $: title = splash.title || pg.title || config.hero?.name || '';
  $: subtitle = splash.subtitle || pg.subtitle || pg.description || '';
</script>

<svelte:head>
  {#if appurl}
    <meta property="og:url" content={appurl + $page.url.pathname} />
  {/if}
  {#if title}
    <title>{title}</title>
    <meta property="og:title" content={title} />
  {/if}
  {#if subtitle}
    <meta property="og:description" content={subtitle} />
  {/if}
  {#if splash.image && appurl}
    <meta property="og:image" content={appurl + splashlink} />
    <meta name="twitter:card" content="summary_large_image" />
  {/if}
  {#if config.twitter}
    <meta name="twitter:site" content={config.twitter} />
    <meta name="twitter:creator" content={config.twitter} />
  {/if}
</svelte:head>

{#if pg.splash}
  <div
    class="bg-slate-400 text-center p-10 sm:p-20 text-slate-100 font-display font-extralight bg-cover"
    style={splash.image ? `background-image: url(${splashlink})`: ''}
  >
    <h1
      class="text-balance text-5xl sm:text-6xl md:text-7xl max-w-screen-xl mx-auto tracking-wide backdrop-blur-sm"
    >
      {title}
    </h1>
    <p class="text-3xl sm:text-4xl max-w-screen-xl mx-auto leading-[1.5] backdrop-blur-sm mt-2">
      {subtitle}
    </p>
  </div>
{/if}
