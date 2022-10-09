import { defineStore } from "pinia";

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
      console.log(this.username, this.password);
    },
  },
});
export default loginState;
