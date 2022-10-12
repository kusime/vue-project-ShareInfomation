<template>
  <cool-card v-if="!global.currentLoginState.isLogin">
    <cool-title normal-text="Please" light-text="Login!"/>
  </cool-card>

  <cool-card v-if="global.currentLoginState.isLogin && !Array.isArray(global.posts[currentPosts])">
    <cool-title normal-text="Empty" light-text="Data Here !!"/>
  </cool-card>

  <div v-if="global.currentLoginState.isLogin && Array.isArray(global.posts[currentPosts])" class="container" v-for="post in global.posts[currentPosts]">
    <post-unit :post="post" :random-i-d="randomUUID()"></post-unit>
  </div>

</template>

<script setup>
import PostUnit from "../Component/appLayout/postUnit.vue";
import CoolCard from "../Component/layout/CoolCard.vue";
import CoolTitle from "../Component/layout/CoolTitle.vue";
import randomUUID from "../pubFunction/randomUUID.js";
import {ref, watch} from "vue";
import {PATH} from "../config/APIs.js";
import alertState from "../store/alert/index.js";
import globalState from "../store/global.js";
import router from "../config/router.js";

const global = globalState()
const alert = alertState()
const route = router.currentRoute
console.log(route);
// create a ref  BUT this will separate the reactive of the posts update
const currentPosts = ref('') // just handler of the key

// add a new watcher to sync the posts update to the currentPosts

// 当参数更改时获取用户信息
watch(
    () => route.value.fullPath,
    async newPath => {
      // check if the path is not posts
      if(!newPath.split("/").includes('posts')) return false;
      const newType = route.value.params.type

      console.log("Current post type 🤥>",newType,router);
       // use .value to extract the proxy value to change in reactively way
      if([PATH.GLOBAL_POSTS,PATH.MY_POSTS].includes(newType)){
        currentPosts.value = newType
        return true
      }
      // not matching the current post type
      // alert user to not modifying the router
      alert.title = "Not matching the current post type.";
      alert.message = "You have to modify the post type. But we currently don't have this post type '";
      // redirect to the globalPosts
      await router.push("/posts/"+PATH.GLOBAL_POSTS)
      return false;
    },
)
</script>

<style scoped>

</style>