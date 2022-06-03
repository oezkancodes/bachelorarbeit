<template>
  <div v-if="blok" v-editable="blok" class="relative bg-white">
    <div
      class="h-56 bg-indigo-600 sm:h-72 lg:absolute lg:left-0 lg:h-full lg:w-1/2"
    >
      <StoryblokImage class="h-full w-full object-cover" :image="blok.image" />
    </div>
    <div class="relative mx-auto max-w-7xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16">
      <div
        class="mx-auto max-w-2xl lg:mr-0 lg:ml-auto lg:w-1/2 lg:max-w-none lg:pl-10"
      >
        <div>
          <div
            class="flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white"
          >
            <StoryblokImage class="h-6 w-6" :image="blok.icon" />
          </div>
        </div>
        <h2
          class="mt-6 text-3xl font-extrabold text-gray-900 sm:text-4xl"
          v-text="blok.title"
        />
        <StoryblokRichText
          class="mt-6 text-lg text-gray-500"
          :text="blok.description"
        />

        <div class="mt-8 overflow-hidden">
          <dl class="-mx-8 -mt-8 flex flex-wrap">
            <Stat
              v-for="(stat_blok, i) in blok.stats"
              :key="i"
              :blok="stat_blok"
            />
          </dl>
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
