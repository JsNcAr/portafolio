# jasonarias.dev

Personal site for Jason Nicolás Arias Gómez — Python backend engineer, Bogotá.

Static Astro build, English and Spanish, served by Caddy from a self-administered
Debian server. No runtime on the server, no database, no tracking.

## Quick start

```bash
nvm use              # Node 22 (pinned in .nvmrc)
npm ci
npm run dev          # http://localhost:4321, hot reload
```

## The commands you will actually use

| Command | What it does |
|---|---|
| `npm run dev` | Astro dev server with hot reload |
| `npm run build` | Static build to `dist/` |
| `npm run serve` | Serve `dist/` through the **real** `deploy/Caddyfile` |
| `npm run serve:build` | Build, then serve |
| `npm run check` | TypeScript and Astro diagnostics |
| `npm run gate` | Build plus every quality gate. Must be green before deploying |
| `npm run tokens` | Regenerate `src/styles/theme.css` from `design-tokens.json` |
| `npm run shot -- <file>` | Screenshot a built page for visual review |

## Documentation

Full documentation is in [`docs/`](docs/README.md). Start with
[Development](docs/development.md) to work on it, or
[Deployment](docs/deployment.md) to ship it.

## Requirements

- **Node 22.12 or later.** Astro 7 refuses to run on Node 20. `.nvmrc` pins it;
  this machine's system Node is older, so `nvm use` is not optional.
- **Python 3** for three of the static gates.
- **Caddy** for `npm run serve` (optional; `npm run preview` is the fallback).
