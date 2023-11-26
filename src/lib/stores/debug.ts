import { writable } from 'svelte/store';

interface Debug {
  [key: string]: boolean;
}

/* show/hide debug info for specific modules*/
export const debug = writable<Debug>({});
