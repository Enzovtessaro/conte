import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', (p) => !p.data.draft && p.data.pubDate <= new Date());
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function readingMinutes(body = ''): number {
  return Math.max(1, Math.round(body.split(/\s+/).length / 200));
}

export function wordCount(body = ''): number {
  return body.split(/\s+/).filter(Boolean).length;
}

const dateFmt = new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
export const formatDate = (d: Date) => dateFmt.format(d);
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);

/** Related posts: same category first, then shared tags, newest first. */
export function related(post: Post, all: Post[], n = 3): Post[] {
  const score = (p: Post) =>
    (p.data.category === post.data.category ? 2 : 0) + p.data.tags.filter((t) => post.data.tags.includes(t)).length;
  return all
    .filter((p) => p.id !== post.id)
    .map((p) => ({ p, s: score(p) }))
    .sort((a, b) => b.s - a.s || b.p.data.pubDate.valueOf() - a.p.data.pubDate.valueOf())
    .slice(0, n)
    .map((x) => x.p);
}
