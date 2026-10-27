import { SITE } from './site';
import type { Post } from './posts';

export const itemList = (posts: Post[], name: string) => ({
  '@type': 'ItemList',
  name,
  itemListElement: posts.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE.url}/post/${p.id}`, name: p.data.title })),
});
