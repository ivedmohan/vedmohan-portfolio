import { renderToPipeableStream, type PipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App.tsx";

// Used only at build time by scripts/prerender.mjs. Resolves once every lazy
// section has loaded, so the stream carries the full page text.
export function render(url: string): Promise<PipeableStream> {
  return new Promise((resolve, reject) => {
    const stream = renderToPipeableStream(
      <StaticRouter location={url}>
        <App />
      </StaticRouter>,
      {
        onAllReady: () => resolve(stream),
        onShellError: reject,
        onError: reject,
      },
    );
  });
}
