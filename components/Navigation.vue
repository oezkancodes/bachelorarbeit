<template>
  <nav
    v-if="data"
    v-editable="data.content"
    class="border-b-2 border-gray-100 md:py-2"
  >
    <div
      class="mx-auto grid max-w-7xl grid-cols-12 items-center bg-white py-2 px-4 sm:px-6"
    >
      <!-- Logo -->
      <NuxtLink href="/" class="col-span-6 md:col-span-3">
        <StoryblokImage class="h-8 w-auto sm:h-10" :image="data.content.logo" />
      </NuxtLink>

      <!-- Desktop Nav Items -->
      <div class="hidden space-x-6 md:col-span-6 md:flex md:justify-center">
        <NavigationItem
          v-for="nav_item_blok in data.content.nav_items"
          :key="nav_item_blok._uid"
          :blok="nav_item_blok"
        />
      </div>

      <!-- Mobile Menu Button -->
      <div class="col-span-6 flex justify-end md:hidden">
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
          aria-expanded="false"
          @click="menu = true"
        >
          <MenuIcon class="h-6 w-6" />
        </button>
      </div>

      <!-- Mobile Navitaion -->
      <div
        class="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition-all duration-200 md:hidden"
        :class="
          menu
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-full opacity-0'
        "
      >
        <div
          class="relative rounded-lg bg-white px-5 pt-5 pb-6 shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div class="flex items-center justify-between">
            <!-- Logo -->
            <NuxtLink href="/" class="col-span-6" @click="menu = false">
              <StoryblokImage
                class="h-8 w-auto sm:h-10"
                :image="data.content.logo"
              />
            </NuxtLink>

            <!-- Close Button -->
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              @click="menu = false"
            >
              <XIcon class="h-6 w-6" />
            </button>
          </div>

          <!-- Mobile Nav Items -->
          <nav v-if="data.content.nav_items" class="mt-6 grid gap-y-6">
            <MobileNavigationItem
              v-for="nav_item_blok in data.content.nav_items"
              :key="nav_item_blok._uid"
              :blok="nav_item_blok"
            />
          </nav>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
  import { MenuIcon, XIcon } from '@heroicons/vue/outline';
  import { Story } from 'storyblok-js-client';

  // Fetch Story
  const storyblokApi = useStoryblokApi();
  const { data } = await useAsyncData('navigation', async () => {
    try {
      const res: Story = await storyblokApi.get(
        'cdn/stories/configuration/navigation',
        {
          version: 'draft'
        }
      );
      return res.data.story;
    } catch (err) {
      console.error(err);
      return null;
    }
  });

  const menu = ref(false);
</script>
