# Documentation

Everything needed to develop, verify and deploy this site.

## Guides

| Document | Read it when |
|---|---|
| [Development](development.md) | Setting up, running locally, day-to-day commands |
| [Architecture](architecture.md) | Understanding how the site is put together |
| [Content and i18n](content-and-i18n.md) | Editing copy, adding a page, translating |
| [Design system](design-system.md) | Changing colour, type, spacing, or the theme |
| [Quality gates](quality-gates.md) | Understanding or debugging `npm run gate` |
| [Deployment](deployment.md) | Building and publishing to the server |
| [Accessibility](accessibility.md) | The commitments this site makes and how they are held |

## Decisions

Architecture decision records live in [`decisions/`](decisions/). Each one states
the context, the decision, and what it costs — so a future change can be made
knowingly rather than by accident.

| ADR | Decision |
|---|---|
| [0001](decisions/0001-astro-static.md) | Astro with a fully static build |
| [0002](decisions/0002-bilingual-routing.md) | Directory-prefixed i18n, no locale detection |
| [0003](decisions/0003-typed-data-not-cms.md) | Typed TypeScript data instead of a CMS |
| [0004](decisions/0004-gate-site-rewrite.md) | Rewriting asset paths before running render gates |
| [0005](decisions/0005-self-hosted-fonts.md) | Self-hosted fonts and a zero-third-party CSP |
| [0006](decisions/0006-honest-frontend-positioning.md) | Stating plainly that the front ends are AI-assisted |
| [0007](decisions/0007-node-22-via-nvm.md) | Node 22 via nvm, pinned per project |

## Status

The site is complete and deployable: 18 pages across two locales, including three
case studies. Remaining gaps — metrics, a factual review, a native Spanish pass,
manual accessibility testing — are tracked in
[Development → What is not built yet](development.md#what-is-not-built-yet).
