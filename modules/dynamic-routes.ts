import StoryblokClient, { StoryData } from 'storyblok-js-client';
import { NitroConfig } from 'nitropack';
import { defineNuxtModule } from '@nuxt/kit';
import { linkResolver } from '../composables/storyblok';

interface ApiOptions {
  starts_with?: string;
  per_page?: number;
  excluding_slugs?: string;
  version?: string;
}

export default defineNuxtModule({
  meta: {
    name: 'dynamic-routes',
    configKey: 'dynamicRoutes',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },

  defaults: {
    exclude: []
  },

  setup(options, nuxt) {
    nuxt.hook('nitro:config', async (nitroConfig: NitroConfig) => {
      // Skip on development
      if (nitroConfig.dev) return;

      // Fetch routes from Storyblok API
      const storyblokApi = new StoryblokClient({
        accessToken: nuxt.options.runtimeConfig.public.STORYBLOK_PUBLIC_KEY
      });
      const apiOptions: ApiOptions = {
        starts_with: '',
        version: 'published'
      };
      if (Array.isArray(options.exclude) && options.exclude.length > 0) {
        apiOptions.excluding_slugs = options.exclude.join(',');
      }
      const routes: string[] = await storyblokApi
        .get('cdn/stories', apiOptions)
        .then((res) => {
          const stories: StoryData[] = res.data.stories;
          let routes: string[] = [];
          // Map stories to accessible paths
          routes = stories.map((story) => '/' + linkResolver(story.full_slug));
          printRoutesSuccess(routes);
          return routes;
        })
        .catch(() => {
          console.error("🔴 Couldn't fetch dynamic routes.");
          return null;
        });
      // Error handling
      if (routes === null || !Array.isArray(routes)) return;
      // Empty Array
      if (Array.isArray(routes) && routes.length === 0) {
        console.warn('⚠️ Dynamic routes fetched, but empty.');
      }
      // Inject routes for prerender
      routes.forEach((path) => nitroConfig.prerender.routes.push(path));
    });
  }
});

function printRoutesSuccess(routes: string[]): void {
  if (!Array.isArray(routes)) return;
  console.group();
  console.log('✅ Dynamic routes found and ready for SSG:');
  routes.forEach((route) => console.log('   📄 ' + route));
  console.groupEnd();
}
