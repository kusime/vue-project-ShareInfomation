import {defineStore} from "pinia";
import getDate from "../../pubFunction/getDate.js";


const mainPageStore = defineStore('submit', {
    state() {
        return {
            title: "",
            content: "",
        }
    },
    getters: {
        dataPackage: function (state) {
            const currentDate = getDate();
            return {title: state.title, content: state.content, date: currentDate}
        },
    },
    actions: {}
})
export default mainPageStore