import StoryblokClient, { StoryData } from 'storyblok-js-client';
import { NitroConfig } from 'nitropack';
import { defineNuxtModule } from '@nuxt/kit';
import { linkResolver } from '../composables/storyblok';

export default defineNuxtModule({
  meta: {
    name: 'nuxt-storyblok',
    configKey: 'nuxt-storyblok',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  defaults: {},
  hooks: {},
  setup(_options, nuxt) {
    nuxt.hook('nitro:config', async (nitroConfig: NitroConfig) => {
      // Skip on development
      if (nitroConfig.dev) return;

      const storyblokApi = new StoryblokClient({
        accessToken: process.env.STORYBLOK_ACCESS_TOKEN
      });

      // Fetch routes from Storyblok API
      const routes: string[] = await storyblokApi
        .get('cdn/stories', {
          starts_with: '',
          per_page: 100, // Get stories in recursion when story size exceeds 100
          excluding_slugs: '/configuration', // excluding_routes seems to be ignored
          version: 'published'
        })
        .then((res) => {
          let stories: StoryData[] = res.data.stories;
          let routes: string[] = [];
          // Filtering out stories that are not pages, as excluding_routes doesn't work
          stories = stories.filter(
            ({ full_slug }) => !full_slug.includes('configuration/')
          );
          // Map stories to accessible paths
          routes = stories.map((story) => '/' + linkResolver(story.full_slug));
          console.log('✅ Dynamic routes found and ready for SSG:');
          routes.forEach((route) => console.log('   📄 ' + route));
          return routes;
        })
        .catch((err) => {
          console.log(err);
          return [];
        });

      if (!routes) {
        console.warn('⚠️ No dynamic routes found.');
        return;
      }

      // Inject routes
      routes.forEach((path) => nitroConfig.prerender.routes.push(path));
    });
  }
});
