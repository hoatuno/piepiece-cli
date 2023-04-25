import { createRouter, createWebHistory } from "vue-router";
import Home from "./Home.vue";
import PieceReact from "./piece_react";
export default () =>
  createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: "/",
        name: "Home",
        component: Home,
      },
      {
        path: "/about",
        name: "About",
        component: () => import("./About.vue"),
      },
      {
        path: "/react",
        name: "PieceReact",
        component: PieceReact,
      },
    ],
  });
