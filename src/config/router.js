import {createRouter, createWebHistory} from "vue-router";
import listing from "../pages/listing.vue";
import posting from "../pages/posting.vue";
import login from "../pages/login.vue";
import register from "../pages/register.vue";

const router = createRouter({
    history: createWebHistory(), routes: [

        {
            path: "/", redirect:"/listing"
        },
        {
            path: "/listing", component: listing
        },
        {
            path: "/posting", component: posting
        },
        {
            path: "/login", component: login
        },
        {
            path: "/register", component: register
        }]
})
export default router;