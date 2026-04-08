# CMDb

Cyber-themed movie database built with Next.js (Pages Router), Redux, Arwes UI, and TMDb APIs.

## Current Stack (April 8, 2026)

- Runtime: Next.js `16.2.2` + React `19.2.4`
- State: Redux `5` + React Redux `9`
- Networking: Axios `1.14.0`
- PWA: `next-pwa` `5.6.0`
- Tooling: Bun, ESLint 10 flat config, Prettier 3, Bun test

## Development

Install dependencies:

```bash
bun install
```

Start local dev server:

```bash
bun run dev
```

Build for production:

```bash
bun run build
```

Start production server:

```bash
bun run start
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

## Upgrade and Refactor Notes

- Upgraded dependencies with Bun and resolved compatibility blockers.
- Explicitly run Next in webpack mode (`next dev/build --webpack`) because `next-pwa` uses webpack plugin hooks.
- Migrated linting to ESLint flat config (`eslint.config.mjs`) and removed legacy `.eslintrc.json`.
- Added baseline Bun tests in `utils/utils.test.js`.
- Moved global Google Font links from `_app` to `_document` for better loading behavior.
- Added API response cache headers in `pages/api/[...slug].js`.
- Fixed utility bugs:
  - `handleize` now correctly trims leading and trailing dashes.
  - `getRandomImage` now correctly maps to `00..09`.
  - `useLazyListData` now stops re-expanding after first trigger.
- Improved request behavior:
  - Replaced Axios cancel tokens with `AbortController` signals.
  - Added stable `useCallback` service methods and corrected effect dependency arrays.
  - Fixed person page ref typo (`re` -> `ref`) and unsafe optional spread usage.
  - Fixed search page request loop by removing unstable router dependency usage.
  - Fixed search router hydration/state synchronization race causing URL/input/result mismatch.
  - Fixed search page empty-query behavior to keep `/search` open instead of redirecting to home.
  - Fixed search clear behavior to reset URL to `/search` (removing stale `?query=...` params).
  - Fixed person page "Movies and Shows" card links to resolve media type correctly (`/movie/...` or `/tv/...` instead of `/undefined/...`).
  - Fixed search result date rendering to use `first_air_date` fallback for TV results.
  - Added default `name` attribute for search inputs to resolve browser form-field accessibility issues.

## Known Follow-ups

- Lint currently reports `@next/next/no-img-element` warnings in multiple files. This is non-blocking. Converting image surfaces to `next/image` is a separate optimization track.
