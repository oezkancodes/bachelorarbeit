<template>
  <div v-if="blok" v-editable="blok">
    <h3 class="text-sm font-semibold uppercase tracking-wider text-gray-400">
      {{ blok.title }}
    </h3>
    <ul role="list" class="mt-4 space-y-4">
      <FooterNavigationListItem
        v-for="list_item_blok in blok.list_items"
        :key="list_item_blok._uid"
        :blok="list_item_blok"
      />
    </ul>
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
