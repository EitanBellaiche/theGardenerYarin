import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  // Multi-page site: unknown paths must not fall back to index.html. This keeps
  // dev/preview in line with Cloudflare Pages, which serves 404.html with HTTP 404.
  appType: "mpa",
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
        "not-found": resolve(__dirname, "404.html"),
        "garden-development": resolve(__dirname, "garden-development/index.html"),
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
        "development-infrastructure": resolve(
          __dirname,
          "development-infrastructure/index.html"
        ),
        "institutional-maintenance": resolve(
          __dirname,
          "institutional-maintenance/index.html"
        ),
        "tree-pruning": resolve(__dirname, "tree-pruning/index.html"),
        accessibility: resolve(__dirname, "accessibility/index.html"),
      },
    },
  },
});
