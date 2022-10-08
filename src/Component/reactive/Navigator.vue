<template>
  <div class="container flex space-x-2  m-auto justify-around my-10">
    <div v-for="unit in navUnits" :key=unit class="h-20 w-40 bg-amber-600 flex justify-center items-center">
      <router-link class="text-sky-600 bg-amber-400 p-5" :to="unit.navRoute"> {{ unit.navTitle }} </router-link>
    </div>
  </div>
</template>

<script setup>
import navState from "../../store/mainPage.js";
import {storeToRefs} from "pinia";
const {navUnits } = storeToRefs(navState())//need to call the store






</script>

<style scoped>

</style>