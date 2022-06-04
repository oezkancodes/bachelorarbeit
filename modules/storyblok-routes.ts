import StoryblokClient, { StoryData } from 'storyblok-js-client';
import { NitroConfig } from 'nitropack';
import { linkResolver } from '../composables/storyblok';

/**
 * Fetch routes from Storyblok API
 */
export default async (inlineOptions, nuxt) => {
  // You can do whatever you like here..
  console.log(inlineOptions.token); // `123`
  console.log(nuxt.options.dev); // `true` or `false`

  await nuxt.hook('nitro:config', async (nitroConfig: NitroConfig) => {
    if (nitroConfig.dev) {
      return;
    }

    // Fetch routes from Storyblok API
    const storyblokApi = new StoryblokClient({
      accessToken: process.env.STORYBLOK_ACCESS_TOKEN
    });
    const routes: string[] = await storyblokApi
      .get('cdn/stories', {
        starts_with: '',
        /** Get routes in recursion when page size exceeds 100 */
        per_page: 100,
        excluding_slugs: '/configuration',
        version: 'published'
      })
      .then((res) => {
        let stories: StoryData[] = res.data.stories;
        let routes: string[] = [];
        // Filtering out stories that are not pages
        stories = stories.filter(
          (story) => !story.full_slug.includes('configuration/')
        );
        // Map stories to accessible paths
        routes = stories.map((story) => '/' + linkResolver(story.full_slug));
        console.log(routes);
        return routes;
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
    routes.forEach((path) => nitroConfig.prerender.routes.push(path));
  });
};
