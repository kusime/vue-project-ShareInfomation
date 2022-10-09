<template>
<text-area v-model:area-input.trim="field" placeholder="The message you want to post..." @onSubmit="handlerSubmit"/>
</template>

<script setup>
import TextArea from "../Component/reactive/TextArea.vue";
import {ref} from "vue";


// declare field as reactive , use ref().value to extract the value
const field = ref('')


// function field
function handlerSubmit(){
  console.log(field.value);
}

</script>

<style scoped>

</style>