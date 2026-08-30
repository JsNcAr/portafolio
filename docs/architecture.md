# Architecture

## Shape

A static site. `npm run build` emits HTML, CSS, fonts and one small script into
`dist/`; Caddy serves those files. There is no server-side runtime, no database,
no API, and nothing to keep patched beyond Caddy itself.

```
design-tokens.json ──[npm run tokens]──> src/styles/theme.css
                                              │
src/data/*.ts ──┐                             │
src/i18n/ui.ts ─┼──> components/pages/*.astro ┼──> Base.astro ──> dist/**/*.html
public/* ───────┘                             │
                                     src/styles/base.css
```

## Rendering

Everything renders at build time. The only JavaScript that reaches the browser is
the theme toggle plus a small inline script in `<head>` that applies a stored
theme before first paint, so a dark-mode reader never sees a flash of the light
palette. Remove those two and the site is pure HTML and CSS.

## Routing

Astro maps files in `src/pages/` to URLs. `trailingSlash: 'never'` and
`build.format: 'directory'` mean `/work` is served from `dist/work/index.html`,
and Caddy's `try_files` resolves that.

Route files are deliberately three lines each:

```astro
---
import WorkPage from '@components/pages/WorkPage.astro';
---

<WorkPage locale="en" />
```

The page lives in `src/components/pages/` and takes `locale` as a prop, so the
English and Spanish routes share one implementation and cannot drift apart. Only
the locale differs.

## Data flow

Content is typed TypeScript, not Markdown or a CMS:

- `src/data/cv.ts` — roles, highlights, education, certifications, contact. Every
  prose field is `Record<Locale, string>`, so an untranslated string is a compile
  error rather than a silent English fallback in production.
- `src/data/repos.ts` — the curated public repositories, with our own blurbs
  rather than GitHub's descriptions.
- `src/i18n/ui.ts` — interface strings for both locales.

See [ADR 0003](decisions/0003-typed-data-not-cms.md) for why.

## Styling

Three layers, in cascade order:

1. **`src/styles/theme.css`** — generated from `design-tokens.json`. CSS custom
   properties only. Never edited by hand.
2. **`src/styles/base.css`** — element defaults and a few layout primitives
   (`.shell`, `.flow`, `.prose`, `.overline`, `.sr-only`). Every value references
   a token; no literals.
3. **Astro scoped `<style>` blocks** — component styling, automatically scoped by
   a `data-astro-cid-*` attribute so component rules cannot leak.

Both `theme.css` and `base.css` are imported once, in `Base.astro`. No page
defines its own palette.

> A collision between a `base.css` primitive and a component class silently broke
> every tech-pill row while all seventeen gates passed. The primitive was called
> `.stack`, and "stack" also means "tech stack" here. It is now `.flow`. Prefer
> specific names for shared primitives.

## Internationalisation

Two locales, English at the root and Spanish under `/es/`. Configured in
`astro.config.mjs` with `prefixDefaultLocale: false`.

Paths are written once, English-rooted, and `localePath(locale, path)` prefixes
them. So a link to `/work` becomes `/work` in English and `/es/work` in Spanish,
and the language switch maps the current page to its counterpart rather than
dumping the reader on the home page.

`Base.astro` emits `<html lang>`, a canonical URL, `hreflang` alternates for both
locales plus `x-default`, and Open Graph tags. Error pages opt out with
`noindex`, since a 404 should not claim a canonical URL.

## Build and asset pipeline

Astro and Vite hash every asset (`/_astro/Base.DL5_rSQ3.css`) so it can be cached
permanently, while HTML revalidates on every request. Fonts are self-hosted
subsets from fontsource, bundled into `/_astro/` with the rest. No request leaves
the origin at runtime, which is what makes the strict CSP in `deploy/Caddyfile`
possible.

## Non-goals

- **No client-side framework.** Nothing on the site needs one.
- **No analytics or tracking.** Stated in the footer; enforced by the CSP.
- **No server-side rendering.** Static output is what makes deployment a file copy.
