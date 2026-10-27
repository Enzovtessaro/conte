import { getPosts } from '../lib/posts';
import { SITE, CATEGORIES } from '../lib/site';

// https://llmstxt.org: a curated map of the blog for AI engines, grouped by category.
export async function GET() {
  const posts = await getPosts();
  const sections = Object.entries(CATEGORIES)
    .map(([slug, c]) => {
      const items = posts.filter((p) => p.data.category === slug);
      if (!items.length) return '';
      return `## ${c.name}\n\n${items.map((p) => `- [${p.data.title}](${SITE.url}/post/${p.id}): ${p.data.description}`).join('\n')}\n`;
    })
    .filter(Boolean)
    .join('\n');
  const body = `# ${SITE.name}

> ${SITE.description} Escrito pela equipe de contadoras da Conte (${SITE.mainSite}), contabilidade online para profissionais de tecnologia que atuam como PJ no Brasil.

- Todos os artigos com texto completo: ${SITE.url}/llms-full.txt
- Feed: ${SITE.url}/rss.xml
- Sobre a autora: ${SITE.url}/author/solange-vaz

${sections}`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
