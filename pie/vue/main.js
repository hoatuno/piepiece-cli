import { createApp } from "vue";
import App from "./App.vue";
import createRouter from "./routers/router";

createApp(App).use(createRouter()).mount("#app");
