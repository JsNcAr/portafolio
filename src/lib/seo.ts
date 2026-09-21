/**
 * Structured data for the whole site as one connected schema.org graph.
 *
 * Every page emits the same WebSite and Person nodes, identified by a stable
 * @id, plus a node for the page itself. Page-specific nodes reference the person
 * by @id instead of repeating them, which is how search engines expect a graph
 * spread across many pages to be joined back together.
 *
 * Rule for everything here: only describe what the page visibly says. Every value
 * is read from data the page already renders, never written fresh for this file.
 */
import type { Locale } from '@i18n/ui';
import type { Price, PriceByLocale, Service, ClassFormat } from '@data/services';

type Node = Record<string, unknown>;

export const HTML_LANGS = ['en-US', 'es-CO'] as const;

export const ids = (origin: string) => ({
  website: `${origin}/#website`,
  person: `${origin}/#person`,
});

export function websiteNode(origin: string, name: string): Node {
  return {
    '@type': 'WebSite',
    '@id': ids(origin).website,
    url: `${origin}/`,
    name,
    inLanguage: [...HTML_LANGS],
    publisher: { '@id': ids(origin).person },
  };
}

export interface PersonInput {
  origin: string;
  jobTitle: string;
  email: string;
  imageUrl: string;
  sameAs: string[];
  employer?: { name: string; url: string };
  almaMater: string;
}

export function personNode(p: PersonInput): Node {
  return {
    '@type': 'Person',
    '@id': ids(p.origin).person,
    name: 'Jason Nicolás Arias Gómez',
    alternateName: ['Jason Arias', 'JsNcAr'],
    jobTitle: p.jobTitle,
    email: `mailto:${p.email}`,
    url: `${p.origin}/`,
    image: p.imageUrl,
    sameAs: p.sameAs,
    address: { '@type': 'PostalAddress', addressLocality: 'Bogotá', addressCountry: 'CO' },
    worksFor: p.employer ? { '@type': 'Organization', ...p.employer } : undefined,
    alumniOf: { '@type': 'CollegeOrUniversity', name: p.almaMater },
    knowsLanguage: ['es', 'en'],
    knowsAbout: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'Linux', 'DevOps', 'REST APIs'],
  };
}

export type PageType = 'WebPage' | 'ProfilePage';

export function webPageNode(opts: {
  origin: string;
  url: string;
  type: PageType;
  name: string;
  description: string;
  lang: string;
}): Node {
  const { origin, url, type, name, description, lang } = opts;
  const person = { '@id': ids(origin).person };
  return {
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: lang,
    isPartOf: { '@id': ids(origin).website },
    // A profile page is *about* the person in the stronger sense Google reads.
    ...(type === 'ProfilePage' ? { mainEntity: person } : { about: person }),
  };
}

/** Mirrors the visible crumb on a case study: Home, Work, this page. */
export function breadcrumbNode(url: string, items: Array<{ name: string; url: string }>): Node {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// UN/CEFACT codes where one exists; "per project" has none, so it stays text.
const UNIT_CODE: Partial<Record<Price['unit'], string>> = { hour: 'HUR', month: 'MON' };

/**
 * Prices on the site are "from X", so they are expressed as a minimum rather than
 * a fixed price. Asserting a single `price` would claim more than the page does.
 */
function offerFor(price: Price, unitText: string): Node {
  return {
    '@type': 'Offer',
    priceCurrency: price.currency,
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      priceCurrency: price.currency,
      minPrice: price.from,
      ...(price.to !== undefined ? { maxPrice: price.to } : {}),
      ...(UNIT_CODE[price.unit] ? { unitCode: UNIT_CODE[price.unit] } : {}),
      unitText,
    },
  };
}

export interface ServicesInput {
  origin: string;
  url: string;
  locale: Locale;
  engineering: Service[];
  /** Apollyon delivers some services; for those the provider is the company. */
  company: { name: string; url: string };
  websites: { name: string; build: PriceByLocale; hosting: PriceByLocale; buildLabel: string; hostingLabel: string };
  classes: { name: string; formats: ClassFormat[] };
  /** From lib/price.ts, so the markup and the visible price use the same words. */
  unitText: (unit: Price['unit']) => string;
}

export function serviceNodes(s: ServicesInput): Node[] {
  const person = { '@id': ids(s.origin).person };
  const providerFor = (delivery: Service['delivery']) =>
    delivery === 'apollyon' ? { '@type': 'Organization', ...s.company } : person;
  const area = { '@type': 'City', name: 'Bogotá' };

  const engineering = s.engineering.map((svc) => ({
    '@type': 'Service',
    '@id': `${s.url}#service-${svc.id}`,
    name: svc.title[s.locale],
    description: svc.blurb[s.locale],
    provider: providerFor(svc.delivery),
    areaServed: area,
    ...(svc.price ? { offers: offerFor(svc.price[s.locale], s.unitText(svc.price[s.locale].unit)) } : {}),
  }));

  const sites: Node = {
    '@type': 'Service',
    '@id': `${s.url}#service-websites`,
    name: s.websites.name,
    provider: person,
    areaServed: area,
    offers: [
      { ...offerFor(s.websites.build[s.locale], s.unitText(s.websites.build[s.locale].unit)), name: s.websites.buildLabel },
      { ...offerFor(s.websites.hosting[s.locale], s.unitText(s.websites.hosting[s.locale].unit)), name: s.websites.hostingLabel },
    ],
  };

  const classes: Node = {
    '@type': 'Service',
    '@id': `${s.url}#service-classes`,
    name: s.classes.name,
    provider: person,
    areaServed: area,
    offers: s.classes.formats
      .filter((f) => f.price)
      .map((f) => ({ ...offerFor(f.price![s.locale], s.unitText(f.price![s.locale].unit)), name: f.title[s.locale] })),
  };

  return [...engineering, sites, classes];
}

export function sourceCodeNode(opts: {
  origin: string;
  url: string;
  name: string;
  description: string;
  repository: string;
  language: string;
  /** Omitted when the repository has no LICENSE file; never assumed. */
  license?: string;
}): Node {
  return {
    '@type': 'SoftwareSourceCode',
    '@id': `${opts.url}#${opts.name}`,
    name: opts.name,
    description: opts.description,
    codeRepository: opts.repository,
    programmingLanguage: opts.language,
    ...(opts.license ? { license: opts.license } : {}),
    author: { '@id': ids(opts.origin).person },
  };
}

export function graph(nodes: Node[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes });
}
