<template>
  <div
    v-if="blok"
    v-editable="blok"
    class="h-12 flex items-center justify-center"
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
