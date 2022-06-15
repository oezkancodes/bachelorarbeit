import { defineNuxtConfig } from 'nuxt';
import eslintPlugin from 'vite-plugin-eslint';
import { storyblok } from './config/nuxt.storyblok.config';
import { tailwindcss } from './config/nuxt.tailwind';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  target: 'static',

  generate: {
    fallback: '404.html'
  },

  runtimeConfig: {
    public: {
      HOSTNAME: 'https://bachelorarbeit.thenextbit.com',
      STORYBLOK_PUBLIC_KEY: 'ph7JGalLdMBpo5QAoDrQLwtt'
    }
  },

  vite: {
    plugins: [eslintPlugin()]
  },

  css: ['~/assets/css/_fonts.css'],

  /**
   * Modules
   */
  modules: [
    /** Dependency Modules */
    '@nuxtjs/tailwindcss',

    /** Custom Modules */
    './modules/storyblok-routes',
    './modules/sitemap'
  ],
  buildModules: ['@storyblok/nuxt'],

  /**
   * Modules / Build Modules configs
   */
  tailwindcss,
  storyblok
});
