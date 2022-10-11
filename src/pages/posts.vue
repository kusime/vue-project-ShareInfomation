<template>
  <cool-card v-if="!global.currentLoginState.isLogin">
    <cool-title normal-text="Please" light-text="Login!"/>
  </cool-card>

  <cool-card v-if="global.currentLoginState.isLogin && !Array.isArray(global.posts.globalPosts)">
    <cool-title normal-text="Empty" light-text="Data Here !!"/>
  </cool-card>

  <div v-if="global.currentLoginState.isLogin && Array.isArray(global.posts.globalPosts)" class="container" v-for="gPosts in global.posts.globalPosts">
    <post-unit :post="gPosts" :random-i-d="randomUUID()"></post-unit>
  </div>

</template>

<script setup>
import PostUnit from "../Component/appLayout/postUnit.vue";
import CoolCard from "../Component/layout/CoolCard.vue";
import globalState from "../store/global.js";
import CoolTitle from "../Component/layout/CoolTitle.vue";
import randomUUID from "../pubFunction/randomUUID.js";
// import {useRouter} from "vue-router";
//
// console.log(useRouter().afterEach((c)=>{
//
// }));

const global = globalState()
</script>

<style scoped>

</style>