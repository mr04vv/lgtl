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
  const imageUrls = [
    "https://media.gettyimages.com/id/155284552/ja/%E3%82%B9%E3%83%88%E3%83%83%E3%82%AF%E3%83%95%E3%82%A9%E3%83%88/tabby-%E7%8C%AB%E3%81%AE%E3%83%9D%E3%83%BC%E3%83%88%E3%83%AC%E3%83%BC%E3%83%88%E7%99%BD%E8%83%8C%E6%99%AF.jpg?s=612x612&w=gi&k=20&c=oHieCgMLvy2CnOmxxoUmbMrxd0uumMUrbHELZX2eO_g=",
  ];
  return c.render(<Home imageUrls={imageUrls} />);
  const obj = await (c.env as unknown as Env).R2_BUCKET.list();
  const r2Url = await (c.env as unknown as Env).R2_URL;
  if (obj === null) {
    return new Response("Not found", { status: 404 });
  }
  // const imageUrls = obj.objects.map((o) => `${r2Url}/${o.key}`);
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
