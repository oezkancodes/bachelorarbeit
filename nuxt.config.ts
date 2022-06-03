import { defineNuxtConfig } from 'nuxt';
import eslintPlugin from 'vite-plugin-eslint';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  target: 'static',
  vite: {
    plugins: [eslintPlugin()]
  },
  modules: [
    ['@nuxtjs/tailwindcss', { cssPath: '~/assets/css/main.css', viewer: false }]
  ],
  buildModules: [
    ['@storyblok/nuxt', { accessToken: process.env.STORYBLOK_ACCESS_TOKEN }]
  ],
  generate: {
    /**
     * TODO: fetch routes from Storyblok API
     */
    routes: ['/', '/services']
  }
});
