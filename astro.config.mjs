// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { roles } from './src/data/cv.ts';

// The canonical origin. Overridable at build time so a staging deploy does not
// emit production URLs in the sitemap: SITE_URL=https://staging.example npm run build
const site = process.env.SITE_URL ?? 'https://jsncar.tech';

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'directory' },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false },
  },
  integrations: [
    mdx(),
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en-US', es: 'es-CO' } },
      // lastmod only where a real revision date exists: the case studies carry
      // `updated` in cv.ts. Month precision (YYYY-MM) is valid W3C Datetime and is
      // all the data knows -- inventing a day would be a false claim, and Google
      // ignores lastmod values that are always "now".
      serialize(item) {
        const slug = new URL(item.url).pathname.match(/^(?:\/es)?\/work\/([^/]+)$/)?.[1];
        const updated = slug && roles.find((r) => r.id === slug)?.updated;
        return updated ? { ...item, lastmod: updated } : item;
      },
    }),
  ],
});
