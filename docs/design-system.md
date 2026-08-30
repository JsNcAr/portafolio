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
