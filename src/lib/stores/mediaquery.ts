// https://medium.com/@ricciutipaolo/how-to-check-for-media-queries-in-svelte-with-usemediaquery-604f14190035
// These stores should only be used with svelte conditional logic as a last resort
// Where possible, it's preferable to use tailwind breakpoints
// https://tailwindcss.com/docs/screens


import { readable } from 'svelte/store';

export const mediaquery = (mediaQueryString: string) => {
  const matches = readable<boolean>(false, (set) => {
    // no window for SSR
    if (typeof window === 'undefined') {
      return () => set(true);
    }
    const m = window.matchMedia(mediaQueryString);
    set(m.matches);
    const el = (e: MediaQueryListEvent) => set(e.matches);
    m.addEventListener('change', el);
    return () => {
      m.removeEventListener('change', el);
    };
  });
  return matches;
};

export const noHover = mediaquery('(hover: none)');
export const xxl = mediaquery('(min-width: 1536px)');
export const xl = mediaquery('(min-width: 1280x)');
export const lg = mediaquery('(min-width: 1024px)');
export const md = mediaquery('(min-width: 768px)');
export const sm = mediaquery('(min-width: 640px)');
export const xs = mediaquery('(min-width: 400px)');
