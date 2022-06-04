/**
 * https://tailwindcss.nuxtjs.org/options
 * @default 
 * {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    config: {},
    injectPosition: 0,
    viewer: true,
  }
 */
interface TailwindConfig {
  cssPath?: string;
  configPath?: string;
  exposeConfig?: boolean;
  config?: object;
  injectPosition?: number;
  viewer?: boolean;
}

export const tailwindcss: TailwindConfig = {
  cssPath: '~/assets/css/main.css',
  viewer: false
};
