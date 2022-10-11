import { defineStore } from "pinia";
import getDate from "../../pubFunction/getDate.js";
import alertState from "../alert/index.js";
import globalState from "../global.js";
import { geneticInputCheck } from "../../pubFunction/inputCheck.js";
import APIs from "../../config/APIs.js";

const postingState = defineStore("posting", {
  state() {
    return {
      content: "",
    };
  },
  getters: {
    dataPackage: function (state) {
      const global = globalState();
      const currentDate = getDate();
      // use this to get the metadata
      return {
        author: global.currentLoginState.currentUser,
        content: state.content,
        date: currentDate,
      };
    },
  },
  actions: {
    async handlerSubmit() {
      console.log("Submit");
      // connect to the store
      const alert = alertState();
      const global = globalState();

      // check if the user has already logged in
      if (!global.currentLoginState.isLogin) {
        // user not logged in
        alert.title = "Not logged in";
        alert.content = "Please login first";
        return;
      }
      // user has already logged in

      // geneticInputCheck
      if (!geneticInputCheck({ content: this.content })) {
        // alert user to type something
        alert.title = "Invalid Input";
        alert.content = "Please try type something..😇";
        return false;
      }

      // alert user submit is successfully sended
      alert.title = "Success";
      alert.content = "You have successfully submitted your posting";

      // global.posts.myPosts.push(this.dataPackage);
      // global.posts.globalPosts.push(this.dataPackage);
      // use APIs to directly push the new posting to the database
      await APIs.addPostingToGlobal(
        global.currentLoginState.currentUser,
        global.currentLoginState.currentPassword,
        this.dataPackage
      );
      // add post to My
      await APIs.addPostingToMy(
        global.currentLoginState.currentUser,
        global.currentLoginState.currentPassword,
        this.dataPackage
      );

      console.log("Submit 😘>> ", this.dataPackage);
    },
  },
});
export default postingState;
