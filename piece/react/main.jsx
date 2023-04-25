import React from "react";
import ReactDOM from "react-dom/client";
const PieceReact = React.lazy(() => import("./index.jsx"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PieceReact />
  </React.StrictMode>
);
