#!/usr/bin/env node
/**
 * SEO gate over the built site. Reads dist/ and fails on anything a search engine
 * would read wrongly: titles and descriptions outside the lengths results display,
 * duplicates, heading structure, canonical/hreflang mistakes, structured data that
 * does not parse or is not connected, and a sitemap that disagrees with the pages.
 *
 *   node scripts/check-seo.mjs          (run by `npm run gate`, after the build)
 *
 * No dependencies: the HTML is our own build output, so targeted patterns are
 * reliable, and a parser would be one more thing to install on every machine.
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

// SEO_DIST lets the gate be pointed at a deliberately broken copy, to prove it fails.
const DIST = process.env.SEO_DIST ?? 'dist';
const TITLE = [30, 60];
const DESC = [120, 160];
const REQUIRED_LANGS = ['en-US', 'es-CO', 'x-default'];

const failures = [];
const fail = (page, msg) => failures.push(`${page}: ${msg}`);

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (entry.endsWith('.html')) acc.push(p);
  }
  return acc;
}

function decode(s) {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
}

const attr = (html, re) => { const m = html.match(re); return m ? decode(m[1]) : null; };

/** URL path -> the dist file that serves it (build.format: 'directory'). */
function fileFor(pathname) {
  const clean = pathname.replace(/\/+$/, '');
  return clean === '' ? join(DIST, 'index.html') : join(DIST, clean, 'index.html');
}

// --- collect -----------------------------------------------------------------
const pages = walk(DIST).map((file) => {
  const html = readFileSync(file, 'utf8');
  return {
    file,
    name: relative(DIST, file),
    html,
    noindex: /<meta name="robots" content="[^"]*noindex/.test(html),
    title: attr(html, /<title>([\s\S]*?)<\/title>/),
    description: attr(html, /<meta name="description" content="([^"]*)"/),
    canonical: attr(html, /<link rel="canonical" href="([^"]*)"/),
    ogUrl: attr(html, /<meta property="og:url" content="([^"]*)"/),
    alternates: [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)]
      .map((m) => ({ lang: m[1], href: decode(m[2]) })),
  };
});
const indexable = pages.filter((p) => !p.noindex);
if (indexable.length === 0) {
  console.error('check-seo: no indexable pages found in dist/. Build first.');
  process.exit(1);
}

// --- per page ------------------------------------------------------------------
for (const p of indexable) {
  const tl = p.title?.length ?? 0;
  if (tl < TITLE[0] || tl > TITLE[1]) fail(p.name, `title is ${tl} chars, want ${TITLE[0]}-${TITLE[1]}: "${p.title}"`);
  const dl = p.description?.length ?? 0;
  if (dl < DESC[0] || dl > DESC[1]) fail(p.name, `description is ${dl} chars, want ${DESC[0]}-${DESC[1]}`);

  const h1s = (p.html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) fail(p.name, `has ${h1s} <h1>, want exactly 1`);

  if (!p.canonical) fail(p.name, 'no canonical');
  else if (p.canonical !== p.ogUrl) fail(p.name, `canonical ${p.canonical} != og:url ${p.ogUrl}`);

  // hreflang: the full set, the page itself among them, and the twin names us back.
  const langs = p.alternates.map((a) => a.lang);
  for (const l of REQUIRED_LANGS) if (!langs.includes(l)) fail(p.name, `hreflang missing ${l}`);
  if (p.canonical && !p.alternates.some((a) => a.href === p.canonical && a.lang !== 'x-default')) {
    fail(p.name, 'hreflang set does not include the page itself');
  }
  for (const a of p.alternates.filter((x) => x.lang !== 'x-default')) {
    const twinFile = fileFor(new URL(a.href).pathname);
    if (!existsSync(twinFile)) { fail(p.name, `hreflang ${a.lang} -> ${a.href} does not exist`); continue; }
    const twin = pages.find((x) => x.file === twinFile);
    // x-default does not count: it points at the English page from every locale,
    // so it would mask a Spanish page that dropped its real en-US link back.
    if (!twin?.alternates.some((b) => b.lang !== 'x-default' && b.href === p.canonical)) {
      fail(p.name, `hreflang not reciprocal: ${a.href} does not point back`);
    }
  }

  // Structured data: parses, and is one connected graph for this page.
  const blocks = [...p.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (blocks.length !== 1) { fail(p.name, `${blocks.length} JSON-LD blocks, want 1`); continue; }
  let data;
  try { data = JSON.parse(blocks[0][1]); } catch (e) { fail(p.name, `JSON-LD does not parse: ${e.message}`); continue; }
  const nodes = data['@graph'] || [];
  const byId = (suffix) => nodes.find((n) => typeof n['@id'] === 'string' && n['@id'].endsWith(suffix));
  if (!byId('/#website')) fail(p.name, 'graph has no #website node');
  const person = byId('/#person');
  if (!person) fail(p.name, 'graph has no #person node');
  if (p.canonical && !nodes.some((n) => n['@id'] === `${p.canonical}#webpage`)) {
    fail(p.name, 'graph has no WebPage node for this URL');
  }
  if (person?.image) {
    const imgFile = join(DIST, new URL(person.image).pathname);
    if (!existsSync(imgFile)) fail(p.name, `Person.image does not resolve in dist: ${person.image}`);
  }
}

// --- across pages ---------------------------------------------------------------
for (const key of ['title', 'description']) {
  const seen = new Map();
  for (const p of indexable) {
    const v = p[key];
    if (!v) continue;
    if (seen.has(v)) fail(p.name, `duplicate ${key} (also on ${seen.get(v)})`);
    else seen.set(v, p.name);
  }
}

// Sitemap must list exactly the indexable pages, by path.
const index = readFileSync(join(DIST, 'sitemap-index.xml'), 'utf8');
const sitemapFiles = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => join(DIST, new URL(m[1]).pathname));
const listed = new Set();
for (const f of sitemapFiles) {
  if (!existsSync(f)) { fail('sitemap', `index points at missing ${f}`); continue; }
  for (const m of readFileSync(f, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)) listed.add(new URL(m[1]).pathname);
}
// Expected paths come from where the file sits, not from its canonical: a page with
// a broken canonical is reported above, and must not also crash or blur this check.
const pathOf = (name) => '/' + name.replace(/(^|\/)index\.html$/, '').replace(/\/$/, '');
const expected = new Set(indexable.map((p) => pathOf(p.name)));
for (const path of expected) if (!listed.has(path)) fail('sitemap', `missing ${path}`);
for (const path of listed) if (!expected.has(path)) fail('sitemap', `lists ${path}, which is not an indexable page`);

// --- report ---------------------------------------------------------------------
if (failures.length) {
  for (const f of failures) console.error(`  x ${f}`);
  console.error(`check-seo: FAIL -- ${failures.length} problem(s) across ${indexable.length} indexable page(s).`);
  process.exit(1);
}
console.log(`check-seo: OK -- ${indexable.length} indexable page(s), ${pages.length - indexable.length} noindex, sitemap lists ${listed.size}.`);
