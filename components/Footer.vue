<template>
  <footer
    v-if="data"
    id="footer"
    v-editable="data.content"
    class="bg-white"
    aria-labelledby="footer-heading"
  >
    <div class="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <div class="space-y-8 xl:col-span-1">
          <StoryblokImage :image="data.content.logo" class="h-10 w-auto" />
          <p class="text-base text-gray-500">
            {{ data.content.description }}
          </p>
          <div class="flex space-x-6">
            <FooterSocialItem
              v-for="blok in data.content.social_items"
              :key="blok._uid"
              :blok="blok"
            />
          </div>
        </div>
        <div
          class="mt-12 grid grid-cols-12 gap-6 sm:gap-12 md:gap-8 xl:col-span-2 xl:mt-0"
        >
          <FooterNavigationList
            v-for="blok in data.content.list_items"
            :key="blok._uid"
            :blok="blok"
            class="col-span-6 md:col-span-3"
          />
        </div>
      </div>
      <div class="mt-12 border-t border-gray-200 pt-8">
        <p class="text-base text-gray-400 xl:text-center">
          {{ data.content.copyright }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
  import { Story } from '~~/node_modules/storyblok-js-client/types';

  // Fetch Story
  const storyblokApi = useStoryblokApi();
  const { data } = await useAsyncData('footer', async () => {
    try {
      const res: Story = await storyblokApi.get(
        'cdn/stories/configuration/footer',
        {
          version: 'published'
        }
      );
      return res.data.story;
    } catch (err) {
      console.error(err);
      return null;
    }
  });
</script>
