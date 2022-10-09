import { defineStore } from "pinia";
import db from "../../config/firebase.js";
import { geneticInputCheck } from "../../pubFunction/inputCheck.js";
import alertState from "../alert/index.js";
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
    async onRegister() {
      // connect to the alert
      const alert = alertState();
      // check same
      if (this.password !== this.confirmPassword) {
        alert.title = "Input Check Failed";
        alert.content = "Password not same";
        return;
      }
      // make geneticInputCheck
      if (geneticInputCheck(this.stateWrap)) {
        // interact with db and modal card
        const chkBundler = await db.checkoutValue(
          this.username + "/" + this.password
        );
        console.log(chkBundler);
        await db.setValue(chkBundler.ref, "halo world");

        console.log("ok");
        return;
      }
      console.log("not");
    },
  },
});
export default registerState;
