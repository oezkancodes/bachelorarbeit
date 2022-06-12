<template>
  <NuxtLink
    v-if="blok"
    :to="url"
    class="-m-4 flex items-start rounded-lg p-3 hover:bg-gray-50"
  >
    <StoryblokImage class="h-6 w-6 flex-shrink-0" :image="blok.icon" />

    <div class="ml-4">
      <p class="text-base font-medium text-gray-900">{{ blok.label }}</p>
      <p class="mt-1 text-sm text-gray-500">
        {{ blok.description }}
      </p>
    </div>
  </NuxtLink>
</template>

<script setup>
  const props = defineProps({
    blok: {
      type: Object,
      required: true
    }
  });

  const url =
    props.blok.link.linktype === 'story'
      ? '/' + linkResolver(props.blok.link.cached_url)
      : props.blok.link.cached_url;
</script>
