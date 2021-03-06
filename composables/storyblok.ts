import { StoryData } from 'storyblok-js-client';

/**
 * Add real paths from Storyblok here.
 * In most cases, this only applies to the homepage.
 *
 * @example
 * {
 *   full_slug: realPath
 * }
 */
const realPaths = {
  home: '/'
};

/**
 * Resolve links for internal routing.
 *
 * @param {string} full_slug
 * @returns {string} returns path without slash on start
 */
function linkResolver(full_slug: string): string {
  return realPaths[full_slug] ? realPaths[full_slug] : '/' + full_slug;
}

/**
 * Resolve path from Router to Storyblok full_slug.
 * Read more: https://www.storyblok.com/cl/real-path-added-to-content-delivery-api
 *
 * @param {string} path
 * @returns {string}
 * @example realPathResolver('/') => 'home'
 */
function realPathResolver(path: string): string {
  let realPath = path;
  for (const [key, value] of Object.entries(realPaths)) {
    if (value !== path) continue;
    realPath = key;
  }
  return realPath;
}

/**
 * Implement page SEO from Storyblok Story Data.
 *
 * @param {StoryData} data
 * @param {string} path
 */
function useStoryHead(data: StoryData, path: string): void {
  if (!data) return;
  const runtimeConfig = useRuntimeConfig();
  // https://v3.nuxtjs.org/guide/features/head-management#usehead-composable
  useHead({
    htmlAttrs: {
      lang: 'de'
    },
    title: data.content.seo_title,
    meta: [
      {
        name: 'description',
        content: data.content.seo_description
      },
      {
        name: 'og:title',
        content: data.content.seo_title
      },
      {
        name: 'og:description',
        content: data.content.seo_description
      },
      {
        name: 'og:image',
        content: data.content.seo_image.filename
      },
      {
        name: 'og:url',
        content: runtimeConfig.public.HOSTNAME + path
      },
      {
        name: 'og:type',
        content: 'website'
      },
      {
        name: 'og:locale',
        content: 'de_DE'
      }
    ]
  });
}

export { realPathResolver, linkResolver, useStoryHead };
