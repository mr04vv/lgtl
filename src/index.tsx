import { Hono } from "hono";
import { renderer } from "./renderer";
import { Home } from "./Home";

const app = new Hono();

app.get("*", renderer);

app.get("/", (c) => {
  return c.render(<Home />);
});

interface Env {
  R2_BUCKET: R2Bucket;
}

app.get("/about", async (c) => {
  const obj = await (c.env as unknown as Env).R2_BUCKET.get("image.webp");
  if (obj === null) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(obj.body);
});

export const onRequest: PagesFunction<Env> = async (context) => {
  const obj = await context.env.R2_BUCKET.get("some-key");
  if (obj === null) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(obj.body);
};

export default app;
