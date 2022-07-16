import { writeFileSync, existsSync, mkdirSync } from 'fs';
import xml from 'xml';
import StoryblokClient, { StoryData } from 'storyblok-js-client';
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
  defaults: {
    /**
     * Options inspired from @nuxtjs/sitemap module
     * https://sitemap.nuxtjs.org/usage/sitemap-options/
     */
    hostname: 'https://bachelorarbeit.thenextbit.de',
    path: '/sitemap.xml',
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date()
    }
  },
  setup(options, nuxt) {
    /**
     * ! Nuxt hook generate:done is currently not working.
     * * Workaround to generate Sitemap with server routes at /server/routes/sitemap.xml.ts
     */
    nuxt.hook('generate:done', async () => {
      const storyblokApi = new StoryblokClient({
        accessToken: process.env.STORYBLOK_PRIVATE_KEY
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
            { loc: options.hostname + item.slug },
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

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>${xml(
        sitemapObject
      )}`;

      if (!existsSync(nuxt.options.rootDir + '/dist')) {
        mkdirSync(nuxt.options.rootDir + '/dist');
      }
      writeFileSync(
        nuxt.options.rootDir + '/dist' + options.path,
        sitemap,
        'utf8'
      );
      console.log('✅ Generate Sitemap success.');
    });
  }
});
