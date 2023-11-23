import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Log = {
  ts: number;
  pg: string;
  msg: string;
};

export type Session = {
  jwt: string;
  sid: string;
  authed: boolean;
  name: string;
  email: string;
  log?: Log[];
  olog?: object;
};

// https://dev.to/danawoodman/svelte-quick-tip-connect-a-store-to-local-storage-4idi
const LSID = 'ZeroASIC';
let initial: Session | undefined;

if (browser) {
  initial = parse(localStorage.getItem(LSID));
}

export const session = writable<Session>(initial);
export const sessionLoaded = writable<boolean>(false);

// $token and $user are set by authenticating - see LoginDialog.svelte
export const token = writable<string>('');
export const user = writable<string>('');

// update or remove session in localstorage when it changes
session.subscribe((value) => {
  if (browser) {
    let str = stringify(value);
    if (str) {
      localStorage.setItem(LSID, str);
    } else {
      localStorage.removeItem(LSID);
    }
  }
});

function parse(v: any) {
  try {
    return JSON.parse(v);
  } catch (e) {}
  return undefined;
}

function stringify(v: any) {
  try {
    return JSON.stringify(v);
  } catch (e) {}
  return undefined;
}
