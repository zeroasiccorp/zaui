<script lang="ts">
  import { page } from '$app/stores';
  import { icons } from '$lib/componentMaps';
  import { clsx } from 'clsx';

  // menu
  import Open from '$lib/components/icons/Menu.svelte';
  import Close from '$lib/components/icons/X.svelte';
  import { fade, slide } from 'svelte/transition';
  import UserMenu from '$lib/components/UserMenu.svelte';
  import NavIcon from '$lib/components/NavIcon.svelte';

  // sidebar
  import type { Sidebar } from '$lib/stores/model';
  import { createDialog } from 'svelte-headlessui';
  import { md } from '$lib/stores/mediaquery';

  import { model, type Config } from '$lib/stores/model';
  export let config: Config = {};

  let sidebar: Sidebar;
  $: sidebar = $page.data.sidebar;
  const sidebarDialog = createDialog({ label: 'Sidebar' });

  function toggleSidebar() {
    if ($sidebarDialog.expanded) {
      sidebarDialog.close();
    } else {
      sidebarDialog.open();
    }
  }

  // TODO - make consistent - pass like config via props vs $page or $model
  let submenuMap = $model?.submenuMap || {};

  let path: string;
  $: path = $page.url.pathname;

  let pathprefix: string;
  $: pathprefix = '/' + path.split('/')[1];

  let navlinks: typeof config.navlinks;
  $: navlinks = config.navlinks?.filter((link) => !link.previewOnly || config.preview);

  let docslinks: typeof config.docslinks;
  $: docslinks = config.docslinks?.filter((link) => !link.previewOnly || config.preview);

  let showNav: boolean = false;
  function toggleNav() {
    sidebarDialog.close();
    showNav = !showNav;
    try {
      scrollTo(0, 0);
    } catch (e) {}
  }
  function hideNav() {
    sidebarDialog.close();
    showNav = false;
  }
</script>

<nav class="sticky top-0 z-20">
  <div
    class="flex flex-row justify-between px-4 bg-slate-50 border-b border-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:border-black"
  >
    <a
      href="/"
      title="Home"
      on:click={hideNav}
      class="order-2 pt-3 pb-2 border-b-2 border-transparent hover:border-orange-400"
    >
      <NavIcon icon={config.icon} textclass="font-logo leading-none tracking-widest font-medium text-2xl" imageclass="h-[24px]" />
    </a>
    {#if navlinks?.length}
      {#if config.mobilemenu}
        <button
          title="Toggle main menu"
          on:click={toggleNav}
          aria-label="Menu"
          class="md:hidden order-1 mt-2 pb-1 border-b-2 border-transparent hover:border-orange-400"
        >
          {#if showNav}
            <Close class="w-8 h-8" />
          {:else}
            <Open class="w-8 h-8" />
          {/if}
        </button>
      {/if}

      <div class={clsx((config.mobilemenu ? 'hidden md:flex' : 'flex'), 'order-3 flex-grow justify-end items-end')}>
        {#each navlinks as link}
          <a
            href={link.href}
            title={link.icon ? link.text ?? link.href : ''}
            class={clsx(
              'mb-2 ml-4 font-display text-sm text-slate-600 hover:text-slate-900 dark:text-sky-500 dark:hover:text-sky-400',
              'border-b-2 hover:border-orange-400',
              path.startsWith(link.href) ? 'border-orange-400' : 'border-transparent'
            )}
          >
            {#if link.icon}
              <NavIcon icon={link.icon} imageclass="h-5 w-5 mb-1" />
            {:else}
              {link.text ?? link.href}
            {/if}
          </a>
        {/each}
      </div>
      {#if config.usermenu}
        <div class="order-4 ml-4">
          <UserMenu />
        </div>
      {/if}
    {/if}
  </div>

  {#if submenuMap[pathprefix]}
    {@const submenu = submenuMap[pathprefix]}
    <div
      class="h-8 hidden md:flex flex-row items-end flex-wrap pl-[14px] pr-2 gap-x-3 bg-slate-50 border-b border-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:border-black"
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
        {#if submenu.icon}
          <NavIcon icon={submenu.icon} imageclass="h-6 mb-[2px]" />
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
    </div>
  {/if}
</nav>

{#if config.usermenu && showNav && navlinks?.length}
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

{#if sidebar}
  {#if !$md}
    <button
      class="fixed top-16 right-4 z-20 p-2 rounded-full bg-orange-500 text-white shadow-lg hover:bg-orange-600"
      on:click={toggleSidebar}
    >
      <span class="sr-only">Toggle sidebar</span>
      <svelte:component
        this={$sidebarDialog.expanded ? icons.X : icons.Menu}
        class="h-6 w-6"
        aria-hidden="true"
      />
    </button>
  {/if}
  {#if $md || $sidebarDialog.expanded}
    <div class="relative z-10">
      <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
      <div
        class="md:hidden fixed inset-0 opacity-70 bg-slate-200 dark:bg-slate-600 cursor-pointer"
        transition:fade={{ duration: 200 }}
        on:click={sidebarDialog.close}
        aria-hidden="true"
      />
      <div
        class="fixed inset-y-0 w-60 px-6 pt-12 overflow-y-auto bg-slate-50 dark:bg-slate-900 text-sm leading-6"
        transition:slide={{ duration: 200, axis: 'x' }}
      >
        <nav class="pt-8">
          {#each sidebar.sections as section}
            <h2 class="font-display font-medium text-slate-900 dark:text-white">
              {section.text}
            </h2>
            <ul class="my-4 border-l-2 border-slate-200 dark:border-slate-800">
              {#each section.links as link}
                <li class="relative">
                  <a
                    href={link.href}
                    on:click={sidebarDialog.close}
                    class={clsx(
                      'block w-full pl-4 py-1 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 hover:font-semibold',
                      path === link.href
                        ? 'font-semibold text-orange-500'
                        : 'text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300'
                    )}
                  >
                    {link.text}
                  </a>
                </li>
              {/each}
            </ul>
          {/each}
        </nav>
      </div>
    </div>
  {/if}
{/if}
