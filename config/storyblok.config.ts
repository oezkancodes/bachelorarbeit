/**
 * https://github.com/storyblok/storyblok-nuxt#options
 * @default
 * {
    accessToken: '<your-access-token>',
    bridge: true,
    apiOptions: {}, // storyblok-js-client options
    useApiClient: true
  }
 */
interface StoryblokConfig {
  accessToken?: string;
  bridge?: boolean;
  /** Options: https://github.com/storyblok/storyblok-js-client#class-storyblok */
  apiOptions?: object;
  useApiClient?: boolean;
}

/** Storyblok public api key. */
export const storyblokPublicKey = 'ph7JGalLdMBpo5QAoDrQLwtt';

/** Storyblok module config. */
export const storyblok: StoryblokConfig = {
  accessToken: process.env.STORYBLOK_PRIVATE_KEY || storyblokPublicKey
};
