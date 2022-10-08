<script setup>


import Navigator from "./Component/reactive/Navigator.vue";
import ModelCard from "./Component/layout/ModelCard.vue";
</script>

<template>
  <navigator/>
  <model-card/>


  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<style scoped>

</style>