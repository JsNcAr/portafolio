#!/usr/bin/env node
/**
 * Generates the favicon set and the Open Graph cards from design-tokens.json,
 * so the brand assets cannot drift from the theme. Rendered with the same
 * headless Chromium the gates use, and the same self-hosted IBM Plex.
 *
 *   node scripts/build-brand-assets.mjs
 *
 * Outputs into public/:
 *   favicon.svg           scalable, adapts to the viewer's colour scheme
 *   favicon-32.png        rendered fallback
 *   favicon.ico           legacy; browsers request /favicon.ico unprompted
 *   apple-touch-icon.png  180x180, opaque (iOS composites on white otherwise)
 *   og-en.png, og-es.png  1200x630 link-preview cards
 *   site.webmanifest
 */
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { chromium } from 'playwright';
import { resolve } from 'node:path';

const tokens = JSON.parse(readFileSync('design-tokens.json', 'utf8'));
const p = tokens.primitive;
const C = {
  paper: p.graphite['100'].$value,
  paperLight: p.graphite['50'].$value,
  ink: p.graphite['950'].$value,
  inkSoft: p.graphite['800'].$value,
  muted: p.graphite['600'].$value,
  teal: p.teal['800'].$value,
  tealLight: p.teal['300'].$value,
  rule: p.graphite['300'].$value,
};

/**
 * The mark: a single "J" in IBM Plex Sans over a teal field, with the ascender
 * rule that runs through the site. One letter rather than a "JA" monogram --
 * at 16px two letters merge into a smudge.
 */
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Jason Arias">
  <style>
    .bg { fill: ${C.teal}; }
    .fg { fill: ${C.paperLight}; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: ${C.tealLight}; }
      .fg { fill: ${C.ink}; }
    }
  </style>
  <rect class="bg" width="64" height="64" rx="12"/>
  <rect class="fg" x="16" y="14" width="32" height="5" rx="2.5"/>
  <path class="fg" d="M34.6 19v19.8c0 6.2-4 10.2-10.3 10.2-5.5 0-9.3-3-10.3-8l5.9-1.4c.5 2.6 2.1 4 4.4 4 2.7 0 4.3-1.8 4.3-5V19z"/>
</svg>`;

writeFileSync('public/favicon.svg', faviconSvg);

const ogCard = (lang) => {
  const role = lang === 'es' ? 'Ingeniero backend de Python' : 'Python backend engineer';
  const line = lang === 'es'
    ? 'FastAPI · PostgreSQL · Docker · Linux'
    : 'FastAPI · PostgreSQL · Docker · Linux';
  const place = lang === 'es' ? 'Bogotá, Colombia' : 'Bogotá, Colombia';
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="../node_modules/@fontsource-variable/ibm-plex-sans/wght.css">
<link rel="stylesheet" href="../node_modules/@fontsource/ibm-plex-mono/400.css">
<style>
  * { box-sizing: border-box; margin: 0; }
  body { width: 1200px; height: 630px; background: ${C.paper};
         font-family: 'IBM Plex Sans Variable', sans-serif; display: flex; }
  .card { flex: 1; padding: 88px 96px; display: flex; flex-direction: column;
          justify-content: space-between; border-left: 16px solid ${C.teal}; }
  .role { font-family: 'IBM Plex Mono', monospace; font-size: 26px; letter-spacing: .09em;
          text-transform: uppercase; color: ${C.muted}; }
  h1 { font-size: 104px; line-height: 1.04; letter-spacing: -.03em; color: ${C.ink};
       font-weight: 600; max-width: 14ch; }
  .foot { display: flex; justify-content: space-between; align-items: baseline;
          border-top: 1px solid ${C.rule}; padding-top: 28px; }
  .stack { font-family: 'IBM Plex Mono', monospace; font-size: 28px; color: ${C.inkSoft}; }
  .where { font-size: 26px; color: ${C.muted}; }
</style></head><body>
  <div class="card">
    <p class="role">${role}</p>
    <h1>Jason Nicolás Arias Gómez</h1>
    <div class="foot"><p class="stack">${line}</p><p class="where">${place}</p></div>
  </div>
</body></html>`;
};

// Rendered from a file inside the project so relative font/asset URLs resolve.
const SCRATCH = 'public/.brand-scratch.html';

const browser = await chromium.launch();

// Favicon PNGs, rendered from the SVG at each size rather than scaled from one.
const iconPage = await browser.newPage({ viewport: { width: 64, height: 64 } });
const svgUrl = 'data:image/svg+xml;base64,' + Buffer.from(faviconSvg).toString('base64');
const sizes = [
  { file: 'public/favicon-32.png', size: 32, opaque: false },
  { file: 'public/favicon-16.png', size: 16, opaque: false },
  { file: 'public/apple-touch-icon.png', size: 180, opaque: true },
];
for (const { file, size, opaque } of sizes) {
  await iconPage.setViewportSize({ width: size, height: size });
  writeFileSync(
    SCRATCH,
    `<body style="margin:0;background:${opaque ? C.teal : 'transparent'}">
       <img src="${svgUrl}" width="${size}" height="${size}" style="display:block">
     </body>`,
  );
  await iconPage.goto('file://' + resolve(SCRATCH));
  await iconPage.waitForLoadState('load');
  await iconPage.screenshot({ path: file, omitBackground: !opaque });
  console.log(`  ${file} (${size}x${size})`);
}

// Open Graph cards, one per locale.
const ogPage = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const lang of ['en', 'es']) {
  writeFileSync(SCRATCH, ogCard(lang));
  await ogPage.goto('file://' + resolve(SCRATCH));
  await ogPage.evaluate(() => document.fonts.ready);
  // Fail loudly rather than shipping a card silently set in a fallback face.
  const usedPlex = await ogPage.evaluate(() =>
    document.fonts.check('600 104px "IBM Plex Sans Variable"'),
  );
  if (!usedPlex) {
    console.error('build-brand-assets: IBM Plex Sans did not load; card would use a fallback face.');
    process.exit(1);
  }
  await ogPage.screenshot({ path: `public/og-${lang}.png` });
  console.log(`  public/og-${lang}.png (1200x630)`);
}

await browser.close();
rmSync(SCRATCH, { force: true });

writeFileSync(
  'public/site.webmanifest',
  JSON.stringify(
    {
      name: 'Jason Nicolás Arias Gómez',
      short_name: 'Jason Arias',
      description: 'Python backend engineer. FastAPI, PostgreSQL, Docker, Linux.',
      start_url: '/',
      display: 'browser',
      background_color: C.paper,
      theme_color: C.teal,
      icons: [
        { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
        { src: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
        { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    null,
    2,
  ) + '\n',
);
console.log('  public/site.webmanifest');
console.log('  public/favicon.svg');

/**
 * A real .ico, because browsers request /favicon.ico whether or not the HTML
 * asks them to -- without one, every visit logs a 404. The format is an
 * ICONDIR header, one 16-byte ICONDIRENTRY per image, then the image data;
 * PNG payloads are accepted by every browser that matters, so the PNGs
 * rendered above are embedded verbatim.
 */
function buildIco(pngPaths) {
  const images = pngPaths.map((path) => {
    const data = readFileSync(path);
    // PNG dimensions live at byte 16 (width) and 20 (height), big-endian.
    return { data, width: data.readUInt32BE(16), height: data.readUInt32BE(20) };
  });

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = icon
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + images.length * 16;
  const entries = [];
  for (const img of images) {
    const e = Buffer.alloc(16);
    e.writeUInt8(img.width >= 256 ? 0 : img.width, 0);   // 0 encodes 256
    e.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    e.writeUInt8(0, 2);   // palette size, 0 for truecolour
    e.writeUInt8(0, 3);   // reserved
    e.writeUInt16LE(1, 4);  // colour planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(img.data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += img.data.length;
    entries.push(e);
  }

  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

writeFileSync('public/favicon.ico', buildIco(['public/favicon-16.png', 'public/favicon-32.png']));
console.log('  public/favicon.ico (16 + 32)');
