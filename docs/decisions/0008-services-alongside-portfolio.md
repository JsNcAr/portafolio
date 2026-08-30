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

**On teaching claims.** An earlier draft of this ADR said the page should claim no
teaching history, on the grounds that the CV's only teaching entry is a 2020
art-history TA post. **That was wrong.** Jason has tutored privately alongside his
degree for most of his time at university; it simply never appeared on a CV aimed at
backend roles. The page says so, because it is true and it is the strongest thing
about the offer. It still does not claim institutional teaching, and it still points
at the public numerical-methods repositories as something a prospective student can
actually inspect.

The lesson worth keeping: absence from the CV is not absence of experience. Ask
before writing a limitation into the copy.

**On websites as their own section.** Company sites are the easiest of these services
to sell and the only one with live work a client can go and look at — gsalud.co and
apollyon.lat, both designed, built and hosted by Jason. They also have a two-part
price, a build and a monthly, which no other service has. A card in the grid could
carry neither, so the offer gets its own section with the examples as the substance
rather than a footnote.
