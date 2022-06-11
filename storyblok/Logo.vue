<template>
  <div
    v-if="blok"
    v-editable="blok"
    class="flex h-12 items-center justify-center"
  >
    <StoryblokImage v-if="blok" class="w-full" :image="blok.image" />
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
