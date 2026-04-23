import postcss from "rollup-plugin-postcss";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function html() {
  return {
    name: "html",
    writeBundle() {
      const html = readFileSync(join(__dirname, "src/index.html"), "utf-8");
      const dist = join(__dirname, "dist");
      if (!existsSync(dist)) mkdirSync(dist, { recursive: true });
      const processed = html
        .replace("./main.js", "./main.js")
        .replace("./css/styles.css", "./styles.css");
      writeFileSync(join(dist, "index.html"), processed);
    },
  };
}

const isWatch = process.argv.includes("-w");

export default {
  input: "src/main.js",
  output: {
    dir: "dist",
    format: "es",
    entryFileNames: "[name].js",
    assetFileNames: "[name][extname]",
  },
  plugins: [
    postcss({ extract: "styles.css", minimize: true }),
    resolve(),
    terser(),
    html(),
    isWatch && serve({ contentBase: "dist", port: 3000 }),
    isWatch && livereload("dist"),
  ].filter(Boolean),
};
