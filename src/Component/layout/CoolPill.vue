<template>
  <span
    class="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-600 text-white rounded-full"
    >{{ content }}</span
  >
</template>

<script setup>
defineProps({
  content: {
    type: String,
    required: true,
    default: "Default Pill Text",
  },
});
</script>

<style scoped></style>
