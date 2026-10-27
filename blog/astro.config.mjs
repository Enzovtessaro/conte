import fs from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeImgAttrs from './src/plugins/rehype-img-attrs.mjs';

// lastmod per post and per category, read from frontmatter (the sitemap runs outside the content layer).
const posts = fs.readdirSync('src/content/posts').filter((f) => f.endsWith('.md')).map((f) => {
  const fm = fs.readFileSync(`src/content/posts/${f}`, 'utf8').split('\n---')[0];
  const get = (k) => (fm.match(new RegExp(`^${k}:\\s*['"]?([^'"\\n]+)`, 'm')) || [])[1];
  return { slug: f.slice(0, -3), date: get('updatedDate') ?? get('pubDate'), category: get('category'), draft: get('draft') === 'true' };
}).filter((p) => !p.draft);
const postDate = new Map(posts.map((p) => [p.slug, p.date]));
const catCount = posts.reduce((m, p) => m.set(p.category, (m.get(p.category) ?? 0) + 1), new Map());
const newest = (list) => list.map((p) => p.date).sort().at(-1);

export default defineConfig({
  site: 'https://blog.sejaconte.com.br',
  trailingSlash: 'never',
  // post/slug.html is served by Netlify at /post/slug, keeping the old Automarticles URLs.
  build: { format: 'file', inlineStylesheets: 'always' },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  markdown: { shikiConfig: { theme: 'github-light' }, rehypePlugins: [rehypeImgAttrs] },
  integrations: [
    sitemap({
      // Thin categories (under 3 posts) are noindex, so they stay out of the sitemap too.
      filter: (page) => {
        const cat = page.match(/\/category\/([^/]+)$/)?.[1];
        return !page.includes('/404') && (!cat || (catCount.get(cat) ?? 0) >= 3);
      },
      serialize(item) {
        const slug = item.url.match(/\/post\/([^/]+)$/)?.[1];
        const cat = item.url.match(/\/category\/([^/]+)$/)?.[1];
        const date = slug ? postDate.get(slug) : cat ? newest(posts.filter((p) => p.category === cat)) : newest(posts);
        if (date) item.lastmod = new Date(date).toISOString();
        delete item.priority;
        delete item.changefreq;
        return item;
      },
    }),
  ],
});
