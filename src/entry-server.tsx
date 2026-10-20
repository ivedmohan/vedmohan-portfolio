import { renderToPipeableStream, type PipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App.tsx";

export { routeMeta } from "./lib/routeMeta.ts";

const RENDER_TIMEOUT_MS = 10_000;

// Used only at build time by scripts/prerender.mjs. Resolves once every lazy
// section has loaded, so the stream carries the full page text.
export function render(url: string): Promise<PipeableStream> {
  return new Promise((resolve, reject) => {
    // A section that never settles would otherwise hang the build silently
    const timeout = setTimeout(() => {
      stream.abort();
      reject(new Error(`prerender of ${url} timed out after ${RENDER_TIMEOUT_MS}ms`));
    }, RENDER_TIMEOUT_MS);
    const stream = renderToPipeableStream(
      <StaticRouter location={url}>
        <App />
      </StaticRouter>,
      {
        onAllReady: () => {
          clearTimeout(timeout);
          resolve(stream);
        },
        onShellError: reject,
        onError: reject,
      },
    );
  });
}
