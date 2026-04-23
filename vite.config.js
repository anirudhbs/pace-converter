import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  base: "./",
  root: "src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  plugins: [
    tailwindcss(),
    viteStaticCopy({
      targets: [
        { src: "../static/manifest.json", dest: "." },
        { src: "../static/sw.js", dest: "." },
        { src: "../icons/icon-192.svg", dest: ".", rename: "icons/icon-192.svg" },
        { src: "../icons/icon-512.svg", dest: ".", rename: "icons/icon-512.svg" },
      ],
    }),
  ],
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
});