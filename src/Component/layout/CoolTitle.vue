<template>
  <div class="flex space-x-2 justify-center">
    <h2 class="tracking-wider text-4xl font-medium leading-tight text-gray-800">
      {{normalText}}
      <span class="tracking-widest mr-1.5 inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-600 text-white rounded">{{lightText}}</span>
    </h2>
  </div>
</template>

<script setup>
defineProps(['normalText','lightText'])
</script>

<style scoped>

</style>