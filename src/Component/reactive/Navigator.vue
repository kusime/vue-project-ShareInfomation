<template>
  <nav
    class="relative w-full flex flex-wrap items-center justify-between py-4 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg navbar navbar-expand-sm navbar-dark"
  >
    <div
      class="container-fluid w-full flex flex-wrap items-center justify-between px-6"
    >
      <button
        class="navbar-toggler text-gray-500 border-0 hover:shadow-none hover:no-underline py-2 px-2.5 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="bars"
          class="w-6"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
          ></path>
        </svg>
      </button>

      <div
        class="collapse navbar-collapse flex-grow items-center"
        id="navbarSupportedContent"
      >
      <cool-title normal-text="Share-" light-text="Information"/>
        <!-- Left links -->
        <ul
          class="navbar-nav flex flex-col pl-0 list-style-none mr-auto flex justify-around"
        >
          <li v-for="unit in navUnits" :key="unit" class="nav-item px-2 ml-2">
            <router-link
              class="nav-link hover:text-blue-500"
              aria-current="page"
              :to="unit.navRoute"
            >
              {{ unit.navTitle }}
            </router-link>
          </li>
        </ul>

        <!-- Left links -->
        <cool-button v-if="login.currentLoginState.isLogin"
                     class="text-xs mx-5"
                     prompt-text="Logout"
                     @btnClicked="login.onLogout"/>


        <div class="text-gray-400 hover:text-blue-500">
          {{ login.currentLoginState.isLogin ? "Welcome " + login.currentLoginState.currentUser : "You are not login yet .."}}
        </div>


      </div>
      <!-- Collapsible wrapper -->
    </div>
  </nav>
</template>

<script setup>
import navState from "../../store/nav/index.js";
import { storeToRefs } from "pinia";
import CoolTitle from "../layout/CoolTitle.vue";
import loginState from "../../store/login/index.js";
import CoolButton from "./CoolButton.vue";

const { navUnits } = storeToRefs(navState()); //need to call the store
// connect to loginState to represent the Login State Indicator

const login = loginState()


</script>

<style scoped>
.router-link-active {
  @apply text-indigo-700;
}
</style>
