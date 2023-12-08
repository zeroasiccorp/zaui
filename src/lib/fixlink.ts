/*** Fix links in markdown files
 * @param href - the link to fix
 * @param pageprefix - shared prefix for links other pages
 * @param path - path of the current page (without pageprefix)
 * @returns - the fixed link
 */
export function fixlink(href:string, pageprefix:string = '', path:string = '') {
  // don't fix home link / or remote links or page-internal anchors
  if (href.match(/^\/$|^#|^https?:\/\//)) return href;

  // default to file links e.g. to fetch images
  let prefix = '/files';

  // treat extensionless and .. or / or .md paths as page links
  if (href.match(/\.\.$|\/$|(\/|^)[^.]+$|\.md$/i)) {
    prefix = pageprefix;
  }

  // strip .md extension from page links
  if (href.match(/\.md$/i)) {
    href = href.replace(/\.md$/i, '');
  }

  // non-relative links or un-prefixed links are left as-is
  if (href.startsWith('/') || prefix === '') return prefix + href;

  // when there is a prefix, adjust relative link to current page path
  let url = new URL(href, 'https://example.com/' + path);
  // console.log('fixlink', path, href, '==>', prefix + url.pathname);
  return prefix + url.pathname;
}
