import { defineStore } from "pinia";
import db from "../../config/firebase.js";
import { geneticInputCheck } from "../../pubFunction/inputCheck.js";
import alertState from "../alert/index.js";
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
    async onRegister() {
      // connect to the alert
      const alert = alertState();
      const login = loginState();

      // check same
      if (this.password !== this.confirmPassword) {
        alert.title = "Input Check Failed";
        alert.content = "Password not same";
        return false;
      }
      // make geneticInputCheck
      if (geneticInputCheck(this.stateWrap)) {
        // check user to register
        const chkUser = await db.checkoutValue("users/" + this.username);
        if (chkUser.state) {
          // already have user
          alert.title = "Register Failed";
          alert.content = "Already have this user,Please use another one..";
          return false;
        }

        // interact with db and modal card
        const chkBundler = await db.checkoutValue(
          "users/" + this.username + "/" + this.password
        );
        await db.updateValue(chkBundler.ref, {
          data: "ArrayInit",
        });

        await login.onLogin(this); // call the onLogin to register the monitor etc.

        // make an alert success
        alert.title = "Success Registered";
        alert.content = `Welcome ${this.username}`;

        console.log("ok");
        return true;
      }
      console.log("not");
    },
  },
});
export default registerState;
