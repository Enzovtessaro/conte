import rss from '@astrojs/rss';
import { getPosts } from '../lib/posts';
import { SITE, CATEGORIES, AUTHORS } from '../lib/site';

export async function GET() {
  const posts = await getPosts();
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: SITE.url,
    trailingSlash: false,
    customData: `<language>pt-br</language>`,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      link: `/post/${p.id}`,
      pubDate: p.data.pubDate,
      categories: [CATEGORIES[p.data.category].name, ...p.data.tags],
      author: AUTHORS[p.data.author].name,
    })),
  });
}
