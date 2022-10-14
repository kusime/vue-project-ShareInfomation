<template>

  <cool-card>
    <cool-title :normal-text="catchAll" light-text="Not Found !!"/>
    <cool-heading class="text-xl" title="Please enter a valid page to continue...">
    </cool-heading>
  </cool-card>

</template>

<script setup>


import CoolTitle from "../Component/layout/CoolTitle.vue";
import CoolCard from "../Component/layout/CoolCard.vue";
import CoolHeading from "../Component/layout/CoolHeading.vue";

import router from "../config/router.js";
const catchAll = router.currentRoute.value.params.catchAll;

</script>

<style scoped>

</style>