import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ command, isPreview }) => ({
  root: fileURLToPath(new URL("./playground", import.meta.url)),
  // GitHub Pages sirve el sitio en /<repo>/; solo `pnpm dev` usa la raíz.
  // `vite preview` también llega como "serve", por eso se excluye con isPreview.
  base: command === "serve" && !isPreview ? "/" : "/components-vue-3/",
  plugins: [vue()],
  build: {
    outDir: fileURLToPath(new URL("./dist-playground", import.meta.url)),
    emptyOutDir: true,
  },
}));
