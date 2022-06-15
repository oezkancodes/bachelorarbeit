/**
 * Config for custom module nuxt.dynamic-routes.ts
 *
 * @default
 * {
 *   exclude: []
 * }
 */
interface DynamicRoutesConfig {
  exclude?: string[];
}

export const dynamicRoutes: DynamicRoutesConfig = {
  exclude: ['configuration/navigation', 'configuration/password']
};
