// Adds width/height (from the file in public/), lazy loading and async decoding to images in post bodies,
// so markdown images don't cause layout shift or load eagerly.
import fs from 'node:fs';
import path from 'node:path';
import { imageSize } from 'image-size';

const cache = new Map();
function dims(src) {
  if (!src?.startsWith('/')) return null;
  if (!cache.has(src)) {
    const file = path.resolve('public', src.slice(1));
    try {
      const { width, height } = imageSize(fs.readFileSync(file));
      cache.set(src, { width, height });
    } catch {
      cache.set(src, null);
    }
  }
  return cache.get(src);
}

export default function rehypeImgAttrs() {
  return (tree) => {
    const walk = (node) => {
      if (node.type === 'element' && node.tagName === 'img') {
        const p = node.properties ?? (node.properties = {});
        const d = dims(p.src);
        if (d && !p.width) Object.assign(p, { width: d.width, height: d.height });
        p.loading ??= 'lazy';
        p.decoding ??= 'async';
      }
      node.children?.forEach(walk);
    };
    walk(tree);
  };
}
