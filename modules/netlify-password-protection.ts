// import { writeFile } from 'fs';
import { writeFile, unlink } from 'fs';
import StoryblokClient, { StoryData } from 'storyblok-js-client';
import { NitroConfig } from 'nitropack';
import { defineNuxtModule } from '@nuxt/kit';
import { linkResolver } from '../composables/storyblok';
import { ProtectedRoute } from '~/@types/ProtectedRoute';

export default defineNuxtModule({
  setup(_options, nuxt) {
    /**
     * Build hook nitro:config is currently only a workaround,
     * because the generate:done hook is not working.
     */
    nuxt.hook('nitro:config', async (nitroConfig: NitroConfig) => {
      // Skip on development
      if (nitroConfig.dev) return;

      let protectedRoutes: ProtectedRoute[] = [];

      const storyblokApi = new StoryblokClient({
        accessToken: nuxt.options.runtimeConfig.public.STORYBLOK_PUBLIC_KEY
      });
      await storyblokApi
        .get('cdn/stories/configuration/protected-routes', {
          version: 'published'
        })
        .then((res) => {
          const story: StoryData = res.data.story;
          protectedRoutes = story.content.protected_routes;
        })
        .catch((err) => {
          console.log(err);
        });

      console.group('ℹ️ Protected Routes:');

      const LN = '\n';
      const INDENT = '  ';
      const PREFIX = 'Basic-Auth: ';

      let _headers = '# Password Protection';

      protectedRoutes.forEach(({ username, password, route }) => {
        const routeUrl =
          route.linktype === 'url' ? route.url : linkResolver(route.cached_url);
        console.log('   🔐 ' + routeUrl + INDENT + username);
        _headers += LN + routeUrl;
        _headers += LN + INDENT + PREFIX + username + ':' + password;
      });

      console.groupEnd();

      // Create _headers file
      writeFile(
        // When generete:done hook is working, change output dir to /dist/...
        nuxt.options.rootDir + '/public/_headers',
        _headers,
        (err) => {
          if (!err) console.log('ℹ️ Created _redirect file to /public');
        }
      );
    });

    /**
     * Remove _headers file from /public
     */
    nuxt.hook('close', () => {
      unlink(nuxt.options.rootDir + '/public/_headers', (err) => {
        if (err) console.error(err);
      });
    });
  }
});
