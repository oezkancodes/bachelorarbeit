import { defineNuxtConfig } from 'nuxt';
import eslintPlugin from 'vite-plugin-eslint';
import { storyblok } from './config/nuxt.storyblok.config';
import { tailwindcss } from './config/nuxt.tailwind';

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
    [
      '@nuxtjs/tailwindcss',
      { cssPath: '~/assets/css/main.css', viewer: false }
    ],
    './modules/storyblok-routes'
  ],
  buildModules: [
    ['@storyblok/nuxt', { accessToken: process.env.STORYBLOK_ACCESS_TOKEN }]
  ],

  /**
   * Configuration
   */
  tailwindcss,
  storyblok
});
