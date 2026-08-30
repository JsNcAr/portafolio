# 7. Node 22 via nvm, pinned per project

- **Status:** Accepted
- **Date:** 2026-08-30

## Context

Astro 7 requires Node 22.12 or later. This server's system Node, installed from
apt, is 20.19.2 and is what other services and shells use.

## Decision

Node 22 is installed under nvm and pinned by `.nvmrc`. **nvm's default alias is
deliberately set back to `system`**, so opening a new shell still gets the apt
Node and nothing else on the machine changed behaviour.

The consequence is that work in this directory starts with `nvm use`.

## Consequences

**Good.** No system-wide upgrade, no `sudo`, and no risk to services already
running on Node 20. The pin is committed, so any machine building this project
uses the same version. `engines` in `package.json` states the requirement, so npm
warns if it is not met.

**Cost.** `nvm use` is easy to forget. The failure is loud and self-explanatory —
`Node.js v20.19.2 is not supported by Astro!` — so it costs seconds, not debugging.

**Alternatives rejected.** Upgrading system Node via NodeSource would have needed
`sudo` and changed the Node every other project on the server uses. Pinning Astro
to 5.13 (the last release supporting Node 20) would have frozen the site on a
version that stops receiving fixes, and moved the problem to the next upgrade.
