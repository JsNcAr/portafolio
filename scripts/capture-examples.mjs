#!/usr/bin/env node
/**
 * Screenshots the sites listed as examples on /services, into src/assets/.
 *
 *   node scripts/capture-examples.mjs
 *
 * Run by hand, never from the build: it needs the network and those sites are
 * not ours to depend on. The images are committed, so a build stays offline and
 * deterministic. Re-run when one of them is redesigned.
 */
import { chromium } from 'playwright';
import sharp from 'sharp';
import { unlink } from 'node:fs/promises';

const SITES = [
  { slug: 'gsalud', url: 'https://gsalud.co' },
  { slug: 'apollyon', url: 'https://apollyon.lat' },
];

// Captured at a real desktop width so the sites lay out the way a visitor sees
// them, then downscaled to 2x of the widest the card ever renders it.
const WIDTH = 1440;
const HEIGHT = 900;
const OUT_WIDTH = 1200;

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: WIDTH, height: HEIGHT },
  deviceScaleFactor: 1,
});

for (const { slug, url } of SITES) {
  process.stdout.write(`  ${url} ... `);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
  // Entrance animations are common on these; let them settle before the shot.
  await page.waitForTimeout(2500);
  await page.evaluate(() => window.scrollTo(0, 0));
  const raw = `src/assets/.site-${slug}.raw.png`;
  const out = `src/assets/site-${slug}.png`;
  await page.screenshot({ path: raw, fullPage: false });
  await sharp(raw).resize({ width: OUT_WIDTH }).png({ compressionLevel: 9 }).toFile(out);
  await unlink(raw);
  console.log(`-> ${out}`);
}

await browser.close();
