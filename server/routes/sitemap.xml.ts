import { SitemapStream, streamToPromise } from 'sitemap';
import StoryblokClient, { StoryData } from 'storyblok-js-client';
import { linkResolver } from '~/composables/storyblok';

export default defineEventHandler(async () => {
  // Fetch Stories
  const config = useRuntimeConfig();
  const storyblokApi = new StoryblokClient({
    accessToken: config.public.STORYBLOK_PUBLIC_KEY
  });
  const excluding_slugs = [
    'configuration/navigation',
    'configuration/password'
  ];
  const stories: StoryData[] = await storyblokApi
    .get('cdn/stories', {
      starts_with: '',
      excluding_slugs: excluding_slugs.join(','),
      version: 'published'
    })
    .then((res): StoryData[] => res.data.stories)
    .catch((err) => {
      console.log(err);
      return [];
    });

  // Create Sitemap
  const sitemap = new SitemapStream({
    hostname: config.public.HOSTNAME
  });
  for (const story of stories) {
    sitemap.write({
      url: linkResolver(story.full_slug),
      changefreq: 'daily',
      priority: 1
    });
  }
  sitemap.end();
  return streamToPromise(sitemap);
});
