import { writeFile, unlink } from 'fs';
import StoryblokClient, { StoryData } from 'storyblok-js-client';
import { NitroConfig } from 'nitropack';
import { defineNuxtModule } from '@nuxt/kit';
import { linkResolver } from '../composables/storyblok';
import { Redirect } from '~/@types/Redirect';

export default defineNuxtModule({
  meta: {
    name: 'netlify-redirects',
    configKey: 'netlifyRedirects',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },

  defaults: {},

  setup(_options, nuxt) {
    /**
     * Build hook nitro:config is currently only a workaround,
     * because the generate:done hook is not working.
     */
    nuxt.hook('nitro:config', async (nitroConfig: NitroConfig) => {
      // Skip on development
      if (nitroConfig.dev) return;

      let redirects: Redirect[] = [];

      const storyblokApi = new StoryblokClient({
        accessToken: nuxt.options.runtimeConfig.public.STORYBLOK_PUBLIC_KEY
      });
      await storyblokApi
        .get('cdn/stories/configuration/redirects', { version: 'published' })
        .then((res) => {
          const story: StoryData = res.data.story;
          redirects = story.content.redirects;
        })
        .catch((err) => {
          console.log(err);
        });

      console.group(
        redirects.length ? '❕ Redirects:' : '⚠️ No redirects found'
      );

      let _redirects = '# Redirects';
      const LN = '\n';
      const INDENT = '  ';

      redirects.forEach(({ from, to, status }) => {
        const fromUrl =
          from.linktype === 'url' ? from.url : linkResolver(from.cached_url);
        const toUrl =
          to.linktype === 'url' ? to.url : linkResolver(to.cached_url);
        console.log('  ➡️ ' + fromUrl + INDENT + toUrl + INDENT + status);
        _redirects += LN + fromUrl + INDENT + toUrl + INDENT + status;
      });

      console.groupEnd();

      // Create _redirects file
      writeFile(
        // When generete:done hook is working, change output dir to /dist/...
        nuxt.options.rootDir + '/public/_redirects',
        _redirects,
        (err) => {
          if (!err) console.log('✅ Created _redirect file to /public');
        }
      );
    });

    // Remove _redirects file from /public
    nuxt.hook('close', () => {
      unlink(nuxt.options.rootDir + '/public/_redirects', (err) => {
        if (err) console.error(err);
      });
    });
  }
});
