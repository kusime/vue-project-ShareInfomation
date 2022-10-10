import { defineStore } from "pinia";
import db from "../config/firebase.js";
import loginState from "./login/index.js";

const globalState = defineStore("global", {
  state() {
    return {
      posts: {
        globalPost: [],
        myPost: [],
      },
      monitor: {
        myPost: "monitor",
        globalPost: "monitor",
      },
    };
  },
  actions: {
    clearPosts: function () {
      this.posts.globalPost = [];
      this.posts.myPost = [];
    },
    clearMonitor: function () {
      this.monitor.globalPost = "";
      this.monitor.myPost = "";
    },

    registerMonitors: async function () {
      const login = loginState();
      // register the monitor
      this.monitor.globalPost = await db.startMonitoring(
        "GlobalPost",
        this.posts.globalPost
      );
      this.monitor.myPost = await db.startMonitoring(
        `users/${login.currentLoginState.currentUser}/${login.currentLoginState.currentPassword}`,
        this.posts.myPost
      );
    },
    unregisterMonitors: async function () {
      db.stopMonitoring(this.monitor.myPost);
      db.stopMonitoring(this.monitor.globalPost);
    },
  },
});

export default globalState;
