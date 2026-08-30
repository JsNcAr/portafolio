# Quality gates

```bash
npm run gate
```

Builds the site, then runs every check. All-or-nothing: one failure fails the run.
Roughly a minute.

## What runs

### Static gates — `npm run gate:static`

| Gate | Checks |
|---|---|
| `gate:tokens` | `design-tokens.json` parses; every alias resolves |
| `gate:contrast` | Required token pairs meet WCAG 2.2 in light **and** dark |
| `gate:emoji` | No emoji anywhere in the source |

Contrast is checked on the token source, so a palette cannot ship broken even
before a page uses it. Decorative pairs (hairline borders) are advisory and
reported as warnings.

### Render gates — `npm run gate:render`

A real headless Chromium loads every built page and measures computed pixels.

| Gate | Checks | Dark too |
|---|---|---|
| `measure_render` | Real computed contrast of every text node | yes |
| `verify_states` | Contrast in default, hover **and** focus | yes |
| `axe_audit` | axe-core WCAG 2.2 A/AA | yes |
| `verify_responsive` | No horizontal overflow at 280/320/414px | |
| `verify_target_size` | Every target at least 24x24 (WCAG 2.5.8) | yes |
| `verify_keyboard` | Tab reaches controls; Enter/Space operates them | |
| `verify_reduced_motion` | Motion stops under `prefers-reduced-motion`, no content lost | |
| `verify_overflow` | No silently clipped text or overlapping controls | |
| `verify_interactive` | A control declaring a state actually changes it on click | |
| `verify_rtl` | No breakage when mirrored | |
| `lint_intent` | Destructive actions never wear the primary token | |
| `slop_tells` | Render-based anti-slop tells | yes |

`gate:browser` runs first and launches Chromium for real. If no browser is
available it **fails** rather than skipping, so "gates ran" and "gates were
skipped" can never look alike.

Each gate reports the page count it actually covered, so a coverage regression is
visible in the output rather than implied by a green line.

## The `.gate-site` step

The gates load pages with `file://`. An Astro build links assets absolutely
(`/_astro/x.css`), and under `file://` that resolves to the filesystem root — so
**no CSS, no fonts and no scripts load at all.** The gates then measure unstyled
black-on-white and report PASS.

That is a false pass, and it is worse than no gate: it looks like success.

`scripts/prepare-gate-site.mjs` copies `dist/` to `.gate-site/`, rewrites absolute
asset URLs to paths relative to each page's own depth, and **hard-fails if any
stylesheet reference does not resolve on disk** — so the failure cannot come back
silently. `dist/` itself is untouched and keeps the absolute paths a web server
needs.

Never point the gates at `dist/` directly.

## Gates that only read their first argument

Five of the kit's gates parse their target as `argv.find(a => !a.startsWith('--'))`
— the **first** non-flag argument, not all of them:

`verify_states` · `axe_audit` · `verify_responsive` · `verify_interactive` · `verify_rtl`

Hand one of those a list of nineteen pages and it opens the first, passes, and
says nothing about the other eighteen. Point it at a directory instead and its
walk is non-recursive, so every nested route is missed.

`run-render-gates.mjs` therefore marks each gate `MANY` or `ONE` and invokes the
`ONE` gates **once per page**. The distinction is verified against each script's
argument parsing and should be re-checked when the kit updates.

Demonstrated rather than assumed: a link at 1.03:1 contrast injected into one
nested page is **passed** by a single call with the full list, and **caught** on
exactly that page by the per-page invocation.

## What the gates cannot see

They score objective correctness — token consistency, contrast, target size,
overflow, keyboard access. They say nothing about whether a page looks right.

The clearest evidence from this project: a `.stack` layout primitive in
`base.css` collided with `class="stack"` on the tech-pill lists. Every pill after
the first sat 16px lower, and the first stretched to 41.8px against the others'
25.8px. **All seventeen gates passed.** Only a screenshot caught it.

So after any visual change:

```bash
npm run build && npm run gate:prepare
npm run shot -- .gate-site/<page>/index.html --full
npm run shot -- .gate-site/<page>/index.html --full --dark
npm run shot -- .gate-site/<page>/index.html --width=390 --full
```

Then open the images and read them. A green gate run is not evidence of taste.

## Debugging a failure

Each failing gate prints the element, the measured value and the threshold. Two
recurring causes worth knowing:

- **Contrast failing on a translucent surface.** A `color-mix(..., transparent)`
  background makes the effective contrast depend on whatever scrolls beneath it,
  which is unmeasurable and occasionally wrong in practice. The sticky header was
  made opaque for this reason.
- **Overflow at 280px.** Usually an `<input>` keeping its intrinsic width, a grid
  item keeping `min-width: auto`, or one unbreakable token such as a URL. Fixes
  are `min-inline-size: 0`, `grid-template-columns: minmax(0, 1fr)`, and
  `overflow-wrap: anywhere`.
