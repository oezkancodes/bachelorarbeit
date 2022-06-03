<template>
  <img
    v-if="image && image.filename"
    :src="image.filename"
    :alt="image.alt || null"
  />
</template>

<script setup>
  defineProps({
    image: {
      type: Object,
      required: true
    }
  });
</script>
