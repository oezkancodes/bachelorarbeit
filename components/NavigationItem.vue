<template>
  <div v-if="blok" v-editable="blok" class="group relative">
    <!-- Item -->
    <button
      v-if="!blok.link.cached_url"
      class="group inline-flex items-center rounded-md bg-white text-base font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <span>{{ blok.label }}</span>

      <ChevronDownIcon
        v-if="blok.sub_items.length > 0"
        class="ml-2 h-5 w-5 text-gray-400 transition-transform duration-200 group-hover:-rotate-180 group-hover:text-gray-500"
      />
    </button>

    <NuxtLink
      v-else
      :to="blok.link.cached_url ? url : null"
      class="group inline-flex items-center rounded-md bg-white text-base font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      aria-expanded="false"
    >
      <span>{{ blok.label }}</span>

      <ChevronDownIcon
        v-if="blok.sub_items.length > 0"
        class="ml-2 h-5 w-5 text-gray-400 transition-transform duration-200 group-hover:-rotate-180 group-hover:text-gray-500"
      />
    </NuxtLink>

    <!-- Flyout -->
    <div
      v-if="blok.sub_items.length > 0"
      class="invisible absolute z-10 w-screen max-w-md translate-y-12 px-2 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 sm:px-0 lg:left-0"
    >
      <div
        class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
      >
        <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
          <NavigationSubItem
            v-for="flyout_item_blok in blok.sub_items"
            :key="flyout_item_blok._uid"
            :blok="flyout_item_blok"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ChevronDownIcon } from '@heroicons/vue/outline/index.js';

  const props = defineProps({
    blok: {
      type: Object,
      required: true
    }
  });

  const url =
    props.blok.link.linktype === 'story'
      ? linkResolver(props.blok.link.cached_url)
      : props.blok.link.cached_url;
</script>
