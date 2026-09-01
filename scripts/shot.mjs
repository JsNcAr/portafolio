#!/usr/bin/env node
/**
 * Screenshot a page so it can actually be looked at. Gates prove contrast and
 * overflow; they cannot see a control stuck at the bottom of its box.
 *
 *   node scripts/shot.mjs <file.html> [--dark] [--width=1280] [--out=shot.png] [--full]
 *
 * Transitions are disabled and the pointer is parked off-canvas, so the capture is
 * the resting state and not an accidental hover.
 */
import { chromium } from 'playwright';
import { resolve } from 'node:path';

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith('--'));
if (!file) { console.error('usage: node scripts/shot.mjs <file.html> [--dark] [--width=N] [--out=path] [--full]'); process.exit(1); }
const flag = (n, d) => { const a = args.find((x) => x.startsWith(`--${n}=`)); return a ? a.split('=')[1] : d; };
const dark = args.includes('--dark');
const width = Number(flag('width', 1280));
const out = flag('out', `shot${dark ? '-dark' : ''}-${width}.png`);

let browser;
try { browser = await chromium.launch({ channel: 'chrome' }); }
catch { browser = await chromium.launch(); }

const page = await browser.newPage({
  viewport: { width, height: Math.round(width * 0.75) },
  colorScheme: dark ? 'dark' : 'light',
  deviceScaleFactor: 2,
});
await page.goto(`file://${resolve(file)}`);
if (dark) await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
await page.addStyleTag({ content: '*,*::before,*::after{transition:none!important;animation:none!important}' });
await page.mouse.move(-50, -50);
await page.evaluate(() => document.fonts.ready);

// A fullPage screenshot does not move the viewport, so loading="lazy" images
// below the fold never start loading and photograph as empty boxes -- which
// reads as a broken layout when it is only a capture artifact. Walk the page
// once to trigger them, then return to the top before shooting.
if (args.includes('--full')) {
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  // Decode, rather than merely fetch, before the shutter.
  await page.evaluate(() =>
    Promise.all(
      [...document.images].filter((i) => !i.complete).map(
        (i) => new Promise((r) => { i.onload = i.onerror = r; }),
      ),
    ),
  );
  await page.waitForTimeout(250);
}

await page.screenshot({ path: out, fullPage: args.includes('--full') });
await browser.close();
console.log(`shot: ${out} (${width}px, ${dark ? 'dark' : 'light'})`);
