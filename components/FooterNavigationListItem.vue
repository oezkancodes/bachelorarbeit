<template>
  <li v-if="blok" v-editable="blok">
    <NuxtLink
      v-if="type === 'story'"
      :to="url"
      class="text-base text-gray-500 hover:text-gray-900"
    >
      {{ blok.label }}
    </NuxtLink>
    <a
      v-if="type === 'url'"
      class="text-base text-gray-500 hover:text-gray-900"
      :href="url"
      target="_blank"
    >
      {{ blok.label }}
    </a>
  </li>
</template>

<script setup>
  const props = defineProps({
    blok: {
      type: Object,
      required: true
    }
  });

  const type = ref(props.blok.link.linktype);
  const url = ref(
    type.value === 'story'
      ? '/' + linkResolver(props.blok.link.cached_url)
      : props.blok.link.cached_url
  );
</script>
