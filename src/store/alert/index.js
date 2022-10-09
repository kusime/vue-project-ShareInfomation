import { defineStore } from "pinia";

const alertState = defineStore("alert", {
  state() {
    return {
      show: false,
      title: "Default Alert Title",
      content: "Default Alert Content",
    };
  },
  getters: {},
  actions: {},
});
export default alertState;
