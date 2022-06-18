/**
 * https://github.com/storyblok/storyblok-nuxt#options
 * @default
 * {
    accessToken: "<your-access-token>",
    bridge: true,
    apiOptions: {}, // storyblok-js-client options
    useApiClient: true
  }
 */
interface StoryblokConfig {
  accessToken?: string;
  bridge?: boolean;
  /**
   * Options: https://github.com/storyblok/storyblok-js-client#class-storyblok
   */
  apiOptions?: object;
  useApiClient?: boolean;
}

export const storyblok: StoryblokConfig = {
  accessToken: process.env.STORYBLOK_PRIVATE_KEY
};
