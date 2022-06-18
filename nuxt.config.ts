import { defineNuxtConfig } from 'nuxt';
import eslintPlugin from 'vite-plugin-eslint';
import svgLoader from 'vite-svg-loader';

import { storyblok } from './config/storyblok.config';
import { tailwindcss } from './config/tailwindcss.config';
import { dynamicRoutes } from './config/dynamic-routes.config';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  target: 'static',

  generate: {
    fallback: '404.html'
  },

  runtimeConfig: {
    public: {
      HOSTNAME: 'https://bachelorarbeit.thenextbit.de',
      STORYBLOK_PUBLIC_KEY: 'ph7JGalLdMBpo5QAoDrQLwtt'
    }
  },

  vite: {
    plugins: [eslintPlugin(), svgLoader()]
  },

  css: ['~/assets/css/_fonts.css'],

  modules: [
    ['@nuxtjs/tailwindcss', tailwindcss],

    // Custom Modules
    ['./modules/dynamic-routes', dynamicRoutes],
    './modules/sitemap'
  ],

  buildModules: [['@storyblok/nuxt', storyblok]]
});
