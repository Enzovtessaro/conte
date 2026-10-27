import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CATEGORY_SLUGS, AUTHOR_SLUGS } from './lib/site';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string().min(10).max(110),
    // <title> tag; falls back to title. Keep under ~60 chars when written new.
    seoTitle: z.string().max(110).optional(),
    description: z.string().min(50).max(200),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(CATEGORY_SLUGS),
    tags: z.array(z.string()).default([]),
    author: z.enum(AUTHOR_SLUGS).default('solange-vaz'),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    // GEO: short self-contained answers shown at the top ("Resposta rápida") and quoted by AI engines.
    tldr: z.array(z.string()).default([]),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    // GEO: primary sources (Receita Federal, LC 123/2006, etc.) listed at the end and in JSON-LD citation.
    sources: z.array(z.object({ title: z.string(), url: z.string().url() })).default([]),
    draft: z.boolean().default(false),
    migratedFrom: z.string().optional(),
  }),
});

export const collections = { posts };
