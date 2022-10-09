import { defineStore } from "pinia";

const alertState = defineStore("alert", {
  state() {
    return {
      title: "Default Alert Title",
      content: "Default Alert Content",
    };
  },
});
export default alertState;
