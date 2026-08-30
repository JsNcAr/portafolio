# Accessibility

Target: **WCAG 2.2 AA**, verified on the rendered page rather than asserted.

## What is checked automatically

Every gate below runs on every built page, in light and dark, on every
`npm run gate`. See [Quality gates](quality-gates.md) for the full table.

| Criterion | How it is held |
|---|---|
| 1.4.3 Contrast (minimum) | `measure_render` on real computed pixels |
| 1.4.11 Non-text contrast | token pairs verified at source and on the render |
| 2.1.1 Keyboard | `verify_keyboard` tabs to each control and operates it |
| 2.4.7 Focus visible | `verify_states` measures the focus state, not just rest |
| 2.4.11 Focus not obscured | `scroll-padding-block-start` clears the sticky header |
| 2.5.8 Target size | `verify_target_size`, minimum 24x24 |
| 4.1.2 Name, role, value | `axe_audit` (axe-core) |
| 1.4.10 Reflow | `verify_responsive` at 280/320/414px |
| 2.3.3 Animation from interactions | `verify_reduced_motion` |

Contrast is verified twice: once on `design-tokens.json` before any page exists,
and again on the rendered page where the cascade decides what actually applies.

## Deliberate choices

**Skip link.** First focusable element on every page, moves focus to `<main>`.

**Colour is never the only signal.** The current navigation item carries a heavier
weight and a rule under it, not just a colour. The current role on `/work` carries
a text badge alongside its accent rule.

**The header is opaque.** A translucent sticky bar makes text contrast depend on
whatever scrolls beneath it — unmeasurable, and occasionally genuinely failing.

**Reduced motion is honoured globally** in `base.css`, and the gate checks that no
content is *lost* when motion is disabled — an element revealed only by an
entrance animation would fail.

**The theme toggle is a button**, not a checkbox: it performs an action. It
carries `aria-pressed` and a text label, so the state is announced.

**Stretched links.** Cards use an absolutely positioned span so the whole card is
clickable, while the accessible name stays the heading text. The focus ring is
drawn on the card via `:has(a:focus-visible)`, so keyboard users see what mouse
users get.

**The 404 owns its viewport** rather than floating under the header, and offers
real destinations instead of only apologising.

## What is not automated

Automated tooling catches perhaps half of real accessibility problems. Not yet
done, and worth doing before a wide launch:

- A manual screen-reader pass (NVDA or VoiceOver) over each page.
- Keyboard-only navigation end to end, including the language switch and theme
  toggle.
- 200% browser zoom, and a 200% OS font-size setting.
- `forced-colors` / Windows High Contrast.

## Reporting

If something here is wrong, the fastest fix is an email to the address on the
contact page.
