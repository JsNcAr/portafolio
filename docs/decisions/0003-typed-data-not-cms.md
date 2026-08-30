# 3. Typed TypeScript data instead of a CMS

- **Status:** Accepted
- **Date:** 2026-08-29

## Context

The content is a CV: five roles with highlights, education, certifications, and a
curated list of public repositories. Every prose field exists in two languages. It
changes perhaps quarterly, and exactly one person edits it.

## Decision

Content lives in typed TypeScript under `src/data/`, with every prose field typed
`Record<Locale, string>`.

## Consequences

**Good.** An untranslated string is a **compile error**, not a silent English
fallback discovered by a Spanish-speaking reader in production. Structure is
enforced: a role cannot be missing its start date. No editing interface to host,
secure or patch.

**Cost.** Editing content means editing code and redeploying. Acceptable for one
editor at this cadence; it would not be for a team or a blog.

**Rejected: a headless CMS.** It would add a network dependency, an account, and
a build-time API call, to solve an editing problem that does not exist.

**Rejected: Markdown files with frontmatter,** for now. Markdown is the right
shape for long-form prose but a poor one for structured bilingual records — the
translation-completeness guarantee would be lost.

## Where Markdown does apply

The case studies are long-form prose, which Markdown suits and a TypeScript
string literal does not. They live in `src/content/work/<locale>/<slug>.mdx`,
declared by `src/content.config.ts`.

The split is deliberate: **prose in MDX, facts in `cv.ts`.** A case study's
frontmatter carries only a title, a summary, an ordering key and a `role` that
joins back to `cv.ts`. Dates, job title and stack are read from `cv.ts` at render
time, so a case study and the work page cannot disagree about when something
happened.
