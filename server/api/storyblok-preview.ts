import StoryblokClient, { StoryData } from 'storyblok-js-client';

export default defineEventHandler(async (event) => {
  const query = useQuery(event);

  // Fetch Stories
  const storyblokApi = new StoryblokClient({
    accessToken: process.env.STORYBLOK_PRIVATE_KEY
  });

  let story: StoryData = null;

  await storyblokApi
    .get('cdn/stories/' + query.real_path, {
      version: 'draft'
    })
    .then((res) => {
      story = res.data.story;
    })
    .catch((err) => {
      console.error(err);
    });

  return story;
});
