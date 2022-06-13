<template>
  <main v-if="data">
    <!-- Layout -->
    <NuxtLayout :name="data.content.layout || 'default'">
      <!-- SEO -->
      <Head>
        <!-- Basic SEO -->
        <Title>{{ seo.title }}</Title>
        <Meta name="description" :content="seo.description" />
        <!-- OGP -->
        <Meta name="og:title" :content="seo.title" />
        <Meta name="og:description" :content="seo.description" />
        <Meta name="og:image" :content="seo.image" />
        <Meta name="og:url" :content="seo.url" />
        <Meta name="og:type" :content="seo.type" />
        <Meta name="og:locale" :content="seo.locale" />
      </Head>

      <!-- Storyblok -->
      <component :is="data.content.component" :blok="data.content" />
    </NuxtLayout>
  </main>
</template>

<script setup lang="ts">
  import { Story, StoryData } from 'storyblok-js-client';
  import { PageSEO } from '~/@types/PageSEO';

  const route = useRoute();
  const storyblokApi = useStoryblokApi();

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

  // Disable layout
  // https://v3.nuxtjs.org/guide/directory-structure/layouts#example-manual-control-with-pages
  definePageMeta({
    layout: false
  });

  // SEO
  const seo = useState<PageSEO>('seo', () => ({
    title: data.value.content.seo_title,
    description: data.value.content.seo_description,
    image: data.value.content.seo_image.filename,
    url: 'https://bachelorarbeit.thenextbit.de' + route.path,
    type: 'website',
    locale: 'de_DE'
  }));

  onMounted(() => {
    if (!data.value) return;
    // Listen for changes from Storyblok visual editor
    useStoryblokBridge(
      data.value.id,
      (evStory: StoryData) => (data.value = evStory)
    );
  });
</script>
