import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        "ganan-nahariya": resolve(__dirname, "ganan-nahariya/index.html"),
        "ginun-nahariya": resolve(__dirname, "ginun-nahariya/index.html"),
        "synthetic-grass-nahariya": resolve(
          __dirname,
          "synthetic-grass-nahariya/index.html"
        ),
        "garden-maintenance-nahariya": resolve(
          __dirname,
          "garden-maintenance-nahariya/index.html"
        ),
        "ganan-north": resolve(__dirname, "ganan-north/index.html"),
      },
    },
  },
});
