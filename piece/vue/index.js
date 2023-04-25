import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import { definePiece } from "piepiece-cli";

definePiece({
  name: "piece-vue",
  component: App,
  framework: "vue",
});

const PieceVue = definePiece.component;

const app = createApp(App);
app.component("piece-vue", PieceVue);
app.mount("#app");
