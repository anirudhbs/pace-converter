import postcss from "rollup-plugin-postcss";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import { readFileSync, writeFileSync, mkdirSync, existsSync, cpSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function html() {
  return {
    name: "html",
    writeBundle() {
      const html = readFileSync(join(__dirname, "src/index.html"), "utf-8");
      const publicDir = join(__dirname, "public");
      if (!existsSync(publicDir)) mkdirSync(publicDir, { recursive: true });
      const processed = html
        .replace("./main.js", "./main.js")
        .replace("./css/styles.css", "./styles.css");
      writeFileSync(join(publicDir, "index.html"), processed);
    },
  };
}

function copyStatic() {
  return {
    name: "copyStatic",
    writeBundle() {
      const src = join(__dirname, "static");
      const dest = join(__dirname, "public");
      if (!existsSync(dest)) mkdirSync(dest, { recursive: true });
      if (existsSync(src)) {
        cpSync(src, dest, { recursive: true });
      }
    },
  };
}

const isWatch = process.argv.includes("-w");

export default {
  input: "src/main.js",
  output: {
    dir: "public",
    format: "es",
    entryFileNames: "[name].js",
    assetFileNames: "[name][extname]",
  },
  watch: {
    exclude: ["public/**"],
  },
  plugins: [
    postcss({ extract: "styles.css", minimize: true }),
    resolve(),
    terser(),
    html(),
    copyStatic(),
    isWatch && serve({ contentBase: "public", port: 3000 }),
    isWatch && livereload("src"),
  ].filter(Boolean),
};
