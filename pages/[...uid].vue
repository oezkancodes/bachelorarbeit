<template>
  <main v-if="data">
    <!-- Layout -->
    <NuxtLayout :name="data.content.layout || 'default'">
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
      <component :is="data.content.component" :blok="data.content" />
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
  const { data, error } = await useAsyncData(route.path, async () => {
    const res: Story = await storyblokApi.get(
      'cdn/stories/' + realPathResolver(route.path),
      {
        version: 'draft'
      }
    );
    return res.data.story;
  });

  if (error.value) {
    throwError('Story not found');
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
    title: data.value.content.seo_title,
    description: data.value.content.seo_description,
    image: data.value.content.seo_image.filename,
    url: runtimeConfig.public.HOSTNAME + route.path,
    type: 'website',
    locale: 'de_DE'
  });

  onMounted(() => {
    if (!data.value) return;
    // Listen for changes from Storybloks visual editor
    useStoryblokBridge(
      data.value.id,
      (evStory: StoryData) => (data.value = evStory)
    );
  });
</script>
