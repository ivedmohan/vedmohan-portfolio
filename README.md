# vedmohan-portfolio

Ved Mohan's personal portfolio: a single-page site built with Vite, React 18,
TypeScript, Tailwind CSS and shadcn/ui.

## Setup

Requirements:

- **Node.js 24** (pinned in `.nvmrc` and `package.json` `engines`; this matches
  the Vercel project's Node.js version)
- **npm**: `package-lock.json` is the only lockfile, and Vercel installs with
  npm too. Don't use bun, yarn or pnpm.

```sh
nvm use          # or install Node 24 another way
npm ci           # install exactly what package-lock.json records
npm run dev      # start the Vite dev server on http://localhost:8080
```

Other scripts:

| Command              | What it does                         |
| -------------------- | ------------------------------------ |
| `npm run lint`       | Run ESLint over the repo             |
| `npm test`           | Run the Vitest suite once            |
| `npm run test:watch` | Run Vitest in watch mode             |

## Build

```sh
npm run build    # production build into dist/
npm run preview  # serve dist/ locally to check the production build
```

`npm run build:dev` builds with Vite's development mode, for debugging a build.

## Deploy

The site is deployed on **Vercel** (project `vedmohan`, framework preset
**Vite**). It is connected to this GitHub repository:

- A push to `main` deploys to **production**.
- Every other branch and pull request gets a **preview** deployment.

On each deploy, Vercel runs `npm install`, then `npm run build`, and serves
`dist/` on Node.js 24.x. You don't need any manual deploy step. To deploy by
hand from your machine, use the Vercel CLI: `vercel` makes a preview deploy and
`vercel --prod` makes a production deploy.

If you change the Node version, update the Vercel project setting, `.nvmrc` and
`package.json` `engines` together.
