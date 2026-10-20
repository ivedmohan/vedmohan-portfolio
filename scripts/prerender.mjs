// Writes the server-rendered HTML of each route into the client build so
// crawlers get page text without running JavaScript. Run after both
// `vite build` and `vite build --ssr src/entry-server.tsx --outDir dist-ssr`.
import fs from "node:fs/promises";
import path from "node:path";
import { Writable } from "node:stream";
import { pathToFileURL } from "node:url";

const ROUTES = ["/", "/about"];
const ROOT_PLACEHOLDER = '<div id="root"></div>';

const escapeHtml = (value) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Swap the route's values into index.html's <head>; a tag that is missing fails the build
function withMeta(html, meta) {
  const swaps = [
    ["<title>", "</title>", meta.title],
    ['<meta name="description" content="', '"', meta.description],
    ['<meta property="og:title" content="', '"', meta.socialTitle],
    ['<meta property="og:description" content="', '"', meta.socialDescription],
    ['<meta name="twitter:title" content="', '"', meta.socialTitle],
    ['<meta name="twitter:description" content="', '"', meta.socialDescription],
  ];
  return swaps.reduce((out, [open, close, value]) => {
    const start = out.indexOf(open);
    if (start === -1) throw new Error(`index.html has no ${open}`);
    const valueStart = start + open.length;
    const valueEnd = out.indexOf(close, valueStart);
    return out.slice(0, valueStart) + escapeHtml(value) + out.slice(valueEnd);
  }, html);
}

const distDir = path.resolve("dist");
const ssrDir = path.resolve("dist-ssr");

try {
  const template = await fs.readFile(path.join(distDir, "index.html"), "utf8");
  if (!template.includes(ROOT_PLACEHOLDER)) {
    throw new Error(`dist/index.html has no ${ROOT_PLACEHOLDER} to fill`);
  }

  const { render, routeMeta } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);

  function streamToString(stream) {
    return new Promise((resolve, reject) => {
      let html = "";
      const sink = new Writable({
        write(chunk, _encoding, callback) {
          html += chunk.toString();
          callback();
        },
      });
      sink.on("finish", () => resolve(html));
      sink.on("error", reject);
      stream.pipe(sink);
    });
  }

  for (const route of ROUTES) {
    const meta = routeMeta[route];
    if (!meta) throw new Error(`no routeMeta entry for ${route}`);
    const appHtml = await streamToString(await render(route));
    // data-prerendered tells src/main.tsx which route this markup belongs to
    const page = withMeta(template, meta).replace(
      ROOT_PLACEHOLDER,
      () => `<div id="root" data-prerendered="${route}">${appHtml}</div>`,
    );
    // Static hosts differ on whether /about resolves to about.html or about/index.html, so write both
    const outFiles =
      route === "/"
        ? [path.join(distDir, "index.html")]
        : [path.join(distDir, `${route}.html`), path.join(distDir, route, "index.html")];
    for (const outFile of outFiles) {
      await fs.mkdir(path.dirname(outFile), { recursive: true });
      await fs.writeFile(outFile, page);
      console.log(`prerendered ${route} -> ${path.relative(process.cwd(), outFile)}`);
    }
  }
} finally {
  // Never leave the SSR bundle behind; eslint only ignores dist/
  await fs.rm(ssrDir, { recursive: true, force: true });
}
