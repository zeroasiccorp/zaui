<script lang="ts">
  import { createDialog } from 'svelte-headlessui';
  import { scale } from 'svelte/transition';
  import { getContext, onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { page } from '$app/stores';

  import appConfig from '$appconfig/pub.config'
  import { user, token, session, sessionLoaded, type Session, type Log } from '$lib/stores/session';

  import XIcon from '$lib/components/icons/X.svelte';

  const authCientID = appConfig.auth?.clientID ?? '';
  const authEndpoint = appConfig.auth?.endpoint ?? '';

  const loginDialog = createDialog({ label: 'Login' });

  let path: string;
  $: path = $page.url.pathname;

  function login() {
    // workaround for keyboard events handler in svelte-headlessui
    setTimeout(() => {
      loginDialog.open();
    }, 0);
  }

  $sessionLoaded = false;
  async function getSession() {
    const jwt = $session?.jwt;
    try {
      let resp = await fetch(authEndpoint + '/session', {
        headers: {
          'x-za-session': jwt || '',
          'x-za-page': path || '',
        }
      });
      const sn: Session = await resp.json();
      if (sn.authed) {
        $user = sn?.email;
        $token = sn?.jwt;
      }
      $session = sn;
      $sessionLoaded = true;
    } catch (e) {
      $sessionLoaded = true;
    }
  }

  // Check for session on any full page load
  onMount(getSession);

  async function loginWithLinkedIn() {
    if (!$session?.sid) {
      error('loginWithLinkedIn no session');
      return;
    }
    await saveSession();
    let href =
      `https://www.linkedin.com/oauth/v2/authorization` +
      `?response_type=code` +
      `&client_id=${authCientID}` +
      `&redirect_uri=${authEndpoint + '/li/callback'}` +
      `&state=${$session?.sid}` +
      `&scope=openid%20email%20profile`;
    window.location.href = href;
  }

  async function logout() {
    $user = '';
    $token = '';
    $session.authed = false;
    log('logout');
    await saveSession(true);
  }

  // save session log and optionally logout
  // this is fire and forget, no need to wait for the response
  async function saveSession(logout = false) {
    if (!$session?.jwt || !$session?.log?.length) return;
    const data: { log: Log[]; logout?: boolean } = { log: $session?.log };
    if (logout) {
      data.logout = true;
    }
    try {
      await fetch(authEndpoint + '/session', {
        method: 'POST',
        headers: {
          'x-za-session': $session?.jwt || '',
          'x-za-page': path || ''
        },
        body: JSON.stringify(data)
      });
    } catch (e) {
      error('saveSession ' + e);
    }
  }

  // save session log when the users minimize or naviagte away from the page
  // https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilitychange_event
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event
  // Chrome will cancel running fetches on nav, so this is not reliable
  // TODO: implement using onbeforeunload
  // if (browser) {
  //   document.addEventListener('visibilitychange', async () => {
  //     console.log('visibilitychange', document.visibilityState);
  //     if (document.visibilityState === 'hidden') {
  //       await saveSession();
  //     }
  //   });
  // }

  // track page navigation in the session log
  let currentPage = '';
  page.subscribe((v: any) => {
    let newPage = v?.url?.pathname || '';
    if (browser && newPage && newPage !== currentPage) {
      let oldPage = currentPage;
      currentPage = newPage;
      // avoid logging a nav right after the first get
      // (for chrome) save on nav since detecting page reload is not reliable.
      if (oldPage) {
        log('nav');
        saveSession();
      }
    }
  });

  // append a log entry to the end of session.log
  function log(msg: string) {
    session.update((s) => {
      if (!s || !msg) return s;
      if (!Array.isArray(s.log)) {
        s.log = [];
      }
      s.log.push({ ts: new Date().valueOf(), pg: currentPage, msg });
      return s;
    });
  }

  function error(msg: string) {
    log('Error ' + msg);
  }

  const appContext: App.AppContext = getContext('appContext');
  appContext.log = log;
  appContext.error = error;
  appContext.loginWithLinkedIn = loginWithLinkedIn;
  appContext.logout = logout;
  appContext.login = login;
</script>

<div class="relative z-30">
  {#if $loginDialog.expanded}
    <div
      class="fixed inset-0 overflow-y-auto bg-slate-800/40 backdrop-blur-lg"
      transition:scale={{ duration: 200, start: 0.9 }}
    >
      <div class="flex min-h-full items-center justify-center p-4 text-center">
        <div
          class="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl"
          use:loginDialog.modal
        >
          <button
            class="absolute top-8 right-8 w-6 h-6 border rounded hover:bg-slate-600 hover:text-white"
            on:click={loginDialog.close}
            title="Close"><XIcon /></button
          >
          <h3 class="text-2xl font-medium leading-6 text-gray-900">Login</h3>
          <div class="mt-4">
            <p class="text-gray-700">To run your emulation, please sign in with LinkedIn.</p>
          </div>
          <div class="mt-6">
            <button
              class="bg-sky-600 hover:bg-sky-500 shadow-md text-white font-semibold rounded py-2 px-4"
              on:click={loginWithLinkedIn}
              >Login with LinkedIn
            </button>
            <p class="mt-8 text-gray-700 text-sm">
              Your LinkedIn account will be used for authentication purposes only. For full Zero
              ASIC terms, see our
              <a class="underline" on:click={loginDialog.close} href="/terms">Terms</a> and
              <a class="underline" on:click={loginDialog.close} href="/privacy">Privacy policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
