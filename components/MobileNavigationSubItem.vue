<template>
  <NuxtLink
    v-if="blok"
    :to="url"
    class="flex w-full cursor-pointer items-center space-x-4 rounded-md p-3 hover:bg-gray-50"
  >
    <StoryblokImage class="h-6 w-6 flex-shrink-0" :image="blok.icon" />
    <span class="text-base font-medium text-gray-900">
      {{ blok.label }}
    </span>
  </NuxtLink>
</template>

<script setup>
  const props = defineProps({
    blok: {
      type: Object,
      required: true
    }
  });
  const url = ref('/' + linkResolver(props.blok.link.cached_url));
</script>
