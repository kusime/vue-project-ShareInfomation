import { defineStore } from "pinia";
import APIs from "../config/APIs.js";

const globalState = defineStore("global", {
  state() {
    return {
      currentLoginState: {
        isLogin: false,
        currentUser: "",
        currentPassword: "",
      },
      posts: {
        globalPosts: [],
        myPosts: [],
      },
      monitor: {
        myPosts: "monitor",
        globalPosts: "monitor",
      },
    };
  },

  actions: {
    clearPosts: function () {
      this.posts.globalPosts = [];
      this.posts.myPosts = [];
    },
    clearMonitor: function () {
      this.monitor.globalPosts = "";
      this.monitor.myPosts = "";
    },
    // clear all current loginState
    clearCurrentLoginState: function () {
      this.currentLoginState = {
        isLogin: false,
        currentUser: "",
        currentPassword: "",
      };
    },

    unregisterMonitors: async function () {
      console.log(this.monitor.myPosts, this.monitor.globalPosts);
      // db monitor
      APIs.unregisterMonitors(this.monitor.myPosts);
      APIs.unregisterMonitors(this.monitor.globalPosts);
    },
  },
});

export default globalState;
