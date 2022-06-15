<template>
  <a
    v-if="blok && blok.link.cached_url"
    :key="blok.link._uid"
    v-editable="blok"
    :href="blok.link.cached_url"
    target="_blank"
    class="text-gray-400 hover:text-gray-500"
  >
    <InstagramIcon v-if="blok.icon === 'instagram'" class="h-7 w-7" />
    <GithubIcon v-if="blok.icon === 'github'" class="h-7 w-7" />
  </a>
</template>

<script setup>
  import InstagramIcon from '~/public/icons/instagram.svg?component';
  import GithubIcon from '~/public/icons/github.svg?component';

  defineProps({
    blok: {
      type: Object,
      required: true
    }
  });
</script>
