import App from "./App";
import { declarePiece } from "piepiece-cli";

declarePiece({
  name: "piece-react",
  component: App,
  framework: "react",
});
const PieceReact = () => <piece-React />;

export default PieceReact;
