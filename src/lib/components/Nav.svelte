<script lang="ts">
  import { page } from '$app/stores';
  import { icons } from '$lib/componentMaps';
  import { clsx } from 'clsx';

  // menu
  import MenuIcon from '$lib/components/icons/Menu.svelte';
  import XIcon from '$lib/components/icons/X.svelte';
  import { slide } from 'svelte/transition';
  import UserMenu from '$lib/components/UserMenu.svelte';

  import { model, type Config } from '$lib/stores/model';
  export let config: Config;

  // TODO - make consistent - pass like config via props vs $page or $model
  let submenuMap = $model?.submenuMap || {};

  let path: string;
  $: path = $page.url.pathname;

  let pathprefix: string;
  $: pathprefix = '/' + path.split('/')[1];

  let navlinks: typeof config.navlinks;
  $: navlinks = config?.navlinks?.filter((link) => !link.previewOnly || config?.preview);

  let docslinks: typeof config.docslinks;
  $: docslinks = config?.docslinks?.filter((link) => !link.previewOnly || config?.preview);

  let showNav: boolean = false;
  function toggleNav() {
    showNav = !showNav;
    try {
      scrollTo(0, 0);
    } catch (e) {}
  }
  function hideNav() {
    showNav = false;
  }
</script>

<nav
  class="sticky top-0 z-20 flex flex-row justify-between px-4 bg-slate-50 border-b border-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:border-black"
>
  <a
    href="/"
    title="Home"
    on:click={hideNav}
    class="order-2 pt-3 pb-2 border-b-2 border-transparent hover:border-orange-400"
  >
    {#if config?.icon?.image}
      <!-- TODO: replace with https://github.com/mathiasbynens/emoji-regex -->
      {#if /\p{Emoji}/u.test(config.icon.image)}
        <span class="text-2xl leading-none">{config.icon.image}</span>
      {:else if Object.keys(icons).includes(config.icon.image)}
        <svelte:component this={icons[config.icon.image]} class="h-[24px]" />
      {:else}
        <img
          src={config.icon.image}
          alt={config.icon.text ?? 'Icon'}
          class={config.icon.imageclass ?? ''}
        />
      {/if}
    {/if}
    {#if !config?.icon?.image || config?.icon?.text}
      <span class="font-logo text-2xl leading-none tracking-widest font-medium"
        >{config?.icon?.text ?? 'Zaui'}</span
      >
    {/if}
  </a>
  {#if navlinks?.length}
    <button
      title="Toggle main menu"
      on:click={toggleNav}
      aria-label="Menu"
      class="md:hidden order-1 mt-2 pb-1 border-b-2 border-transparent hover:border-orange-400"
    >
      {#if showNav}
        <XIcon class="w-8 h-8" />
      {:else}
        <MenuIcon class="w-8 h-8" />
      {/if}
    </button>
    <div class="hidden md:flex order-3 flex-grow justify-end items-end">
      {#each navlinks as link}
        <a
          href={link.href}
          title={link.icon ? link.text ?? link.href : ''}
          class={clsx(
            'mb-2 mr-4 font-display text-sm dark:text-sky-400',
            'border-b-2 hover:border-orange-400',
            path.startsWith(link.href) ? 'border-orange-400' : 'border-transparent'
          )}
        >
          {#if link.icon}
            <svelte:component this={icons[link.icon]} class="h-4 w-4 mb-1" />
          {:else}
            {link.text ?? link.href}
          {/if}
        </a>
      {/each}
    </div>
    <div class="order-4">
      {#if config.usermenu}<UserMenu />{:else}&nbsp;{/if}
    </div>
  {/if}
</nav>

{#if showNav && navlinks?.length}
  <nav
    transition:slide
    class="flex flex-col font-display leading-8 bg-slate-50 dark:text-slate-200 dark:bg-slate-900"
  >
    {#each navlinks as link}
      <a
        href={link.href}
        class="block py-[2px] px-3 m-[2px] hover:underline dark:text-sky-400 border-b dark:border-slate-800"
        on:click={toggleNav}
      >
        {link.text}</a
      >
      {#if link.submenu?.links}
        {#each link.submenu.links as submenulink}
          <a
            href={submenulink.href}
            class="block py-[2px] px-10 m-[2px] hover:underline dark:text-sky-400 border-b dark:border-slate-800"
            on:click={toggleNav}
          >
            {submenulink.text}</a
          >
        {/each}
      {/if}
    {/each}
  </nav>
{/if}

{#if submenuMap[pathprefix]}
  {@const submenu = submenuMap[pathprefix]}
  <nav
    class="sticky top-[47px] h-8 hidden md:flex flex-row items-end flex-wrap pl-[14px] pr-2 gap-x-3 bg-slate-50 border-b border-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:border-black"
  >
    <a
      href={submenu.href}
      title={submenu.text}
      class={clsx(
        'font-display text-sm border-b-2 border-transparent',
        path === submenu.href
          ? 'text-sky-500'
          : 'text-slate-700 hover:text-sky-500 dark:text-slate-400'
      )}
    >
      {#if submenu.icon && icons[submenu.icon]}
        <svelte:component this={icons[submenu.icon]} class="h-6 mb-[2px]" />
      {:else}
        {submenu.text}:
      {/if}
    </a>
    {#if submenu.links}
      {#each submenu.links as link}
        <a
          href={link.href}
          class={clsx(
            'font-display text-sm dark:text-sky-400 border-b-2 hover:border-orange-400',
            path.startsWith(link.href) ? 'border-orange-400' : 'border-transparent'
          )}
        >
          {link.text}
        </a>
      {/each}
    {/if}
  </nav>
{/if}
