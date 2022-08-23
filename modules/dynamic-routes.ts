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
    excludeSlugs: [],
    include: []
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
      if (
        Array.isArray(options.excludeSlugs) &&
        options.excludeSlugs.length > 0
      ) {
        apiOptions.excluding_slugs = options.excludeSlugs.join(',');
      }
      const routes: string[] = await storyblokApi
        .get('cdn/stories', apiOptions)
        .then((res) => {
          const stories: StoryData[] = res.data.stories;
          let routes: string[] = [];
          // Map stories to accessible paths
          routes = stories.map((story) => linkResolver(story.full_slug));
          printRoutes(routes, '❕ Dynamic routes:');
          return routes;
        })
        .catch(() => {
          console.error("🔴 Couldn't fetch dynamic routes.");
          return null;
        });

      // Error handling
      if (routes === null || !Array.isArray(routes)) return;

      // No dynamic routes
      if (Array.isArray(routes) && routes.length === 0) {
        console.warn('⚠️ Dynamic routes fetched, but is empty.');
      }

      // Include routes
      if (Array.isArray(options.include)) {
        options.include.forEach((path) => {
          if (typeof path !== 'string') return;
          routes.push(path);
        });
        printRoutes(options.include, '❕ Included routes:');
      }

      // Exclude slugs
      if (Array.isArray(options.excludeSlugs)) {
        printRoutes(options.excludeSlugs, '❕ Excluded slugs:');
      }

      // Inject routes for prerender
      console.group('❕ Generating routes:');
      routes.forEach((path) => {
        console.log('  📄 ' + path);
        nitroConfig.prerender.routes.push(path);
      });
      console.groupEnd();
    });
  }
});

function printRoutes(routes: string[], message: string): void {
  if (!Array.isArray(routes)) return;
  console.group();
  console.log(message);
  routes.forEach((route) => console.log('  📄 ' + route));
  console.groupEnd();
}
