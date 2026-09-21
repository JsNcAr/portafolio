import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
// Astro 7 deprecates re-exporting `z`; import zod directly.
import { z } from 'zod';

/**
 * Case studies. One MDX file per locale per slug: work/<locale>/<slug>.mdx,
 * so the loader id is 'en/apollyon' and the locale is the first segment.
 *
 * Structured data (dates, stack, role) stays in src/data/cv.ts and is joined by
 * `role`. Duplicating it in frontmatter would let the two drift apart.
 */
const work = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/work' }),
  schema: z.object({
    /** Matches an id in src/data/cv.ts -> roles. */
    role: z.enum(['apollyon', 'personally-ai', 'atonga']),
    title: z.string(),
    /** One sentence, shown under the title on the page and on the case card. */
    summary: z.string(),
    /**
     * Search metadata, kept apart from title and summary so the visible copy can
     * change without silently changing what search engines show. Required, so a
     * new case study without them fails the build. check-seo.mjs enforces lengths.
     */
    metaTitle: z.string(),
    metaDescription: z.string(),
    /** Ordering on /work. Lower sorts first. */
    order: z.number(),
  }),
});

export const collections = { work };
