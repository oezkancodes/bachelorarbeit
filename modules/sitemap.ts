import { writeFile, unlink } from 'fs';
import xml from 'xml';
import StoryblokClient, { StoryData } from 'storyblok-js-client';
import { NitroConfig } from 'nitropack';
import { defineNuxtModule } from '@nuxt/kit';
import { linkResolver } from '../composables/storyblok';
import { dynamicRoutes } from '../config/dynamic-routes.config';

export default defineNuxtModule({
  meta: {
    name: 'nuxt-sitemap',
    configKey: 'nuxt-sitemap',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  /**
   * Options inspired from @nuxtjs/sitemap module
   * https://sitemap.nuxtjs.org/usage/sitemap-options/
   */
  defaults: {
    path: '/sitemap.xml',
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date()
    }
  },
  setup(options, nuxt) {
    /**
     * Build hook nitro:config is currently only a workaround,
     * because the generate:done hook is not working.
     *
     * Alternative solution for sitemap with server routes at /server/routes/sitemap.xml.ts
     */
    nuxt.hook('nitro:config', async (nitroConfig: NitroConfig) => {
      // Skip on development
      if (nitroConfig.dev) return;

      const storyblokApi = new StoryblokClient({
        accessToken: nuxt.options.runtimeConfig.public.STORYBLOK_PUBLIC_KEY
      });

      // Fetch routes from Storyblok API
      const stories: StoryData[] = await storyblokApi
        .get('cdn/stories', {
          starts_with: '',
          excluding_slugs: dynamicRoutes.exclude.join(','),
          version: 'published'
        })
        .then((res) => {
          return res.data.stories as StoryData[];
        })
        .catch((err) => {
          console.log(err);
          return [];
        });

      // Generate Sitemap
      const pages = stories.map(
        ({ content, first_published_at, published_at, full_slug }) => ({
          title: content.seo_title || '',
          created: first_published_at || '',
          lastModified: published_at || '',
          slug: linkResolver(full_slug) || ''
        })
      );

      const sitemapItems = pages.reduce(function (items, item) {
        // Build page items
        items.push({
          url: [
            {
              loc: nuxt.options.runtimeConfig.public.HOSTNAME + item.slug
            },
            {
              lastmod: new Date(item.lastModified ?? item.created)
                .toISOString()
                .split('T')[0]
            },
            { changefreq: options.defaults.changefreq },
            { priority: options.defaults.priority }
          ]
        });
        return items;
      }, []);

      const sitemapObject = {
        urlset: [
          {
            _attr: {
              xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'
            }
          },
          ...sitemapItems
        ]
      };

      const sitemap =
        '<?xml version="1.0" encoding="UTF-8"?>' + xml(sitemapObject);

      writeFile(
        // When generete:done hook is working, change output dir to /dist/...
        nuxt.options.rootDir + '/public' + options.path,
        sitemap,
        (err) => {
          if (!err) console.log('ℹ️ Created sitemap file to /public');
        }
      );
    });

    /**
     * Remove _redirects file from /public
     */
    nuxt.hook('close', () => {
      unlink(nuxt.options.rootDir + '/public/_redirects', (err) => {
        if (err) console.error(err);
      });
    });
  }
});
