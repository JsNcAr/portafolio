# 1. Astro with a fully static build

- **Status:** Accepted
- **Date:** 2026-08-26

## Context

The site is a personal portfolio: a handful of pages, content that changes a few
times a year, and no user accounts, forms or dynamic data. It has to be hosted on
a Debian server the author already administers, behind Caddy, alongside other
services.

## Decision

Astro with `output: 'static'`. The build emits HTML, CSS and fonts. Deployment is
a file copy.

## Consequences

**Good.** Nothing runs on the server, so there is no process to supervise, no
memory footprint, and no runtime dependency to patch — only Caddy. Pages are
sent as finished HTML, so they render fast and work with JavaScript disabled.
Rollback is `mv` on a directory.

**Cost.** Any content change requires a rebuild and a redeploy; there is no
editing interface. For a site that changes a few times a year, that is cheaper
than running a CMS.

**Astro specifically** over plain HTML or a static-site generator: it gives
components and typed data without shipping a framework runtime, and its i18n
routing matches the bilingual requirement directly.

**Node 22.12+ is required.** Astro 7 refuses to start on Node 20, which is this
machine's system Node. See [ADR 0007](0007-node-22-via-nvm.md).
