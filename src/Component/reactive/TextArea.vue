<template>

<cool-card title="Submit">
<template #default>
  <h5 class="text-gray-900 text-xl leading-tight font-medium mb-1  mt-2 text-center">
    Submit
  </h5>
  <!--      text-area field-->
  <div class="flex justify-center my-4" >
    <div class="mb-3 xl:w-96">
          <textarea
              class="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
              id="exampleFormControlTextarea1"
              rows="3"
              cols="50"
              :placeholder="placeholder"
              :value="areaInput"
              @change="emitValue"
          ></textarea>
    </div>
  </div>
  <cool-button prompt-text="Submit" @btnClicked="$emit('onSubmit')"/>
</template>
</cool-card>

</template>

<script setup>
// handler the v-model:areaInput="xxx"
import CoolButton from "./CoolButton.vue";
import CoolCard from "../layout/CoolCard.vue";
import modifierFactory from "../../pubFunction/modifierFactory.js";

// declare props and use in the setup
const props = defineProps({
  areaInput:String,
  placeholder:String,
  areaInputModifiers: { default: () => ({}) }
})
// declare emit event and use in the setup
const emits = defineEmits(['update:areaInput','onSubmit'])

// modelModifiers handler
function emitValue(e) {
  modifierFactory(props,emits,'areaInput')(e)
}
</script>

<style scoped>

</style>