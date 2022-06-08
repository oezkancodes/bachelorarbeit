/**
 * Resolve links for routing.
 *
 * @param {string} path
 * @returns {string} returns path without slash on start
 */
function linkResolver(path: string): string {
  return path === 'home' ? '' : path;
}

/**
 * Resolve path from Router to Storyblok real path.
 * Read more: https://www.storyblok.com/cl/real-path-added-to-content-delivery-api
 *
 * @param {string} path
 * @returns {string}
 */
function realPathResolver(path: string): string {
  return path === '/' ? 'home' : path.substring(1);
}

export { realPathResolver, linkResolver };
