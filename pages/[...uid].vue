<template>
  <main>
    <!-- Layout -->
    <NuxtLayout :name="layout">
      <!-- SEO -->
      <Head>
        <Title>{{ story.content.seo_title }}</Title>
        <Meta name="description" :content="story.content.seo_description" />
      </Head>

      <!-- Storyblok -->
      <component
        :is="story.content.component"
        v-if="story"
        :blok="story.content"
      />
    </NuxtLayout>
  </main>
</template>

<script setup>
  definePageMeta({
    // https://v3.nuxtjs.org/guide/directory-structure/layouts#example-manual-control-with-pages
    layout: false
  });

  const route = useRoute();

  const story = ref(null);
  const layout = computed(() =>
    !story ? 'default' : story.value.content.layout
  );

  // Fetch Story
  const res = await useStoryblok('/' + realPathResolver(route.path), {
    version: 'draft'
  });
  story.value = res.value;

  onMounted(() => {
    // Listen for changes from Storyblok visual editor
    useStoryblokBridge(story.value.id, (evStory) => (story.value = evStory));
  });
</script>
