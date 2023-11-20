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

  // treat directories and .md extensions as page links
  // directories include paths without extensions
  if (href.match(/\/[^.]+$|\.md$/i)) {
    prefix = pageprefix;
  }

  // strip .md extension from page links
  if (href.match(/\.md$/i)) {
    href = href.replace(/\.md$/i, '');
  }

  // non-relative links are not adjusted to current page path
  if (href.startsWith('/')) return prefix + href;

  // relative links are adjusted to current page path
  return (prefix ? prefix + '/' : '') + path.replace(/[^\/]*$/, '') + href;
}
