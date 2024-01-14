import { Hono } from "hono";
import { renderer } from "./renderer";
import { Home } from "./Home";
import { basicAuth } from "hono/basic-auth";
import { Uploader } from "./Uploader";

type Env = {
  Bindings: {
    R2_BUCKET: R2Bucket;
    R2_URL: string;
    LATTE_TOKEN: string;
    BASIC_USER_NAME: string;
    BASIC_PASSWORD: string;
    MODE: string;
  };
};
const app = new Hono<Env>();

app.get("/", renderer);

const shuffleArray = (array: string[]) => {
  return array.slice().sort(() => Math.random() - Math.random());
};
app.get("/", async (c) => {
  const mode = c.env.MODE;
  if (mode === "development")
    return c.render(
      <Home
        imageUrls={[
          "https://latte-images.mooriii.com/4dc4ceef-d866-43ee-b23d-5c9cbd14f908.webp",
          ...new Array(40)
            .fill(1)
            .map(
              (_, i) =>
                `https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Flgtl.pages.dev%2Fstatic%2Fogp.png?aa=${Math.random()}`
            ),
        ]}
      />
    );
  const obj = await c.env.R2_BUCKET.list();
  const r2Url = c.env.R2_URL;
  if (obj === null) {
    return new Response("Not found", { status: 404 });
  }
  const imageUrls = shuffleArray(obj.objects.map((o) => `${r2Url}/${o.key}`));

  return c.render(<Home imageUrls={imageUrls} />);
});
app.use("/upload", async (c, next) => {
  const username = c.env.BASIC_USER_NAME;
  const password = c.env.BASIC_PASSWORD;
  return basicAuth({
    username,
    password,
  })(c, next);
});

app.get("/upload", async (c) => {
  return c.render(
    <html>
      <script src="https://cdn.jsdelivr.net/npm/alpinejs@3.13.1/dist/cdn.min.js"></script>
      <head>
        <link rel="icon" href="/static/favicon.ico" id="favicon" />
      </head>
      <body>
        <Uploader />
      </body>
    </html>
  );
});

app.get("/api", async (c) => {
  if (c.req.header("LatteToken") !== c.env.LATTE_TOKEN) {
    return new Response("Not found", { status: 404 });
  }
  const obj = await c.env.R2_BUCKET.list();
  const r2Url = await c.env.R2_URL;
  if (obj === null) {
    return new Response("Not found", { status: 404 });
  }
  const imageUrls = obj.objects.map((o) => `${r2Url}/${o.key}`);

  return c.json({
    imageUrls,
  });
});

export default app;
