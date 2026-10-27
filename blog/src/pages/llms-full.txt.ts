import { getPosts, isoDate } from '../lib/posts';
import { SITE, CATEGORIES, AUTHORS } from '../lib/site';

export async function GET() {
  const posts = await getPosts();
  const body = posts
    .map((p) => {
      const d = p.data;
      const tldr = d.tldr.length ? `Resposta rápida:\n${d.tldr.map((t) => `- ${t}`).join('\n')}\n\n` : '';
      const sources = d.sources.length ? `\n\nFontes:\n${d.sources.map((x) => `- ${x.title}: ${x.url}`).join('\n')}` : '';
      const faq = d.faq.length ? `\n\n### Perguntas frequentes\n\n${d.faq.map((f) => `**${f.q}**\n${f.a}`).join('\n\n')}` : '';
      return `# ${d.title}\n\nURL: ${SITE.url}/post/${p.id}\nCategoria: ${CATEGORIES[d.category].name}\nAutora: ${AUTHORS[d.author].name} (${AUTHORS[d.author].crc})\nAtualizado em: ${isoDate(d.updatedDate ?? d.pubDate)}\n\n${d.description}\n\n${tldr}${p.body?.trim() ?? ''}${faq}${sources}`;
    })
    .join('\n\n---\n\n');
  return new Response(`# ${SITE.name}: texto completo\n\n${body}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
