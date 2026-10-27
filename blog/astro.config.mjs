import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://blog.sejaconte.com.br',
  trailingSlash: 'never',
  // post/slug.html is served by Netlify at /post/slug, keeping the old Automarticles URLs.
  build: { format: 'file', inlineStylesheets: 'always' },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  markdown: { shikiConfig: { theme: 'github-light' } },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        if (item.url.includes('/post/')) item.priority = 0.8;
        return item;
      },
    }),
  ],
});
