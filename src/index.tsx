import { Hono } from "hono";
import { renderer } from "./renderer";
import { Home } from "./Home";

const app = new Hono();

app.get("*", renderer);
interface Env {
  R2_BUCKET: R2Bucket;
  R2_URL: string;
  LATTE_TOKEN: string;
}

app.get("/", async (c) => {
  const obj = await (c.env as unknown as Env).R2_BUCKET.list();
  const r2Url = await (c.env as unknown as Env).R2_URL;
  if (obj === null) {
    return new Response("Not found", { status: 404 });
  }
  const imageUrls = obj.objects.map((o) => `${r2Url}/${o.key}`);
  return c.render(<Home imageUrls={imageUrls} />);
});

app.get("/api", async (c) => {
  if (c.req.header("LatteToken") !== (c.env as unknown as Env).LATTE_TOKEN) {
    return new Response("Not found", { status: 404 });
  }
  const obj = await (c.env as unknown as Env).R2_BUCKET.list();
  const r2Url = await (c.env as unknown as Env).R2_URL;
  if (obj === null) {
    return new Response("Not found", { status: 404 });
  }
  const imageUrls = obj.objects.map((o) => `${r2Url}/${o.key}`);

  return c.json({
    imageUrls,
  });
});

export const onRequest: PagesFunction<Env> = async (context) => {
  const obj = await context.env.R2_BUCKET.get("some-key");
  if (obj === null) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(obj.body);
};

export default app;
