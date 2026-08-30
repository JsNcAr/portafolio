# Design system

## Source of truth

`design-tokens.json` — DTCG format (`$type`/`$value`), three tiers:

```
component   button.primary-bg      -> {semantic.action.primary}
semantic    action.primary         -> {primitive.teal.800}
primitive   teal.800               -> #005152
```

Primitives are the raw palette and are never referenced from a component.
Semantic tokens carry meaning. Component tokens are scoped to one component.

```bash
npm run tokens     # design-tokens.json -> src/styles/theme.css
```

`src/styles/theme.css` is **generated**. Editing it by hand is pointless; the next
`npm run tokens` overwrites it. Change `design-tokens.json` and regenerate.

## The register

Engineering documentation on warm paper. Warm graphite neutrals rather than cool
greys, a deep teal primary, an ochre accent for supporting detail, and crimson
reserved strictly for destructive actions — of which this site has none.

The palette was generated in OKLCH so the shade ramps are perceptually even.

## Typography

IBM Plex Sans for interface and prose, IBM Plex Mono for dates, tags, repository
names and overlines. Both self-hosted from fontsource; Plex Mono has no variable
build, so 400 and 500 ship as static weights.

Major Third scale (1.25). The display sizes matter: **the largest heading is at
least 2.5x the body size.** 24px over 16px is bold body text, not display type.
The home page runs 72px over 16px.

## Spacing

4px base unit. Use the semantic tokens (`--space-16`, `--space-24`) rather than
literals. Outer spacing exceeds inner spacing; related items sit closer than
unrelated ones.

## Dark mode

Primitives do not change. The swap happens at the semantic tier, defined three
times in `theme.css`:

```css
:root { /* light: the complete palette */ }
:root[data-theme="dark"] { /* explicit choice wins */ }
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) { /* OS preference */ }
}
```

Three states in practice: no stored value follows the OS; an explicit choice
stamps `data-theme` on `<html>`. An inline script in `<head>` applies the stored
choice before first paint, so there is no flash of the wrong palette.

Every gate that can run in dark does.

## Layout primitives

Defined once in `base.css`:

| Class | Purpose |
|---|---|
| `.shell` | Page gutter and max width |
| `.flow` | Vertical rhythm — `> * + *` gets a top margin |
| `.prose` | Caps line length at 65ch |
| `.overline` | Small mono uppercase label |
| `.sr-only` | Visually hidden, still announced |

> `.flow` was called `.stack` and collided with `class="stack"` on the tech-pill
> lists, silently offsetting every pill but the first. Shared primitives get
> specific names, not words the domain already uses.

## Diagrams

`src/components/diagrams/Flow.astro` and `Layers.astro`. Used from MDX:

```jsx
<Flow
  caption="What the reader should take from it."
  steps={[{ label: 'FastAPI', note: 'async ingest', accent: true }]}
/>
```

They are **HTML and CSS, not SVG**, on purpose. The labels stay real text — so
they are selectable, searchable, translatable and announced by a screen reader —
and the layout reflows from a row into a stack instead of needing a horizontal
scroller at 320px. Cost is a few hundred bytes of markup, no requests, no
JavaScript.

`accent` marks the one step a section is really about. Everything else stays
quiet; accenting three of five means accenting none.

A diagram is allowed to be wider than the 65ch prose measure, because that
measure exists for running text.

## The signal motif

`src/components/SignalMotif.astro` draws the home page's one piece of imagery:
a noisy position signal and the same signal through a Kalman filter.

`src/lib/signal.ts` **is the estimator** — a random walk, sampled with Gaussian
noise, run through a real one-dimensional Kalman filter. The drawn curve is its
output, not a hand-drawn squiggle. That matters: the motif is the same shape of
problem as the BLE positioning work in the Apollyon case study, so it is about
the subject rather than decorating it.

A fixed seed keeps it deterministic, so a rebuild never shows up as a diff.

It sits in the flow beneath the hero text, never behind it. Side by side was
tried and rejected: a 72px display line and a wide trace cannot share 1024px
without the heading breaking to three lines. The legend is a swatch **plus**
words, never colour alone.

## Icons

Interface icons are inline lucide via `Icon.astro`, in `currentColor`.

**Technology logos were tried and rejected.** Stripped to one colour at 14px,
most stop being recognisable — a logo works through colour and silhouette
together, and monochrome gives you one of them. Python, Docker, PostgreSQL,
Debian and GitLab survive; SQLAlchemy, Pydantic, Selenium, Caddy and Hetzner
become smudges. Putting a mark on every one of thirty-odd pills also made the
section heavier without making it clearer.

Decorative icons beside headings and labels are a clear tell of generated UI.
Don't.

## Motion

Two pieces, both essentially free:

- **Cross-document view transitions**, declared as `@view-transition
  { navigation: auto; }` inside `@media not (prefers-reduced-motion: reduce)`.
  Browsers that support it cross-fade between pages; everything else navigates
  normally. Deliberately *not* Astro's `ClientRouter`, which ships a router to
  buy the same effect.
- **Hover and focus transitions** on surfaces (background, border), never on
  `color`.

### A theme swap is instant

`:root[data-theme-switching]` suppresses every transition, and a
`MutationObserver` in the head script sets it for two frames around any change to
`data-theme`. Without this, a theme toggle cross-fades every colour on the page —
which reads as a glitch, and means anything measuring immediately after the swap
(a gate, a screenshot) sees a colour belonging to neither palette. That was a real
gate failure, not a hypothetical: `axe_audit [dark]` flagged nav links at
`#48463e` on `#1c1b16` that settle at `#cfccc1` 400 ms later.

The observer watches the attribute rather than living in the toggle's click
handler, so a change made from devtools or a test harness is covered too.

## Rules that are not negotiable

1. **No hardcoded values in components.** Every colour, size, radius and duration
   references a token.
2. **Token by intent.** Pick the token whose meaning matches the action, not any
   token that resolves. A destructive action never wears `action.primary`.
   Secondary is neutral — outline and dark text, never a coloured fill.
3. **Eight states per interactive element** where they apply: default, hover,
   focus, active, disabled, loading, error, selected.
4. **No emoji, anywhere.** Icons are inline lucide SVG using `currentColor`, via
   `src/components/Icon.astro`. Enforced by `gate:emoji`.
5. **One theme, imported once**, at `Base.astro`. A page that looks different has
   bypassed the theme, and that is a bug.
