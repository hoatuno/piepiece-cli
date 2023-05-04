import App from "./App.vue";
import { h } from "vue";
import { declarePiece } from "piepiece-cli";
declarePiece({
  name: "piece-vue",
  component: App,
  framework: "vue",
});

const PieceVue = h("piece-vue");
export default PieceVue;
