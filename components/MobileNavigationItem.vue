<template>
  <div v-if="blok" class="-m-2 select-none">
    <button
      v-if="!blok.link.cached_url || blok.sub_items.length > 0"
      class="group flex w-full cursor-pointer items-center justify-between rounded-md p-3 hover:bg-gray-50"
      :class="{ 'bg-gray-50': menu }"
      @click="menu = !menu"
    >
      <span class="text-base font-medium text-gray-900">
        {{ blok.label }}
      </span>
      <PlusIcon
        v-if="blok.sub_items.length > 0"
        class="m-2 h-5 w-5 text-gray-400 group-hover:text-gray-500"
        :class="{ 'rotate-45': menu }"
      />
    </button>

    <NuxtLink
      v-else
      :to="url"
      class="group flex w-full cursor-pointer items-center justify-between rounded-md p-3 hover:bg-gray-50"
      :class="{ 'bg-gray-50': menu }"
      @click="menu = !menu"
    >
      <span class="text-base font-medium text-gray-900">
        {{ blok.label }}
      </span>
      <PlusIcon
        v-if="blok.sub_items.length > 0"
        class="m-2 h-5 w-5 text-gray-400 group-hover:text-gray-500"
        :class="{ 'rotate-45': menu }"
      />
    </NuxtLink>

    <div
      v-if="menu && blok.sub_items.length > 0"
      class="mt-2 flex flex-col space-y-2"
    >
      <MobileNavigationSubItem
        v-for="flyout_blok in blok.sub_items"
        :key="flyout_blok._uid"
        :blok="flyout_blok"
      />
    </div>
  </div>
</template>

<script setup>
  import { PlusIcon } from '@heroicons/vue/outline';

  const props = defineProps({
    blok: {
      type: Object,
      required: true
    }
  });
  const menu = ref(false);
  const url = ref('/' + linkResolver(props.blok.link.cached_url));
</script>
