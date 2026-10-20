# Project Context — vedmohan-portfolio

This is Ved Mohan's personal portfolio site: a single-page marketing site
(founder/builder/product-developer positioning), not an app. Read this before
making changes — it's the project-level brief a Worker gets alongside a ticket.

---

## Stack

- **Build tool:** Vite 5 (`@vitejs/plugin-react-swc`) — **not** Next.js
- **Framework:** React 18 + TypeScript
- **Routing:** `react-router-dom`, client-side only
- **UI kit:** shadcn/ui on Radix UI primitives, `lucide-react` icons
- **Styling:** Tailwind CSS + `tailwindcss-animate`
- **Animation:** `framer-motion`, `gsap`, `@studio-freight/lenis` (smooth scroll)
- **Origin:** bootstrapped via Lovable — `lovable-tagger` is still a dev
  dependency and `package.json`'s `name` field is still the Lovable default
  (`vite_react_shadcn_ts`); this is cosmetic, not a sign the scaffold changed
- **Build command:** `npm run build` → `vite build` → static output in `dist/`
- **Deploy:** Vercel, using its zero-config Vite auto-detection (build
  `vite build`, output `dist`). There is no `vercel.json` and no environment
  variables are used anywhere in the app.

## Folder structure

```
src/
  pages/        Index.tsx (the entire one-page site), NotFound.tsx
  components/   one file per page section (AboutSection, ExperienceSection,
                 ProjectsSection, TechStackSection, etc.)
  components/ui/ shadcn-generated primitives (button, dialog, card, ...)
  hooks/        useSmoothScroll, useParallax, use-mobile, use-toast
  lib/utils.ts  cn() helper (clsx + tailwind-merge)
  test/         vitest setup + example test
public/         favicon, robots.txt, placeholder.svg, catbike.mp4 (hero video)
```

Path alias `@/*` → `src/*` (defined in `vite.config.ts` and `tsconfig`).

## Routing

There's effectively one route. `src/App.tsx` registers `/` → `Index` and a
catch-all `*` → `NotFound`. The in-page nav ("About", "Experience", "Projects",
"Content") is `#anchor` hash links scrolling within `Index.tsx`, not real
routes. Section components are lazy-loaded (`React.lazy`) for performance, with
`AboutSection`/`CapabilitiesSection` loaded eagerly as the only above-the-fold
sections.

## Where page copy lives

Currently: **hardcoded inline in JSX**, scattered across `Index.tsx` and each
`src/components/*Section.tsx` file — headline text, bio copy, email/social
links, the CV link, and even the background video URLs are written directly
into components. There is no `src/data/` or `src/content/` directory today.

**Going forward:** consolidate copy into a single content file (e.g.
`src/content/site.ts` exporting a typed object) that components import from,
rather than adding new hardcoded strings to more component files. Don't do a
big-bang migration of all existing copy as a side effect of an unrelated
ticket — introduce the content file when a ticket actually touches copy, and
move only what that ticket touches.

## Styling

- **Dark-only.** The theme is intentionally fixed dark/black — there is no
  light mode toggle and none should be added as an incidental part of other
  work. (Note: `next-themes` is an installed-but-unused dependency — see Known
  Issues.)
- Reuse the existing Tailwind design tokens (the CSS variables in
  `src/index.css`, mapped in `tailwind.config.ts` — `--background`,
  `--foreground`, `--card`, `--primary`, etc.) rather than introducing new
  hardcoded colors.
- Reuse existing shadcn/ui components from `src/components/ui/` instead of
  hand-rolling new primitives (buttons, dialogs, cards, etc. already exist).
- Match the current visual language: the glassmorphism look (`.liquid-glass`,
  `.aave-glass`, `.aave-nav` utility classes in `src/index.css`), the
  `Instrument Serif` display font for headings, and the existing spacing/motion
  conventions (`framer-motion` fade/slide-in patterns already used across
  section components).

## Rules for changes

- **No new dependencies without justifying them in the PR description.** This
  is a small static site — most needs can be met with what's already
  installed (Radix/shadcn, framer-motion, gsap, lucide-react).
- **`npm run build` must pass** before a change is considered done.
- **Don't touch unrelated files.** Scope changes to what the ticket actually
  asks for — this is a one-page site where it's easy to "while I'm in here"
  touch five other sections; don't.
- **Keep all copy in one content file going forward** (see "Where page copy
  lives" above) rather than adding more hardcoded strings to component files.

## Known issues

Documented here for awareness only — do not fix these as a side effect of an
unrelated ticket. Fix them only if a ticket specifically asks for it.

1. **Three lockfiles are committed simultaneously** (`bun.lock`, `bun.lockb`,
   `package-lock.json`) — it's ambiguous which package manager is
   authoritative, and `bun.lockb` is a binary file duplicating the newer text
   `bun.lock`.
2. **`package.json`'s `name` field** (`"vite_react_shadcn_ts"`) was never
   updated from the Lovable scaffold default.
3. **`next-themes` is installed but unused** — there's no theme toggle; the
   site is hardcoded dark-only (see Styling above).
4. **`README.md` is a one-line Lovable placeholder** ("TODO: Document your
   project here") with no real setup/deploy docs.
5. **Playwright is fully configured** (`playwright.config.ts`,
   `playwright-fixture.ts`) **but has zero test specs** — an incomplete setup.
6. **`TestimonialsSection` is imported but commented out** in `src/pages/
   Index.tsx` (dead code left in place).
7. **No `.nvmrc`/`engines` field** — the Node version isn't pinned anywhere,
   which matters for reproducible Vercel builds.
8. **External media dependency outside this repo's control:** the "Connect"
   section's background video and the Open Graph/Twitter card image
   (`index.html`) both point to a third-party CloudFront URL
   (`d8j0ntlcm91z4.cloudfront.net/user_.../hf_...mp4`) rather than an asset
   hosted in `public/`.
9. **Page copy is scattered across components** rather than centralized (see
   "Where page copy lives" above) — not itself a bug, but the reason for the
   "keep all copy in one content file going forward" rule.
