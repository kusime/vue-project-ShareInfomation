<template>
<cool-card>
  <cool-title normal-text="Regis" light-text="ter"/>
  <cool-input v-model:inputs.trim="username" title="Username"/>
  <cool-input type="password" v-model:inputs.trim="password" title="Password"/>
  <cool-input type="password" v-model:inputs.trim="confirmPassword" title="ConfirmPassword"/>
  <cool-button data-bs-target="#globalAlert" data-bs-toggle="modal" prompt-text="Register" @btnClicked="regS.onRegister"/>
</cool-card>
</template>

<script setup>
import CoolButton from "../Component/reactive/CoolButton.vue";
import registerState from "../store/register/index.js";
import CoolCard from "../Component/layout/CoolCard.vue";
import CoolTitle from "../Component/layout/CoolTitle.vue";
import CoolInput from "../Component/reactive/CoolInput.vue";
import {storeToRefs} from "pinia";


// connect to the register state
const regS = registerState()
const {username,password,confirmPassword} = storeToRefs(regS)



</script>

<style scoped>

</style>