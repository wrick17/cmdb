# CMDb

Cyber-themed movie database built with React, Rsbuild, Redux, Arwes UI, and the TMDb API.

## Stack

- Runtime: React `19.2.4` + React Router `8`
- Build: Rsbuild `2`
- State: Redux `5` + React Redux `9`
- Hosting: Cloudflare Pages + Pages Functions
- PWA: Workbox via `rsbuild-plugin-pwa`
- Tooling: Bun, ESLint 10 flat config, Prettier 3, Bun test

## Development

Install dependencies:

```bash
bun install
```

Create `.dev.vars` with a TMDb API key:

```dotenv
TMDB_API_KEY=your_key
```

Start the Rsbuild development server:

```bash
bun run dev
```

The app is served at `http://localhost:3000`. Rsbuild proxies `/api/*` during development without exposing the key to the browser bundle.

Build for production:

```bash
bun run build
```

Preview the built app with the real Pages Functions runtime at `http://localhost:8788`:

```bash
bun run preview
```

## Quality Checks

Lint:

```bash
bun run lint
```

Test:

```bash
bun test
```

Format check:

```bash
bun run format
```

## Deployment

Cloudflare Pages is configured by `wrangler.jsonc`. The Git project settings are:

- Production branch: `master`
- Build command: `bun run build`
- Build output: `dist`

Set the encrypted API key for both production and preview environments as `TMDB_API_KEY`. For a manual deployment:

```bash
bunx wrangler pages secret put TMDB_API_KEY --project-name cmdb
bun run deploy
```

The browser only calls same-origin `/api/*` routes. The Pages Function attaches the API key, preserves TMDb response status, and edge-caches successful requests for five minutes.
