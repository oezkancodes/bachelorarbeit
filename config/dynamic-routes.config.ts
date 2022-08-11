/**
 * Config for custom module `nuxt.dynamic-routes.ts`.
 *
 * @default
 * {
 *   exclude: []
 * }
 */
interface DynamicRoutesConfig {
  /** Exclude slugs for exclude_slug fields in Storyblok API.
   *  Don't use slash at beginning.
   * @example ['foo', 'foo/bar']
   */
  exclude?: string[];
  /** Include paths in SSG.
   * @example ['/foo', '/foo/bar']
   */
  include?: string[];
}

export const dynamicRoutes: DynamicRoutesConfig = {
  exclude: [
    'configuration/navigation',
    'configuration/footer',
    'configuration/password',
    'configuration/redirects',
    'configuration/protected-routes'
  ],
  include: ['/sitemap.xml', '/404.html']
};
