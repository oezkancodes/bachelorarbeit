/**
 * Config for custom module `dynamic-routes`.
 *
 * @default
 * { excludeSlugs: [], includePaths: [] }
 */
interface DynamicRoutesConfig {
  /** Exclude slugs for `exclude_slug` field in Storyblok API.
   *  Don't use as path with slash at beginning.
   * @example ['foo', 'foo/bar']
   */
  excludeSlugs?: string[];
  /** Include paths for SSG.
   * @example ['/foo', '/foo/bar']
   */
  includePaths?: string[];
}

export const dynamicRoutes: DynamicRoutesConfig = {
  excludeSlugs: [
    'configuration/navigation',
    'configuration/footer',
    'configuration/password',
    'configuration/redirects',
    'configuration/protected-routes'
  ],
  includePaths: ['/sitemap.xml', '/404.html']
};
