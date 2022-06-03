<template>
  <div
    v-if="blok"
    v-editable="blok"
    class="relative overflow-hidden bg-white pt-16 pb-32"
  >
    <div class="relative">
      <div
        class="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8"
      >
        <div
          class="mx-auto max-w-xl px-4 sm:px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0"
          :class="{ 'lg:order-2': blok.variant === 'image_left' }"
        >
          <div>
            <div>
              <span
                class="flex h-12 w-12 items-center justify-center rounded-md bg-indigo-600"
              >
                <StoryblokImage class="h-6 w-6" :image="blok.icon" />
              </span>
            </div>
            <div class="mt-6">
              <h2
                class="text-3xl font-extrabold tracking-tight text-gray-900"
                v-text="blok.title"
              />
              <StoryblokRichText
                class="mt-4 text-lg text-gray-500"
                :text="blok.description"
              />

              <div class="mt-6 flex space-x-2">
                <ButtonLink
                  v-for="link_blok in blok.button_links"
                  :key="link_blok._uid"
                  :blok="link_blok"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="mt-12 sm:mt-16 lg:mt-0">
          <div
            class="-mr-48 pl-4 sm:pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0"
          >
            <StoryblokImage
              class="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:h-full lg:w-auto lg:max-w-none"
              :class="[
                { 'lg:right-0': blok.variant === 'image_left' },
                { 'lg:left-0': blok.variant === 'image_right' }
              ]"
              :image="blok.image"
            />
          </div>
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
