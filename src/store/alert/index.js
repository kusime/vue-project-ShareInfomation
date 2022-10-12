import { defineStore } from "pinia";

const alertState = defineStore("alert", {
  state() {
    return {
      title: "Requesting ..",
      content: "Please wait .. this will take some time...",
    };
  },
});
export default alertState;
