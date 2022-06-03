<template>
  <div v-if="blok" v-editable="blok">
    <StoryblokComponent
      v-for="each_blok in blok.block"
      :key="each_blok._uid"
      :blok="each_blok"
    />
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
