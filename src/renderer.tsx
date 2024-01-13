import "hono";
import { Style } from "hono/css";
import { html } from "hono/html";
import { jsxRenderer } from "hono/jsx-renderer";

declare module "hono" {
  interface ContextRenderer {
    (content: string | Promise<string>, props?: { title?: string }): Response;
  }
}

export const renderer = jsxRenderer(
  ({ children }) => {
    return (
      <html>
        <script src="https://cdn.jsdelivr.net/npm/alpinejs@3.13.1/dist/cdn.min.js"></script>
        <head>
          <link rel="icon" href="/static/favicon.ico" id="favicon" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/apple-touch-icon-180x180.png"
          />
          <meta property="og:url" content="https://lgtl.pages.dev/" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="LGTLatte" />
          <meta property="og:description" content="らてさんのLGTM画像集" />
          <meta property="og:site_name" content="LGTLatte" />
          <meta property="og:image" content="/static/ogp.png" />
          <Style />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          ></meta>
          <meta name="google" value="notranslate" />
          <link href="/static/style.css" rel="stylesheet" />
          <title>LGTLatte 🐈</title>
        </head>
        <body>{children}</body>
      </html>
    );
  },
  {
    docType: true,
  }
);
