<template>
<cool-button prompt-text="Button" @btnClicked="onClicked"/>
</template>

<script setup>
import CoolButton from "../Component/reactive/CoolButton.vue";

function onClicked(){
  alert('button clicked')
}

</script>

<style scoped>

</style>