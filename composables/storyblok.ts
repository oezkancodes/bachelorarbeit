/**
 * Resolve links for routing.
 *
 * @param {string} path
 * @returns {string} returns path without slash on start
 */
function linkResolver(path) {
  return path === 'home' ? '' : path;
}

/**
 * Resolve path to real path.
 * Read more: https://www.storyblok.com/cl/real-path-added-to-content-delivery-api
 *
 * @param {string} path
 * @returns {string}
 */
function realPathResolver(path) {
  return path === '/' ? 'home' : path;
}

export { realPathResolver, linkResolver };
