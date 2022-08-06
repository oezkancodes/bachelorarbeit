// import { writeFile } from 'fs';
import { writeFile } from 'fs';
import StoryblokClient, { StoryData } from 'storyblok-js-client';
import { NitroConfig } from 'nitropack';
import { defineNuxtModule } from '@nuxt/kit';
import { linkResolver } from '../composables/storyblok';

type Redirect = {
  to: {
    url: string;
    cached_url: string;
    linktype: 'url' | 'story';
  };
  from: {
    url: string;
    cached_url: string;
    linktype: 'url' | 'story';
  };
  status: 301 | 302;
};

export default defineNuxtModule({
  setup(_options, nuxt) {
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

      console.group('ℹ️ Redirects:');

      let _redirects = '# Redirects';
      const LN = '\n';
      const INDENT = '  ';
      redirects.forEach(({ from, to, status }) => {
        const fromUrl =
          from.linktype === 'url' ? from.url : linkResolver(from.cached_url);
        const toUrl =
          to.linktype === 'url' ? to.url : linkResolver(to.cached_url);
        console.log('   ➡️ ' + fromUrl + INDENT + toUrl + INDENT + status);
        _redirects += LN + fromUrl + INDENT + toUrl + INDENT + status;
      });

      console.groupEnd();

      // Create _redirects file
      writeFile(nitroConfig.rootDir + '/dist/_redirects', _redirects, (err) =>
        err ? console.error(err) : null
      );
    });
  }
});
