import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Messages from "../views/Messages.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/messages",
    name: "messages",
    component: Messages,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
