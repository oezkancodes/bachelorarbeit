<template>
  <div v-if="blok" v-editable="blok" class="flex flex-col px-8 pt-8">
    <dt
      class="order-2 text-base font-medium text-gray-500"
      v-text="blok.title"
    />
    <dd
      class="order-1 text-2xl font-extrabold text-indigo-600 sm:text-3xl"
      v-text="blok.value"
    />
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
