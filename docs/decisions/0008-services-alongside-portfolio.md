# 8. Services alongside the portfolio, not instead of it

- **Status:** Accepted
- **Date:** 2026-08-30

## Context

The site was built as a job-seeking portfolio. The hero says "I build backends that
stay up", Contact said "Open to backend and infrastructure work", and the case
studies are written as "what I owned". Every word of that addresses an employer.

Jason also sells services — the four capability pillars advertised on apollyon.lat,
where he is COO — and teaches programming, mathematics and physics. Those address a
client and a student. Three audiences, one site, and each one is put off by a page
that is obviously aimed at somebody else.

A further wrinkle: some engagements are contracted through Apollyon S.A.S and some
directly with him. A prospective client needs to know which, before rather than
after the conversation.

## Decision

Services is a **peer navigation item**, not a repositioning.

- The home page keeps its employment-first hero. Discoverability comes from one line
  in the existing "Currently" band, not from the hero.
- `/services` is self-contained: a client landing there finds the whole offer without
  the rest of the site pretending to be a consultancy.
- **Every service states who you would be contracting with** — `direct`, `apollyon`,
  or `either` — rendered on the card rather than buried in a footnote.
- Teaching gets a visually distinct treatment on its own ground, because it is a
  different kind of offer to a different person. Four more cards would have made the
  page read as one undifferentiated list of things for sale.
- Prices are structured data (`from`, optional `to`, currency, unit), not prose, and
  render nothing while `null`.

## Consequences

**Good.** Nothing that already worked was diluted. The Apollyon relationship is
disclosed rather than blurred, which is the honest position for someone who is an
officer of the company and also takes independent work. Changing a price is one edit
to `src/data/services.ts`.

**Cost.** Published ranges are the hardest thing on the site to keep true, and they
invite negotiation from the floor rather than from the scope. This was raised and
accepted deliberately.

**On the interface question.** `/open-source` carries a standing note that the front
ends were planned and assembled with AI tooling, because a recruiter assessing
front-end skill needs to know. On `/services` it is one clause in one card and no
more: a client buying working software cares whether it works, not which tools built
the interface. Same fact, different weight for a different reader. See
[ADR 0006](0006-honest-frontend-positioning.md), which this does not override.

**On teaching claims.** The only teaching role on the CV is an art-history TA post
from 2020. The page therefore stands on the physics degree and the public
numerical-methods repositories, and claims no maths-teaching history it cannot
evidence.
