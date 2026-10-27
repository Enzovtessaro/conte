import { getPosts } from '../lib/posts';
import { SITE, CATEGORIES, AUTHORS } from '../lib/site';

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
  const author = AUTHORS['solange-vaz'];
  const body = `# ${SITE.name}

> ${SITE.description} Escrito por ${author.name}, contadora (${author.crc}) e fundadora da Conte (${SITE.mainSite}), contabilidade online para profissionais de tecnologia que atuam como PJ no Brasil.

- [Sobre o blog](${SITE.url}/sobre): quem escreve, o que é a Conte e para quem é o conteúdo.
- [Como revisamos o conteúdo](${SITE.url}/como-revisamos): fontes oficiais usadas e como as regras fiscais são conferidas.
- [Texto completo de todos os artigos](${SITE.url}/llms-full.txt): todos os posts em texto puro.

${sections}
## Optional

- [Feed RSS](${SITE.url}/rss.xml): artigos mais recentes.
- [${author.name}](${SITE.url}/author/solange-vaz): página da autora com todos os artigos.
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
