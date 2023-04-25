import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import federation from "@originjs/vite-plugin-federation";
// change port for each remote Piece
const PORT = 5001;

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: "Piece_Vue",
      filename: "remoteEntry.js",
      exposes: {
        "./remote": "./src/index.js",
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
