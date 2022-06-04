<template>
  <!-- Page -->
  <main>
    <!-- Layout -->
    <NuxtLayout :name="layout">
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
  const res = await useStoryblok(realPathResolver(route.path), {
    version: 'draft'
  });
  story.value = res.value;

  // SEO
  const seo = {
    title: story.value.content.seo_title,
    description: story.value.content.seo_description,
    image: story.value.content.seo_image.filename
      ? story.value.content.seo_image.filename
      : null,
    url: 'https://bachelorarbeit.netlify.app' + linkResolver(route.path),
    type: 'website',
    locale: 'de_DE'
  };

  onMounted(() => {
    // Listen for changes from Storyblok visual editor
    useStoryblokBridge(story.value.id, (evStory) => (story.value = evStory));
  });
</script>
