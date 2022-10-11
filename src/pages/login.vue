<template>
<cool-card>
  <cool-title normal-text="Lo" light-text="gin"/>
  <cool-input title="Username" placeholder="Input Username here" v-model:inputs.trim="username"/>
  <cool-input title="Password" placeholder="Input Password here" v-model:inputs.trim="password"/>
  <cool-button prompt-text="Login" data-bs-toggle="modal" data-bs-target="#globalAlert" @btnClicked="login.onLogin"/>
</cool-card>

</template>

<script setup>

import CoolCard from "../Component/layout/CoolCard.vue";
import CoolTitle from "../Component/layout/CoolTitle.vue";
import CoolInput from "../Component/reactive/CoolInput.vue";

// connect to the login state
import loginState from "../store/login/index.js";
import {storeToRefs} from "pinia";
import CoolButton from "../Component/reactive/CoolButton.vue";
const login = loginState()
const {username ,password} = storeToRefs(login)

</script>

<style scoped>

</style>