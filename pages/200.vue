<template>
  <main>
    <template v-if="!data">
      <div class="flex h-screen w-full items-center justify-center">
        <h1
          class="animate-pulse text-4xl font-extrabold tracking-tight text-indigo-600 sm:text-5xl"
        >
          Lade Preview...
        </h1>
      </div>
    </template>
    <template v-else>
      <!-- Layout -->
      <NuxtLayout :name="data.content.layout || 'default'">
        <!-- Storyblok -->
        <component :is="data.content.component" :blok="data.content" />
      </NuxtLayout>
    </template>
  </main>
</template>

<script setup lang="ts">
  import { Story, StoryData } from 'storyblok-js-client';

  definePageMeta({
    layout: false
  });

  const route = useRoute();
  const data = ref<StoryData>(null);

  onMounted(async () => {
    const id = route.query._storyblok;
    if (!id) return;
    // Handle Story
    const storyblokApi = useStoryblokApi();
    const res: Story = await storyblokApi.get('cdn/stories/' + id, {
      version: 'draft'
    });
    data.value = res.data.story;
    // SEO
    useStoryHead(data.value, '/' + data.value.full_slug);
    // Listen for changes from Storyblok visual editor
    useStoryblokBridge(
      data.value.id,
      (evStory: StoryData) => (data.value = evStory)
    );
  });
</script>
