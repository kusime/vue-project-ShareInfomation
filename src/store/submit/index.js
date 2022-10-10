import { defineStore } from "pinia";
import getDate from "../../pubFunction/getDate.js";
import loginState from "../login/index.js";
import alertState from "../alert/index.js";

const postingState = defineStore("posting", {
  state() {
    return {
      content: "",
    };
  },
  getters: {
    dataPackage: function (state) {
      // use this to get the metadata
      return { author: this.author, content: state.content, date: this.date };
    },
  },
  actions: {
    handlerSubmit() {
      console.log("Submit");
      // connect to the store
      const currentDate = getDate();
      const alert = alertState();
      const login = loginState();

      // check if the user has already logged in
      if (!login.currentLoginState.isLogin) {
        // user not logged in
        alert.title = "Not logged in";
        alert.content = "Please login first";
        return;
      }

      console.log(this.dataPackage);
    },
  },
});
export default postingState;
