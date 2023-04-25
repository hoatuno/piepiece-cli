import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
// change port for each remote Piece
const PORT = 5001;

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "Piece_React",
      filename: "remoteEntry.js",
      exposes: {
        "./remote": "./src/index.jsx",
      },
    }),
  ],
  base:
    process.env.NODE_ENV === "production" ? `http://localhost:${PORT}/` : "/",
  server: {
    port: PORT,
  },
  build: {
    target: "esnext",
  },
  preview: {
    port: PORT,
  },
});
