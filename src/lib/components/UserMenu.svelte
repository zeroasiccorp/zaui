<script lang="ts">
  import User from '$lib/components/icons/User.svelte';
  import UserCheck from '$lib/components/icons/UserCheck.svelte';
  import { session } from '$lib/stores/session';
  import { getContext } from 'svelte';

  // https://captaincodeman.github.io/svelte-headlessui/menu
  import { createMenu } from 'svelte-headlessui';
  const menu = createMenu({ label: 'User menu' });

  // @ts-ignore
  const toggleMenu = menu.toggle;

  let appContext = getContext<App.AppContext>('appContext');

  let actions: App.MenuAction[];
  $: actions = [
    { text: 'Login', action: appContext.login ?? noop, disabled: $session?.authed },
    { text: 'Sign out', action: appContext.logout ?? noop, disabled: !$session?.authed },
  ];

  function noop() { console.error('Called login/logout before initialization of appContext by LoginDialog'); }

  // keyboard selection in menu requires on:select instead of on:click
  function onSelect(e: Event) {
    let text = (e as CustomEvent).detail.selected;
    let action = actions.find((a: any) => a.text === text);
    if (action) {
      action.action();
    }
  }
</script>

<div class="text-center relative">
  <button
    use:menu.button
    on:click={toggleMenu}
    on:select={onSelect}
    title="User Menu"
    class="py-2 mt-1 border-slate-50 dark:text-slate-200 border-b-2 border-transparent hover:border-orange-400 hover:dark:text-orange-100"
  >
    {#if $session?.authed}
      <UserCheck class="w-6 h-6" />
    {:else}
      <User class="w-6 h-6" />
    {/if}
  </button>
  <div
    use:menu.items
    class="absolute right-0 origin-top-right min-w-[200px] rounded border border-slate-300 dark:border-slate-600 divide-y divide-slate-300 dark:divide-slate-600 bg-white dark:bg-slate-900 shadow-lg {$menu.expanded
      ? ''
      : 'hidden'}"
  >
    <div class="py-2">
      {#if $session?.authed}
        <div class="text-slate-800 dark:text-slate-200">{$session?.name}</div>
        <div class="text-slate-500 dark:text-slate-200 text-sm">{$session?.email}</div>
      {:else}
        <div class="text-slate-500 dark:text-slate-200">Not logged in</div>
      {/if}
    </div>
    {#each actions as action}
      {#if !action.disabled}
        {@const active = $menu.active === action.text}
        <button
          use:menu.item
          class="group flex rounded items-center w-full px-2 py-2 dark:text-slate-200 {active
            ? 'bg-blue-500 text-white'
            : ''}">{action.text}</button
        >
      {/if}
    {/each}
  </div>
</div>
