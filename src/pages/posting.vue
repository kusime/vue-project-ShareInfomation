<template>
<text-area v-model:area-input.trim="posting.content"
           placeholder="The message you want to post..."
           @onSubmit="posting.handlerSubmit"/>
</template>

<script setup>
import TextArea from "../Component/reactive/TextArea.vue";
import postingState from "../store/submit/index.js";
const posting = postingState()
</script>

<style scoped>

</style>