// https://kit.svelte.dev/docs/hooks
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event, {
    filterSerializedResponseHeaders: () => true
  });

  return response;
};
