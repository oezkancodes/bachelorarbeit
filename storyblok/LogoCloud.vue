<template>
  <div v-if="blok" v-editable="blok" class="bg-white">
    <div class="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <h2
        class="text-center text-base font-semibold uppercase tracking-wider text-gray-600"
        v-text="blok.kicker"
      />
      <div class="mt-6 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-8">
        <div
          v-for="logo_blok in blok.logos"
          :key="logo_blok._uid"
          class="col-span-1 flex justify-center bg-gray-50 py-8 px-8"
        >
          <Logo :blok="logo_blok" />
        </div>
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
