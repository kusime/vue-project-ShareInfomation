import { createRouter, createWebHistory } from "vue-router";
import posting from "../pages/posting.vue";
import login from "../pages/login.vue";
import register from "../pages/register.vue";
import posts from "../pages/posts.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/posts/globalPosts",
    },
    {
      path: "/posts/:type",
      component: posts,
    },
    {
      path: "/posting",
      component: posting,
    },
    {
      path: "/login",
      component: login,
    },
    {
      path: "/register",
      component: register,
    },
  ],
});
export default router;
