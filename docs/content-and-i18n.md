# Content and internationalisation

## Where content lives

| Content | File |
|---|---|
| Interface strings, both locales | `src/i18n/ui.ts` |
| Roles, highlights, education, certifications, contact | `src/data/cv.ts` |
| Curated public repositories | `src/data/repos.ts` |
| Services, class formats and audiences | `src/data/services.ts` |
| Case-study prose | `src/content/work/<locale>/<slug>.mdx` |
| Downloadable CV, favicons, OG cards, robots.txt | `public/` |

Structured content is typed TypeScript; long-form prose is MDX. There is no CMS —
see [ADR 0003](decisions/0003-typed-data-not-cms.md).

## Adding or editing a case study

One MDX file per locale under `src/content/work/`. The frontmatter is minimal on
purpose:

```yaml
---
role: apollyon          # joins to an id in src/data/cv.ts
title: Owning a platform end to end
summary: One sentence, shown under the title and on the case card.
metaTitle: "Apollyon case study: owning a platform end to end"      # the <title>
metaDescription: "How I owned an offline-first tracking platform..."  # 120-160 chars
order: 1                # ordering on /work
---
```

`metaTitle` and `metaDescription` are **required**: a case study without them fails
the build. They're kept apart from `title` and `summary` so the visible copy can
change without silently changing what search engines show. See "Search metadata"
below.

Dates, job title and stack are **not** in frontmatter. They are read from
`cv.ts` via `role`, so the case study and the work page cannot disagree.

Both locales must exist for a slug, and the `role` value must match on both.
`/work` only shows a "read the case study" link for roles that have one in the
current locale, so a half-translated case study degrades quietly rather than
producing a dead link.

Brand assets are generated, not hand-drawn:

```bash
node scripts/build-brand-assets.mjs     # favicons, OG cards, webmanifest
```

It reads `design-tokens.json`, so the favicon and link-preview cards cannot drift
from the theme. It fails if IBM Plex does not load rather than shipping a card set
in a fallback face.

## The two locales

English at the root (`/work`), Spanish under a prefix (`/es/work`). Configured in
`astro.config.mjs`:

```js
i18n: {
  defaultLocale: 'en',
  locales: ['en', 'es'],
  routing: { prefixDefaultLocale: false },
}
```

There is **no automatic locale detection and no redirect.** A visitor lands where
the link pointed and switches by choice. Detection guesses wrong often enough to
be annoying, and it makes URLs non-deterministic.

## Editing interface copy

`src/i18n/ui.ts` holds one object per locale. The `UIKey` type is derived from the
English block:

```ts
export type UIKey = keyof (typeof ui)['en'];
```

So **adding an English key without its Spanish counterpart is a compile error**,
caught by `npm run check`. Translation cannot silently fall behind.

```ts
en: { 'contact.lead': 'Open to backend and infrastructure work.' },
es: { 'contact.lead': 'Abierto a trabajo de backend e infraestructura.' },
```

Read them in a page with:

```astro
const t = useTranslations(locale);
<h1>{t('contact.lead')}</h1>
```

## Search metadata

Every indexable page has a search title and description that are **separate from
its visible copy**:

- Static pages read `meta.<page>.title` and `meta.<page>.description` from
  `src/i18n/ui.ts`, in both locales.
- Case studies read `metaTitle` and `metaDescription` from their frontmatter.

The title is the complete `<title>`. `Base.astro` adds no suffix, so put the name
wherever it reads best. `npm run gate` runs `scripts/check-seo.mjs`, which fails on:

- a title outside 30-60 characters, or a description outside 120-160
- a duplicate title or description anywhere on the site
- anything other than one `<h1>` per page
- a missing canonical, or one that differs from `og:url`
- hreflang that isn't reciprocal between the two locales
- JSON-LD that doesn't parse or isn't one connected graph
- a sitemap that doesn't list exactly the indexable pages

**Structured data** is built in `src/lib/seo.ts` as one schema.org `@graph`: the same
`WebSite` and `Person` on every page (stable `@id`), a `WebPage` for the page
itself, and page-specific nodes passed to `Base` through `extraNodes` (breadcrumbs
on case studies, `Service` with offers on /services, `SoftwareSourceCode` on
/open-source). The rule: **only describe what the page visibly says**. Every value
is read from `cv.ts`, `services.ts`, `repos.ts` or i18n, never written fresh.

**Sitemap `lastmod`** is set only for case studies, from `updated` in `cv.ts`. That
is a full date taken from the MDX files' git history. Update it when you revise a
case study's prose, and nowhere else: Google ignores dates that are always "now".

## Editing CV content

`src/data/cv.ts`. Every prose field is `Record<Locale, string>`:

```ts
summary: {
  en: 'Offline-first proximity tracking and communication platform.',
  es: 'Plataforma de rastreo de proximidad y comunicación con enfoque offline-first.',
},
```

Job titles and organisation names are **not** translated. They are proper nouns,
and the roles were held under those names.

Role `id` values are used as anchors on `/work` and as the (future) case-study
slugs, so changing one breaks incoming links.

## Prices

`src/data/services.ts` carries prices as structured data, never as prose:

```ts
interface Price { from: number; to?: number; currency: 'COP' | 'USD'; unit: 'project' | 'month' | 'hour' | 'hour-per-student' }
```

`src/lib/price.ts` formats it with `Intl.NumberFormat` against the reader's locale,
and returns `null` when there is no price so the caller omits the line entirely
rather than rendering an empty one. A `null` price is the correct state for a service
whose rate has not been set — the page is complete without it.

Changing a rate is one edit to one file. Never write a figure into a UI string.

## Linking between pages

Never hardcode a locale into a path. Write the English-rooted path and let
`localePath` prefix it:

```astro
import { localePath } from '@i18n/utils';

<a href={localePath(locale, '/work')}>…</a>
```

`localePath('en', '/work')` gives `/work`; `localePath('es', '/work')` gives
`/es/work`. This is also what makes the language switch land on the *same* page
in the other language rather than on the home page.

## Accents

Spanish copy uses proper accents and punctuation — `Bogotá`, `años`, `producción`,
`¿`, `¡`. They are in the Latin-1 range, covered by the `latin` font subset, and
the emoji gate does not object to them.

`años` and `anos` mean very different things. Do not strip accents to be safe.

## Adding a translation

1. Add the key to **both** blocks in `ui.ts`.
2. `npm run check` — a missing counterpart is an error.
3. `npm run gate` — the Spanish page is measured like any other, and longer
   Spanish strings are a real source of overflow at 280px.
4. Screenshot the Spanish page. Text expansion breaks layouts that look fine in
   English.

## Voice

- Say what happened, then what to do about it.
- Frontload the verb: "Download the CV", not "Click here to download".
- No overselling. The site states plainly that the front ends were planned and
  assembled with AI tooling and are not a claim to front-end engineering — see
  [ADR 0006](decisions/0006-honest-frontend-positioning.md). That note is
  load-bearing; do not quietly drop it.
