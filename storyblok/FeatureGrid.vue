<template>
  <div v-if="blok" v-editable="blok" class="bg-indigo-700">
    <div
      class="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:pt-20 sm:pb-24 lg:max-w-7xl lg:px-8 lg:pt-24"
    >
      <h2
        class="text-3xl font-extrabold tracking-tight text-white"
        v-text="blok.title"
      />
      <StoryblokRichText
        class="mt-4 max-w-3xl text-lg text-indigo-200"
        :text="blok.description"
      />
      <div
        class="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16"
      >
        <Feature
          v-for="feature_blok in blok.features"
          :key="feature_blok._uid"
          :blok="feature_blok"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    blok: {
      type: Object,
      required: true
    }
  });
</script>
