import { defineNuxtConfig } from 'nuxt';
import eslintPlugin from 'vite-plugin-eslint';
import svgLoader from 'vite-svg-loader';

import { storyblok, storyblokPublicKey } from './config/storyblok.config';
import { tailwindcss } from './config/tailwindcss.config';
import { dynamicRoutes } from './config/dynamic-routes.config';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  target: 'static',

  runtimeConfig: {
    public: {
      HOSTNAME: 'https://bachelorarbeit.thenextbit.de',
      STORYBLOK_PUBLIC_KEY: storyblokPublicKey
    }
  },

  vite: {
    plugins: [eslintPlugin(), svgLoader()]
  },

  css: ['~/assets/css/_fonts.css'],

  modules: [
    ['@nuxtjs/tailwindcss', tailwindcss],

    // Custom Modules
    ['./modules/dynamic-routes.module', dynamicRoutes],
    './modules/netlify-redirects.module',
    './modules/netlify-password-protection.module'
    // Sitemap module disabled because alternative solution with server routes is used
    // './modules/sitemap',
  ],

  buildModules: [['@storyblok/nuxt', storyblok]]
});
