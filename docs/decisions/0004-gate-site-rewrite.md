# 4. Rewriting asset paths before running render gates

- **Status:** Accepted
- **Date:** 2026-08-30

## Context

The design-system render gates load a page with `'file://' + resolve(path)` —
`measure_render.mjs`, `verify_states.mjs`, `axe_audit.mjs` and the rest all do
this. They do not accept URLs.

An Astro build links its assets absolutely: `<link href="/_astro/x.css">`. Under
`file://`, a leading `/` resolves to the **filesystem root**, not the site root.
So no stylesheet, font or script loads.

The gates then measured unstyled black-on-white text and reported **PASS**. Seventeen
green gates over pages that had never applied a single rule of their own CSS.

A false pass is worse than no gate: it looks like evidence.

## Decision

`scripts/prepare-gate-site.mjs` copies `dist/` to `.gate-site/` and rewrites
absolute asset URLs to paths relative to each page's own directory depth. Gates
run against `.gate-site/`; `dist/` keeps the absolute paths a web server needs.

The script **hard-fails** if any `<link rel="stylesheet">` does not resolve on
disk, so the silent version of this failure cannot return.

Page links (`<a href="/work">`) are deliberately left alone: no gate navigates
them, and rewriting them would misrepresent what ships.

## Consequences

**Good.** Gates measure real styled pixels. Turning it on immediately surfaced two
genuine failures that had been hidden — a translucent sticky header breaking
contrast measurement, and an axe contrast violation in dark mode.

**Cost.** One extra build step, and a second copy of `dist/` on disk.
`.gate-site/` is gitignored.

**Alternative considered: patching the gates to accept HTTP URLs** and serving
`dist/` over a local server. Higher fidelity, but it means forking shared tooling
used by other projects. If the gates ever gain URL support, this step should be
deleted in favour of it.
