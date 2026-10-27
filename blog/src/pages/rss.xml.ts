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
    xmlns: { dc: 'http://purl.org/dc/elements/1.1/', atom: 'http://www.w3.org/2005/Atom' },
    customData: `<language>pt-br</language><atom:link href="${SITE.url}/rss.xml" rel="self" type="application/rss+xml"/>`,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.tldr.length ? p.data.tldr.join(' ') : p.data.description,
      link: `/post/${p.id}`,
      pubDate: p.data.pubDate,
      categories: [CATEGORIES[p.data.category].name, ...p.data.tags],
      customData: `<dc:creator>${AUTHORS[p.data.author].name}</dc:creator>`,
    })),
  });
}
