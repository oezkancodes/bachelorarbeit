<template>
  <main v-if="story">
    <!-- Layout -->
    <NuxtLayout :name="story.content.layout || 'default'">
      <!-- SEO with Meta Components -->
      <Head>
        <Title>{{ seo.title }}</Title>
        <Meta name="description" :content="seo.description" />
        <Meta name="og:title" :content="seo.title" />
        <Meta name="og:description" :content="seo.description" />
        <Meta name="og:image" :content="seo.image" />
        <Meta name="og:url" :content="seo.url" />
        <Meta name="og:type" :content="seo.type" />
        <Meta name="og:locale" :content="seo.locale" />
      </Head>

      <!-- Bloks -->
      <component :is="story.content.component" :blok="story.content" />
    </NuxtLayout>
  </main>
</template>

<script setup lang="ts">
  import { Story, StoryData } from 'storyblok-js-client';
  import { PageSEO } from '~/@types/PageSEO';

  const route = useRoute();
  const storyblokApi = useStoryblokApi();
  const runtimeConfig = useRuntimeConfig();

  // Fetch Story
  const { data: story, error } = await useAsyncData(route.path, async () => {
    const res: Story = await storyblokApi.get(
      'cdn/stories/' + realPathResolver(route.path),
      {
        version: 'published'
      }
    );
    return res.data.story;
  });

  if (error.value) {
    throwError('Story not found');
  }

  // Handle Storyblok Live Editor
  if (route.query._storyblok) {
    // Fetch preview from API
    const { data } = await useFetch(
      '/api/storyblok-preview?real_path=' + realPathResolver(route.path)
    );
    // Update story
    story.value = data.value as StoryData;
  }

  /**
   * Disable layout for manual control.
   * https://v3.nuxtjs.org/guide/directory-structure/layouts#example-manual-control-with-pages
   */
  definePageMeta({
    layout: false
  });

  /**
   * For SEO use the custom useStoryHead composable, which is based on the useHead composable.
   * Or use the Meta Components inside the template. The related data is stored in seo as ref.
   * https://v3.nuxtjs.org/guide/features/head-management
   */
  const seo = ref<PageSEO>({
    title: story.value.content.seo_title,
    description: story.value.content.seo_description,
    image: story.value.content.seo_image.filename,
    url: runtimeConfig.public.HOSTNAME + route.path,
    type: 'website',
    locale: 'de_DE'
  });

  onMounted(() => {
    if (!story.value) return;
    // Listen for changes from Storybloks visual editor
    useStoryblokBridge(
      story.value.id,
      (evStory: StoryData) => (story.value = evStory)
    );
  });
</script>
