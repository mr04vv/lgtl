import pages from "@hono/vite-cloudflare-pages";
import devServer from "@hono/vite-dev-server";
import { defineConfig } from "vite";
import path from "path";
export default defineConfig({
  plugins: [
    pages(),
    devServer({
      entry: "src/index.tsx",
      cf: {
        bindings: {
          NAME: "R2_BUC",
        },
        r2Buckets: ["latte-image"],
      },
    }),
  ],
});
