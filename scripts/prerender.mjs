// Writes the server-rendered HTML of each route into the client build so
// crawlers get page text without running JavaScript. Run after both
// `vite build` and `vite build --ssr src/entry-server.tsx --outDir dist-ssr`.
import fs from "node:fs/promises";
import path from "node:path";
import { Writable } from "node:stream";
import { pathToFileURL } from "node:url";

const ROUTES = ["/", "/about"];
const ROOT_PLACEHOLDER = '<div id="root"></div>';

const distDir = path.resolve("dist");
const ssrDir = path.resolve("dist-ssr");

const template = await fs.readFile(path.join(distDir, "index.html"), "utf8");
if (!template.includes(ROOT_PLACEHOLDER)) {
  throw new Error(`dist/index.html has no ${ROOT_PLACEHOLDER} to fill`);
}

const { render } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);

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
  const appHtml = await streamToString(await render(route));
  // data-prerendered tells src/main.tsx which route this markup belongs to
  const page = template.replace(
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

await fs.rm(ssrDir, { recursive: true, force: true });
