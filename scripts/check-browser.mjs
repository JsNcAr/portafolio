#!/usr/bin/env node
/**
 * Preflight for the render-based gates.
 *
 * Every render gate in the kit SKIPS with exit 0 when Playwright is missing, which
 * reads exactly like a pass. This script is the opposite: it fails loudly, so
 * "the gates ran" and "the gates were skipped" can never look the same.
 *
 * Run it before any session that trusts a render gate's output.
 *
 *   node scripts/check-browser.mjs
 */
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.error('FAIL: playwright is not installed. Run: npm i -D playwright && npx playwright install chromium');
  process.exit(1);
}

let browser;
try {
  browser = await chromium.launch();
} catch (e) {
  console.error(`FAIL: playwright is installed but no browser will launch.\n  ${e.message.split('\n')[0]}`);
  console.error('  Run: npx playwright install chromium');
  process.exit(1);
}

const page = await browser.newPage();
await page.setContent('<p id="t" style="color:#1c1b16;background:#f2f0e8">probe</p>');
const colour = await page.$eval('#t', (el) => getComputedStyle(el).color);
const version = browser.version();
await browser.close();

if (colour !== 'rgb(28, 27, 22)') {
  console.error(`FAIL: browser launched but computed styles look wrong (got ${colour}).`);
  process.exit(1);
}

// axe_audit.mjs resolves axe-core relative to the CURRENT WORKING DIRECTORY, so the
// render gates must be invoked from this directory or axe silently reaches for a CDN.
const axe = existsSync(resolve('node_modules/axe-core/axe.min.js'));

console.log(`OK: chromium ${version} launches and computes styles.`);
console.log(`${axe ? 'OK' : 'WARN'}: axe-core ${axe ? 'available locally (no CDN needed)' : 'NOT found locally — axe_audit will need network'}`);
process.exit(axe ? 0 : 1);
