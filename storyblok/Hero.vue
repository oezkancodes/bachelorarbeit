<template>
  <section v-if="blok" v-editable="blok" class="relative bg-gray-50">
    <main class="lg:relative">
      <div
        class="mx-auto w-full max-w-7xl pt-16 pb-20 text-center lg:py-48 lg:text-left"
      >
        <div class="px-4 sm:px-8 lg:w-1/2 xl:pr-16">
          <StoryblokRichText
            class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl"
            :text="blok.title"
          />
          <StoryblokRichText
            class="mx-auto mt-3 max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl"
            :text="blok.description"
          />
          <div
            class="mt-10 space-x-2 sm:flex sm:justify-center lg:justify-start"
          >
            <ButtonLink
              v-for="(link_blok, i) in blok.button_links"
              :key="i"
              class="shadow"
              :blok="link_blok"
            />
          </div>
        </div>
      </div>

      <div
        class="relative h-64 w-full sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2"
      >
        <StoryblokImage
          class="absolute inset-0 h-full w-full object-cover"
          :image="blok.image"
        />
      </div>
    </main>
  </section>
</template>

<script setup>
  defineProps({
    blok: {
      type: Object,
      required: true
    }
  });
</script>
