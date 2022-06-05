<template>
  <main v-if="story">
    <!-- Layout -->
    <NuxtLayout :name="story.content.layout || 'default'">
      <!-- SEO -->
      <Head>
        <Title>{{ seo.title }}</Title>
        <Meta name="description" :content="seo.description" />
        <Meta name="og:title" :content="seo.title" />
        <Meta name="og:description" :content="seo.description" />
        <Meta v-if="seo.image" name="og:image" :content="seo.image" />
        <Meta name="og:url" :content="seo.url" />
        <Meta name="og:type" :content="seo.type" />
        <Meta name="og:locale" :content="seo.locale" />
      </Head>

      <!-- Storyblok -->
      <component :is="story.content.component" :blok="story.content" />
    </NuxtLayout>
  </main>
</template>

<script setup lang="ts">
  import { Story, StoryData } from 'storyblok-js-client';
  import { SEO } from '~/@types/SEO';

  definePageMeta({
    // https://v3.nuxtjs.org/guide/directory-structure/layouts#example-manual-control-with-pages
    layout: false
  });

  // Utils
  const storyblokApi = useStoryblokApi();
  const route = useRoute();

  // Fetch Story
  const story = ref<StoryData>(null);
  try {
    const { data }: Story = await storyblokApi.get(
      'cdn/stories/' + realPathResolver(route.path),
      {
        version: 'draft'
      }
    );
    story.value = data.story;
  } catch (err) {
    throwError(err.response.status + ' ' + err.response.statusText);
  }

  // SEO
  const seo = ref<SEO>({
    title: story.value?.content.seo_title,
    description: story.value?.content.seo_description,
    image: story.value?.content.seo_image.filename
      ? story.value.content.seo_image.filename
      : null,
    url: 'https://bachelorarbeit.netlify.app' + linkResolver(route.path),
    type: 'website',
    locale: 'de_DE'
  });

  onMounted(() => {
    if (!story.value) return;
    // Listen for changes from Storyblok visual editor
    useStoryblokBridge(story.value.id, (evStory) => (story.value = evStory));
  });
</script>
