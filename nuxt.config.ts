import { defineNuxtConfig } from 'nuxt';
import eslintPlugin from 'vite-plugin-eslint';
import { storyblok } from './config/nuxt.storyblok.config';
import { tailwindcss } from './config/nuxt.tailwind';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  target: 'static',

  generate: {
    fallback: true
  },

  vite: {
    plugins: [eslintPlugin()]
  },

  /**
   * Modules
   */
  modules: [
    /** Dependency Modules */
    '@nuxtjs/tailwindcss',

    /** Custom Modules */
    './modules/storyblok-routes'
  ],
  buildModules: ['@storyblok/nuxt'],

  /**
   * Configuration
   */
  tailwindcss,
  storyblok
});
