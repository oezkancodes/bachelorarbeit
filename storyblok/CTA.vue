<template>
  <div v-if="blok" v-editable="blok" class="bg-white">
    <div
      class="mx-auto max-w-7xl py-12 px-4 text-center sm:px-6 lg:py-16 lg:px-8"
    >
      <h2
        class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"
        v-text="blok.title"
      />
      <div class="mt-8 flex justify-center space-x-2">
        <ButtonLink
          v-for="(link_blok, i) in blok.buttons"
          :key="i"
          class="shadow"
          :blok="link_blok"
        />
      </div>
    </div>
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
