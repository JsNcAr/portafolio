# 5. Self-hosted fonts and a zero-third-party CSP

- **Status:** Accepted
- **Date:** 2026-08-30

## Context

The design calls for IBM Plex Sans and IBM Plex Mono. The obvious route is Google
Fonts, which means every visitor's browser contacting a third party.

## Decision

Fonts are self-hosted from the `@fontsource` packages and bundled into `/_astro/`
with everything else. `@fontsource-variable/ibm-plex-sans` supplies a variable
face; IBM Plex Mono has no variable build, so 400 and 500 ship as static weights.

Because nothing is loaded off-origin, `deploy/Caddyfile` can set a strict CSP with
`default-src 'self'` and no third-party origins at all.

## Consequences

**Good.** No third-party request, which is what makes the footer's "no tracking,
no analytics" claim actually true rather than aspirational. No render-blocking
dependency on an external host, and no breakage if that host is unreachable.
Fonts are content-hashed and cached for a year alongside the CSS.

**Cost.** A larger build output and a slightly longer build. The `latin` and
`latin-ext` subsets are both emitted; `unicode-range` means a browser downloads
only what the page actually needs, so Spanish accented characters come from the
`latin` subset without an extra file.

**Note.** The CSP still needs `'unsafe-inline'` for styles and scripts: Astro
inlines a small amount of critical CSS, and `<head>` carries the inline
theme-application script that prevents a flash of the wrong palette. Removing
both would require nonces, which a static file server cannot generate per request.
