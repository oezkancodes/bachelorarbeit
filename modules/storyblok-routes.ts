import { writeFile } from 'fs';
import StoryblokClient, { StoryData } from 'storyblok-js-client';
import { NitroConfig } from 'nitropack';
import { linkResolver } from '../composables/storyblok';

let ROOT_DIR: string;
let STORIES: StoryData[];

/**
 * Fetch routes from Storyblok API
 */
export default async (_inlineOptions, nuxt) => {
  await nuxt.hook('nitro:config', async (nitroConfig: NitroConfig) => {
    if (nitroConfig.dev) {
      return;
    }

    ROOT_DIR = nitroConfig.rootDir;

    // Fetch routes from Storyblok API
    const storyblokApi = new StoryblokClient({
      accessToken: process.env.STORYBLOK_ACCESS_TOKEN
    });
    const routes: string[] = await storyblokApi
      .get('cdn/stories', {
        starts_with: '',
        // Get routes in recursion when page size exceeds 100
        per_page: 100,
        // seems to be ignored from API
        excluding_slugs: '/configuration',
        version: 'published'
      })
      .then((res) => {
        STORIES = res.data.stories;
        let stories: StoryData[] = res.data.stories;
        let routes: string[] = [];
        // Filtering out stories that are not pages, as excluding_slugs isn't working
        stories = stories.filter(
          (story) => !story.full_slug.includes('configuration/')
        );
        // Map stories to accessible paths
        routes = stories.map((story) => '/' + linkResolver(story.full_slug));
        // Debug
        console.log('Routes fetched from Storyblok:');
        routes.forEach((route) => console.log('  ' + route));
        return routes;
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
    routes.forEach((path) => nitroConfig.prerender.routes.push(path));
  });

  /**
   * Netlify
   * ! generate:done currently not working
   * https://github.com/nuxt/framework/issues/4698
   */
  nuxt.hook('generate:done', () => {
    if (!ROOT_DIR || !STORIES) {
      console.error(
        "Missing rootDir or Storyblok Stories. Can't create _headers."
      );
      return;
    }

    // Constants
    const LN = '\n';
    const INDENT = '  ';

    // _headers content
    let _headers = '/protected/*';
    STORIES.forEach((story: StoryData) => {
      if (!story.content.protected) return;
      // Add data to _headers from story.content.protected
      const route = '/protected/*';
      const auth =
        'Basic-Auth: USERNAME:USER_PASSWORD SECOND_USERNAME:SECOND_USER_PASSWORD';
      _headers += route;
      _headers += LN + INDENT + auth;
    });

    // Create _headers
    writeFile(ROOT_DIR + '/dist/_headers', _headers, (err) =>
      console.error(err)
    );
  });
};
