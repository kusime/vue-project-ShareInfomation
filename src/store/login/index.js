import { defineStore } from "pinia";
import alertState from "../alert/index.js";
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
    onLogin() {
      // todo api to login and modal handler
      const alert = alertState();

      console.log(this.username, this.password);
    },
  },
});
export default loginState;
