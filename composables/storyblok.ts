import { StoryData } from 'storyblok-js-client';

/**
 * Add real paths from Storyblok here.
 * In most cases, this only applies to the homepage.
 *
 * @example { full_slug: realPath }
 */
const realPaths = {
  home: '/'
};

/**
 * Resolve real path from Storyblok to path for internal routing.
 * Returns path with slash on start.
 *
 * @example linkResolver('home') => '/'
 */
function linkResolver(full_slug: string): string {
  return realPaths[full_slug] ? realPaths[full_slug] : '/' + full_slug;
}

/**
 * Resolve `path` from Router to Storyblok `full_slug`.
 * Read more: https://www.storyblok.com/cl/real-path-added-to-content-delivery-api
 *
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
 */
function useStoryHead(story: StoryData, path: string): void {
  if (!story) return;
  const runtimeConfig = useRuntimeConfig();
  // https://v3.nuxtjs.org/guide/features/head-management#usehead-composable
  useHead({
    htmlAttrs: {
      lang: 'de'
    },
    title: story.content.seo_title,
    meta: [
      {
        name: 'description',
        content: story.content.seo_description
      },
      {
        name: 'og:title',
        content: story.content.seo_title
      },
      {
        name: 'og:description',
        content: story.content.seo_description
      },
      {
        name: 'og:image',
        content: story.content.seo_image.filename
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
