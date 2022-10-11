<template>

  <div class="flex space-x-2 justify-center relative">
    <button @click="$emit('btnClicked')" type="button" class="flex justify-center items-center mt-2 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xl leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-500 active:shadow-lg transition duration-150 ease-in-out">
<!--      for img field-->
      <slot></slot>
      {{props.promptText }}
    </button>
  </div>

</template>

<script setup>
const props = defineProps(['promptText'])

</script>

<style scoped>

</style>