<template>
  <!-- Layout -->
  <NuxtLayout :name="layout">
    <!-- SEO -->
    <Head>
      <Title>{{ story.content.seo_title }}</Title>
      <Meta name="description" :content="story.content.seo_description" />
    </Head>

    <!-- Storyblok -->
    <StoryblokComponent v-if="story" :blok="story.content" />
  </NuxtLayout>
</template>

<script setup>
  definePageMeta({
    layout: false
  });

  const route = useRoute();

  const layout = ref('default');
  const story = ref(null);

  // Fetch Story
  const res = await useStoryblok('/' + realPathResolver(route.path), {
    version: 'draft'
  });
  story.value = res.value;
  layout.value = story.value ? story.value.content.layout : layout.value;

  onMounted(() => {
    useStoryblokBridge(story.value.id, (evStory) => (story.value = evStory));
  });
</script>
