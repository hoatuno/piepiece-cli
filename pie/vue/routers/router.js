import { createRouter, createWebHistory } from "vue-router";

export default () =>
  createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: "/",
        name: "Home",
        component: () => import("./Home.vue"),
      },
      {
        path: "/about",
        name: "About",
        component: () => import("./About.vue"),
      },
      {
        path: "/react",
        name: "PieceReact",
        component: () => import("./piece_react"),
      },
      {
        path: "/vue",
        name: "PieceVue",
        component: () => import("./piece_vue"),
      },
    ],
  });
