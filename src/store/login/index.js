import { defineStore } from "pinia";
import alertState from "../alert/index.js";
import globalState from "../global.js";
import { geneticInputCheck } from "../../pubFunction/inputCheck.js";
import APIs from "../../config/APIs.js";

const loginState = defineStore("login", {
  state() {
    return {
      username: "",
      password: "",
    };
  },

  actions: {
    // clear user Inputs
    clearUserInputs() {
      this.username = "";
      this.password = "";
    },

    onLogin: async function () {
      // define alert
      const alert = alertState();
      const global = globalState();
      // check already logged in
      if (global.currentLoginState.isLogin === true) {
        // alert already logged in
        alert.title = "You  already logged in";
        alert.content = "Please logout first.";
        return false;
      }
      // generic inputs check
      if (
        !geneticInputCheck({
          username: this.username,
          password: this.password,
        })
      ) {
        // input check failed
        this.clearUserInputs();
        return false;
      }

      // perform login action
      const loginState = await APIs.login(this.username, this.password);

      if (loginState) {
        // success handler
        global.currentLoginState.isLogin = true;
        global.currentLoginState.currentUser = this.username;
        global.currentLoginState.currentPassword = this.username;

        // register db => local monitor
        await this.registerMonitors();

        // make success alert
        alert.title = "Login Success";
        alert.content =
          "You are successfully logged in as " +
          global.currentLoginState.currentUser;
        this.clearUserInputs();
        return true;
      }
      // user failed login alert
      alert.title = "Login Failed";
      alert.content = "Login failed. Please try again.";
      this.clearUserInputs();
      return false;
    },

    registerMonitors: async function () {
      const global = globalState();
      // register the db monitor
      // db update -> local update
      global.monitor.globalPosts = await APIs.registerGlobalPostingMonitor(
        global.currentLoginState.currentUser,
        global.currentLoginState.currentPassword
      );
      global.monitor.myPosts = await APIs.registerMyPostsMonitor(
        global.currentLoginState.currentUser,
        global.currentLoginState.currentPassword
      );
      // via vue watch , successfully !!
      // https://stackoverflow.com/questions/51096547/how-to-get-the-target-of-a-javascript-proxy
      // https://github.com/vuejs/pinia/discussions/443
    },

    async onLogout() {
      const global = globalState();
      // clear currentLoginState

      // stop monitor
      await global.unregisterMonitors();

      // clear global state
      global.clearPosts();
      global.clearMonitor();
      global.clearCurrentLoginState();

      // clear Login Inputs
      this.clearUserInputs();
    },
  },
});
export default loginState;
