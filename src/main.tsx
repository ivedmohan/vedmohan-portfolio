import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

const container = document.getElementById("root")!;
const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// Production builds ship prerendered markup (scripts/prerender.mjs); dev serves an empty root.
// A host's SPA fallback can serve that markup for another path, which must render fresh instead.
const currentPath = window.location.pathname.replace(/(.)\/+$/, "$1");
if (container.dataset.prerendered === currentPath) {
  hydrateRoot(container, app);
} else {
  container.replaceChildren();
  createRoot(container).render(app);
}
