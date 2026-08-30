#!/usr/bin/env node
/**
 * The kit's render gates load pages with `file://` (measure_render.mjs:54 and
 * friends). An Astro build links its assets absolutely -- `/_astro/x.css` -- and
 * under file:// that resolves to the filesystem root, so NOTHING loads: no CSS,
 * no fonts, no scripts. Every gate then measures unstyled black-on-white and
 * passes. That is a false pass, which is worse than no gate at all.
 *
 * So: copy dist/ to .gate-site/ and rewrite absolute asset URLs to paths
 * relative to each page's own depth. The DOM is otherwise untouched, and the
 * copy is disposable -- dist/ itself keeps the absolute paths a web server needs.
 */
import { cpSync, readdirSync, readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { join, relative, dirname, sep } from 'node:path';

const SRC = process.argv[2] ?? 'dist';
const OUT = process.argv[3] ?? '.gate-site';

if (!existsSync(SRC)) {
  console.error(`prepare-gate-site: ${SRC} does not exist. Run the build first.`);
  process.exit(1);
}

rmSync(OUT, { recursive: true, force: true });
cpSync(SRC, OUT, { recursive: true });

/** Every .html under a directory. */
function htmlFiles(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) htmlFiles(p, acc);
    else if (entry.name.endsWith('.html')) acc.push(p);
  }
  return acc;
}

// Only asset-bearing attributes are rewritten. Page links (<a href="/work">) are
// left alone on purpose: a gate never navigates them, and turning them into file
// paths would misrepresent what ships.
const ASSET_ATTR = /(<(?:link|script|img|source|video|use)\b[^>]*?\b(?:href|src)=")(\/[^"]*)(")/gi;

let rewritten = 0;
const pages = htmlFiles(OUT);

for (const page of pages) {
  const depth = dirname(relative(OUT, page)).split(sep).filter((s) => s && s !== '.').length;
  const prefix = depth === 0 ? './' : '../'.repeat(depth);
  const before = readFileSync(page, 'utf8');
  const after = before.replace(ASSET_ATTR, (_m, open, url, close) => {
    rewritten++;
    return `${open}${prefix}${url.slice(1)}${close}`;
  });
  if (after !== before) writeFileSync(page, after);
}

// Guard against a silent regression: if a page still has no stylesheet reachable
// from disk, the gates would go back to measuring nothing.
let unstyled = 0;
for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const hrefs = [...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"/gi)].map((m) => m[1]);
  if (!hrefs.length) continue;
  for (const href of hrefs) {
    if (href.startsWith('http')) continue;
    if (!existsSync(join(dirname(page), href))) {
      console.error(`prepare-gate-site: ${relative(OUT, page)} -> missing stylesheet ${href}`);
      unstyled++;
    }
  }
}

if (unstyled) {
  console.error(`prepare-gate-site: ${unstyled} unresolved stylesheet reference(s). Gates would measure unstyled pages.`);
  process.exit(1);
}

console.log(`OK: ${OUT} prepared -- ${pages.length} page(s), ${rewritten} asset path(s) made relative.`);
