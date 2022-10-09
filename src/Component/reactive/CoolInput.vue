<template>
  <div class="flex justify-center my-3">
    <div class="mb-3 xl:w-96">
      <label
        for="exampleFormControlInput1"
        class="form-label inline-block mb-2 text-gray-700"
        >{{ title }}</label
      >
      <input
        type="text"
        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        id="exampleFormControlInput1"
        :placeholder="placeholder"
        @change="emitValue"
        :value="inputs"
      />
    </div>
  </div>
</template>

<script setup>

import modifierFactory from "../../pubFunction/modifierFactory.js";

const props = defineProps({
  title:String,
  placeholder:String,
  // v-model handler
  inputs:String,
  inputsModifiers:{
    default:()=>({})
  }
})
const emits = defineEmits(['update:inputs'])

// modelModifiers handler
function emitValue(e) {
  modifierFactory(props,emits,'inputs')(e)
}
</script>

<style scoped></style>
