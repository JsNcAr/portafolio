# Development

## Prerequisites

| Tool | Version | Why |
|---|---|---|
| Node | **22.12 or later** | Astro 7 refuses to start on Node 20 |
| npm | 10+ | ships with Node 22 |
| Python | 3.x | three static gates are Python scripts |
| Caddy | 2.6+ | only for `npm run serve` |

This machine's system Node is 20.19.2, which Astro rejects. Node 22 is installed
under nvm and pinned by `.nvmrc`, and nvm's default alias is deliberately left as
`system` so nothing else on the server changed. **Every session starts with:**

```bash
nvm use
```

Skipping it produces `Node.js v20.19.2 is not supported by Astro!`.

## Setup

```bash
nvm use
npm ci
npm run dev
```

`npm ci` rather than `npm install`: it installs exactly the lockfile and fails
loudly if `package.json` and the lockfile disagree.

## Daily commands

```bash
npm run dev            # hot-reloading dev server
npm run check          # TypeScript + Astro diagnostics; expect 0 errors
npm run build          # static build to dist/
npm run serve          # dist/ behind the real production Caddyfile
npm run gate           # build + every quality gate
```

### Looking at a page

Gates prove correctness, not that a page looks right. See
[Quality gates → What the gates cannot see](quality-gates.md#what-the-gates-cannot-see)
for why this step is not optional.

```bash
npm run build
npm run gate:prepare                                   # makes .gate-site/
npm run shot -- .gate-site/work/index.html --full
npm run shot -- .gate-site/work/index.html --full --dark
npm run shot -- .gate-site/work/index.html --width=390 --full
```

Screenshots are written next to the file unless `--out=` says otherwise, and are
gitignored.

## Project layout

```
src/
  pages/            Thin route files. One per URL, per locale.
  content/work/     Case studies as MDX: <locale>/<slug>.mdx.
  components/
    pages/          One component per page, taking `locale` as a prop.
    *.astro         Shared UI: header, footer, cards, icons.
  layouts/Base.astro  HTML shell: head, metadata, skip link, header, footer.
  data/             Typed content: cv.ts (roles, education), repos.ts, services.ts.
  i18n/             ui.ts (string table) and utils.ts (helpers).
  lib/              Small pure helpers (price, seo, signal, tokens, whatsapp).
  styles/           theme.css (generated) and base.css (element defaults).
  assets/           Images: portrait, site screenshots, project screenshots.
public/             Copied verbatim: CV PDF, robots.txt, favicons, OG cards, webmanifest.
scripts/            Build, gate, capture and preview tooling.
deploy/             Caddyfile and deployment instructions.
harness/            A standalone page the render gates check alongside the build.
docs/               This documentation.
```

## Adding a page

Four steps, in order:

1. Add its strings to **both** locale blocks in `src/i18n/ui.ts`. The type is
   derived from the English block, so a missing Spanish key is a type error.
2. Write `src/components/pages/<Name>Page.astro` taking `{ locale }`.
3. Add two thin routes: `src/pages/<slug>.astro` and `src/pages/es/<slug>.astro`.
4. If it belongs in the navigation, add it to the `links` array in
   `src/components/SiteHeader.astro`.

Then `npm run check && npm run gate`, and look at it.

## What is not built yet

- **A factual review of the case studies.** They are written from the CV plus
  standard engineering exposition of the named technologies. Nothing is invented,
  but only Jason can confirm that the emphasis and the reasoning match what
  actually happened.
- **Further case-study metrics.** Personally AI carries measured outcomes
  (60+ accounts, ~80% less effort, team 1 to 5). Apollyon and Atonga are
  architecture stories without measured figures; adding real metrics where data
  becomes available without estimating is an ongoing improvement.
- **Manual accessibility testing.** See
  [Accessibility → What is not automated](accessibility.md#what-is-not-automated).
