<template>
  <h1 class="font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600">{{ title }}</h1>
</template>

<script setup>
defineProps({
  title:{
    type: String,
    required: true,
    default: "Default Title"
  }
})
</script>

<style scoped>

</style>