import type { LoadEvent } from '@sveltejs/kit';
import * as env from '$app/environment';

// https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures
export type LoadData = {
  url: string;
  [key: string]: any;
  error?: string;
  headers?: Record<string, string>;
};

/**
 * Get file or JSON data from the server
 * loader returns an object with the fetched data in an arbitrary key
 * @param url - url with host if not same origin
 * @param key - data key
 * @param evt - load event for fetch()
 * @param json - true for JSON data
 * @returns data
 */
export async function loader(
  url: string,
  key: string,
  evt: LoadEvent,
  jsonData = true

) {
  let data: LoadData = { url };
  let res;
  try {
    // don't cache local files
    // TODO: allow cache for built UI
    res = await evt.fetch(url, {cache: 'no-store'});
    // console.log('loader fetch', url, res.status);
  } catch (e: any) {
    // https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
    // since we don't capture errors on a server, just try to return a message
    if (url.endsWith('/api/mdfiles.json')) {
      data[key] = ["index.md"];
      return data;
    }
    // console.log('loader fetch error', e);
    return err({ ...data, error: `${e.message} ${url}` });
  }
  if (!res.ok) return err({ ...data, error: `${res.status} ${url}` });
  if (
    jsonData &&
    !res.headers.get('content-type')?.match(/^application\/json/i)
  ) {
    return err({
      ...data,
      headers: Object.fromEntries(res.headers),
      error: 'Response type not JSON, maybe 404.',
    });
  }
  try {
    data[key] = jsonData ? await res.json() : await res.text();
    return data;
  } catch (e: any) {
    return err({ ...data, error: `${e.message} ${url}` });
  }
}

// log data with errors to the console
// TODO: log errors to a logger
function err(w: LoadData) {
  console.error(`Loader error (browser: ${env.browser})`, w);
  return w;
}
