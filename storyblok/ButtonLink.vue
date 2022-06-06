<template>
  <NuxtLink
    v-if="blok"
    class="inline-flex cursor-pointer items-center rounded-md border border-transparent px-6 py-3 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
    :class="[
      {
        'bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 focus:ring-indigo-500':
          blok.type === 'primary'
      },
      {
        'bg-indigo-100 text-indigo-700  hover:bg-indigo-200 focus:ring-indigo-500':
          blok.type === 'secondary'
      }
    ]"
    :target="type === 'url' ? '_blank' : null"
    :to="url"
    @click="$emit('click')"
  >
    {{ blok.label }}
  </NuxtLink>
</template>

<script setup>
  const props = defineProps({
    blok: {
      type: Object,
      required: true
    }
  });

  const type = ref(props.blok.link.linktype);
  const url =
    type === 'story'
      ? '/' + linkResolver(props.blok.link.cached_url)
      : props.blok.link.cached_url;
</script>
