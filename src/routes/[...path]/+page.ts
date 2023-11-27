// Throw missing page errors here, since root layout.ts errors do not get passed into +error.svelte

import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load = (async ({ parent, url }) => {
  let data = await parent();
  let content = data?.content;
  let navlinks = data?.config?.navlinks;
  let preview = data?.config?.preview;
  // console.log('page load', url.pathname, navlinks, preview)
  if (
    // force 404 for pages with no markdown and no navlinks
    !content &&
    !navlinks?.find(
      (link) => link.href === url.pathname && (!link.previewOnly || (link.previewOnly && preview))
    ) &&
    !['/_debug','/_icons'].includes(url.pathname)
  ) {
    throw error(404, { message: `${url} could not be found. Please check the URL` });
  }
  return {};
}) satisfies PageLoad;
