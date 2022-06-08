import StoryblokClient, { StoryData } from 'storyblok-js-client';
import { NitroConfig } from 'nitropack';
import { defineNuxtModule } from '@nuxt/kit';
import { linkResolver } from '../composables/storyblok';

// https://v3.nuxtjs.org/guide/going-further/modules#module-author-guide
export default defineNuxtModule({
  meta: {
    name: 'nuxt-storyblok',
    configKey: 'nuxt-storyblok',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  defaults: {},
  hooks: {
    /**
     * Fetch dynamic routes from Storyblok API
     */
    'nitro:config': async (nitroConfig: NitroConfig) => {
      if (nitroConfig.dev) {
        return;
      }

      const storyblokApi = new StoryblokClient({
        accessToken: process.env.STORYBLOK_ACCESS_TOKEN
      });

      // Fetch routes from Storyblok API
      const routes: string[] = await storyblokApi
        .get('cdn/stories', {
          starts_with: '',
          // Get routes in recursion when page size exceeds 100
          per_page: 100,
          // excluding_routes seems to be ignored
          excluding_slugs: '/configuration',
          version: 'published'
        })
        .then((res) => {
          let stories: StoryData[] = res.data.stories;
          let routes: string[] = [];
          // Filtering out stories that are not pages, as excluding_routes doesn't work
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
    }
  }
});
