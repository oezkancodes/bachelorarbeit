<template>
  <div v-if="text" v-html="richText" />
</template>

<script setup>
  const props = defineProps({
    text: {
      type: Object,
      required: true
    }
  });

  const storyapi = useStoryblokApi();

  const richText = computed(() => {
    return storyapi.richTextResolver.render(props.text);
  });
</script>
