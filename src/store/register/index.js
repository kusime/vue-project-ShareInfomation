import { defineStore } from "pinia";
import { geneticInputCheck } from "../../pubFunction/inputCheck.js";
import alertState from "../alert/index.js";
import globalState from "../global.js";
import APIs from "../../config/APIs.js";
import router from "../../config/router.js";
import loginState from "../login/index.js";

const registerState = defineStore("register", {
  state() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
    };
  },
  getters: {
    stateWrap(s) {
      return {
        username: s.username,
        password: s.password,
        confirmPassword: s.confirmPassword,
      };
    },
  },
  actions: {
    clearUserInputs() {
      this.username = "";
      this.password = "";
      this.confirmPassword = "";
    },
    async onRegister() {
      // connect to the alert
      const alert = alertState();
      const global = globalState();

      // check if the user is already logged in
      if (global.currentLoginState.isLogin) {
        alert.title = "Register failed";
        alert.content =
          "You are already logged in ! Please logout and try again.";
        return false;
      }

      // check same
      if (this.password !== this.confirmPassword) {
        alert.title = "Input Check Failed";
        alert.content = "Password not same";
        return false;
      }

      // make geneticInputCheck
      if (geneticInputCheck(this.stateWrap)) {
        const regState = await APIs.register(this.username, this.password);

        if (regState) {
          // make an alert success
          alert.title = "Success Registered";
          alert.content = `Welcome to Share Information !`;
          // https://blog.csdn.net/weixin_43238931/article/details/125341629

          // automatically fill the register information
          const login = loginState();
          login.username = this.username;
          login.password = this.password;
          await router.push("/login");
          this.clearUserInputs();
          return true;
        }
        alert.title = "Register Failed";
        alert.content = "Already have this user,Please use another one..";
        this.clearUserInputs();
        return false;
      }
    },
  },
});
export default registerState;
