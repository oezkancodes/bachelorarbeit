<template>
  <div v-if="blok" v-editable="blok">
    <div>
      <span
        class="flex h-12 w-12 items-center justify-center rounded-md bg-white bg-opacity-10"
      >
        <StoryblokImage class="h-6 w-6" :image="blok.icon" />
      </span>
    </div>
    <div class="mt-6">
      <h3 class="text-lg font-medium text-white" v-text="blok.title" />

      <StoryblokRichText
        class="mt-2 text-base text-indigo-200"
        :text="blok.description"
      />
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
