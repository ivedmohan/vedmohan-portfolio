// Per-route <head> values. scripts/prerender.mjs writes them into each page's static HTML,
// and App keeps document.title / the description in sync on client-side navigation.
// "/" mirrors index.html, which stays the fallback for the dev server.
export type RouteMeta = {
  title: string;
  description: string;
  socialTitle: string;
  socialDescription: string;
};

export const routeMeta: Record<string, RouteMeta> = {
  "/": {
    title: "Ved Mohan | Founder, Builder & Product Developer",
    description:
      "Portfolio of Ved Mohan — founder, builder, freelancer, and product developer working across Web3, AI agents, and practical software products.",
    socialTitle: "Ved Mohan | Portfolio",
    socialDescription:
      "Founder, builder, freelancer, and product developer working across Web3, AI agents, and practical software products.",
  },
  "/about": {
    title: "About | Ved Mohan",
    description:
      "About Ved Mohan: founder, builder, and product developer based in New Delhi. What I've shipped across Web3, AI agents, and business software, and how to reach me.",
    socialTitle: "About Ved Mohan",
    socialDescription:
      "Founder, builder, and product developer based in New Delhi. What I've shipped and how to reach me.",
  },
};

/** Route key for a pathname: "/about/" and "/about" share one entry. */
export const normalizePath = (pathname: string) => pathname.replace(/(.)\/+$/, "$1");
