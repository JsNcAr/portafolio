# 2. Directory-prefixed i18n, no locale detection

- **Status:** Accepted
- **Date:** 2026-08-26

## Context

The site ships in English and Spanish at launch. The author is a native Spanish
speaker in Bogotá writing for an audience that includes international remote
employers.

## Decision

English at the root (`/work`), Spanish under a prefix (`/es/work`), via Astro's
`i18n` config with `prefixDefaultLocale: false`.

**No `Accept-Language` detection and no automatic redirect.** A visitor lands
where the link pointed and changes language by choice.

Paths are written once, English-rooted, and prefixed by `localePath(locale, path)`.
Each page is one component taking `locale` as a prop; the two route files are
three lines each.

## Consequences

**Good.** URLs are deterministic — a link always goes where it says. Both locales
are crawlable and carry `hreflang` alternates plus `x-default`. The language
switch maps to the *same* page in the other language rather than dumping the
reader on the home page. English and Spanish pages cannot drift apart, because
they share one implementation.

**Cost.** Every new page needs two route files and both halves of every string.
The type system makes the second unavoidable rather than merely advisable: the
`UIKey` type derives from the English block, so a missing Spanish key fails
`npm run check`.

**Rejected: automatic locale detection.** It guesses wrong often enough to
irritate, makes URLs non-deterministic, and would require server-side logic — the
one thing [ADR 0001](0001-astro-static.md) exists to avoid.

**Rejected: translated slugs** (`/es/trabajo`). Marginal benefit, and it doubles
the mapping every internal link has to get right.
