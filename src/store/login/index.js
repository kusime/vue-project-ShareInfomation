import { defineStore } from "pinia";
import alertState from "../alert/index.js";
import db from "../../config/firebase.js";
import globalState from "../global.js";

const loginState = defineStore("login", {
  state() {
    return {
      currentLoginState: {
        isLogin: false,
        currentUser: "",
        currentPassword: "",
      },
      username: "",
      password: "",
    };
  },
  getters: {},
  actions: {
    onLogin: async function (thisWrapper = null) {
      // define alert
      const alert = alertState();
      const global = globalState();

      // redirect this
      if (thisWrapper === null) {
        thisWrapper = this;
      }

      this.currentLoginState.isLogin = true;
      this.currentLoginState.currentUser = thisWrapper.username;
      this.currentLoginState.currentPassword = thisWrapper.password;
      await global.registerMonitors();
      return true;
    },
    async onLogout() {
      const global = globalState();
      // clear currentLoginState
      this.currentLoginState.isLogin = "";
      this.currentLoginState.currentUser = "";
      this.currentLoginState.currentPassword = "";

      // clear global state
      global.clearPosts();
      global.clearMonitor();

      // stop monitor
      await global.unregisterMonitors();
    },
  },
});
export default loginState;
