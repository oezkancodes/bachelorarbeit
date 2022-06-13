import { StoryData } from 'storyblok-js-client';

/**
 * Resolve links for routing.
 *
 * @param {string} path
 * @returns {string} returns path without slash on start
 */
function linkResolver(path: string): string {
  return path === 'home' ? '' : path;
}

/**
 * Resolve path from Router to Storyblok real path.
 * Read more: https://www.storyblok.com/cl/real-path-added-to-content-delivery-api
 *
 * @param {string} path
 * @returns {string}
 */
function realPathResolver(path: string): string {
  return path === '/' ? 'home' : path.substring(1);
}

/**
 * Implement page SEO from Storyblok Story Data.
 *
 * @param {StoryData} data
 * @param {string} slug
 */
function useStoryHead(data: StoryData, slug: string): void {
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
        content: 'https://bachelorarbeit.thenextbit.de' + realPathResolver(slug)
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
