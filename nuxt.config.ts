import { defineNuxtConfig } from 'nuxt';
import eslintPlugin from 'vite-plugin-eslint';
import StoryblokClient, { StoryData } from 'storyblok-js-client';
import { storyblok } from './config/nuxt.storyblok.config';
import { tailwindcss } from './config/nuxt.tailwind';
import { linkResolver } from './composables/storyblok';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  target: 'static',

  vite: {
    plugins: [eslintPlugin()]
  },

  /**
   * Modules
   */
  modules: [
    ['@nuxtjs/tailwindcss', { cssPath: '~/assets/css/main.css', viewer: false }]
  ],
  buildModules: [
    ['@storyblok/nuxt', { accessToken: process.env.STORYBLOK_ACCESS_TOKEN }]
  ],

  /**
   * Configuration
   */
  tailwindcss,
  storyblok,

  hooks: {
    async 'nitro:config'(nitroConfig) {
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
          // Get routes in recursion when page size exceeds 100
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
