import { defineStore } from "pinia";
import alertState from "../alert/index.js";
import db from "../../config/firebase.js";
import globalState from "../global.js";
import { geneticInputCheck } from "../../pubFunction/inputCheck.js";

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

      // generic inputs check
      if (
        !geneticInputCheck({
          username: thisWrapper.username,
          password: thisWrapper.password,
        })
      ) {
        // input check failed
        return false;
      }

      // perform login action
      const loginBundle = await db.checkoutValue(
        `users/${thisWrapper.username}/${thisWrapper.password}`
      );

      if (loginBundle.state === false) {
        // login failed
        alert.title = "Login Failed";
        alert.content = "Username or password is incorrect.";
        return false;
      }

      // success handler
      this.currentLoginState.isLogin = true;
      this.currentLoginState.currentUser = thisWrapper.username;
      this.currentLoginState.currentPassword = thisWrapper.password;
      await global.registerMonitors();

      // make success alert
      alert.title = "Login Success";
      alert.content =
        "You are successfully logged in as " +
        this.currentLoginState.currentUser;
      return true;
    },
    async onLogout() {
      const global = globalState();
      // clear currentLoginState
      this.currentLoginState.isLogin = "";
      this.currentLoginState.currentUser = "";
      this.currentLoginState.currentPassword = "";

      // stop monitor
      await global.unregisterMonitors();

      // clear global state
      global.clearPosts();
      global.clearMonitor();
    },
  },
});
export default loginState;
