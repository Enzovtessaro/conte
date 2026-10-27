// Pre-publish gate for blog posts. Runs in `npm run check` (and on every Netlify build).
// Fails on anything that would hurt SEO/GEO or break the site; the Blog Writer agent must pass it before merging.
import fs from 'node:fs';
import path from 'node:path';

const dir = path.resolve('src/content/posts');
const pub = path.resolve('public');
const errors = [];
const warnings = [];
const titles = new Map();
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));

for (const file of files) {
  const slug = file.replace(/\.md$/, '');
  const raw = fs.readFileSync(path.join(dir, file), 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const err = (msg) => errors.push(`${file}: ${msg}`);
  const warn = (msg) => warnings.push(`${file}: ${msg}`);
  if (!m) { err('missing frontmatter'); continue; }
  const [, fm, body] = m;
  const field = (k) => (fm.match(new RegExp(`^${k}:\\s*['"]?(.*?)['"]?\\s*$`, 'm')) || [])[1];
  const isNew = !/^migratedFrom:/m.test(fm);

  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) err('slug must be lowercase ascii words joined by hyphens');
  if (slug.length > 80) err('slug longer than 80 chars');
  const title = field('title');
  if (!title) err('missing title');
  else if (titles.has(title.toLowerCase())) err(`duplicate title of ${titles.get(title.toLowerCase())}`);
  else titles.set(title.toLowerCase(), file);
  const desc = field('description') || '';
  if (desc.length < 50 || desc.length > 200) err(`description is ${desc.length} chars (50-200)`);
  if (!field('pubDate')) err('missing pubDate');

  for (const img of [field('cover'), ...[...body.matchAll(/!\[[^\]]*\]\((\/[^)\s]+)/g)].map((x) => x[1])].filter(Boolean)) {
    if (img.startsWith('/') && !fs.existsSync(path.join(pub, img))) err(`image not found in public/: ${img}`);
  }
  if (/^#\s/m.test(body)) err('body must not contain an H1 (the title is the H1)');
  for (const [, href] of body.matchAll(/\]\((\/post\/[^)#\s]+)/g)) {
    if (!fs.existsSync(path.join(dir, `${href.slice(6)}.md`))) err(`broken internal link ${href}`);
  }

  if (isNew) {
    const words = body.split(/\s+/).filter(Boolean).length;
    if (words < 900) err(`only ${words} words (new posts need 900+)`);
    if (!/^cover:/m.test(fm) || !/^coverAlt:/m.test(fm)) err('new posts need cover and coverAlt');
    if (!/^tldr:\n(\s+- .+\n){2,}/m.test(fm + '\n')) err('new posts need a tldr with 2-5 items');
    if ((fm.match(/^\s+- q:/gm) || []).length < 3) err('new posts need at least 3 FAQ entries');
    if ((fm.match(/^\s+url:/gm) || []).length < 2) err('new posts need at least 2 sources (official pages preferred)');
    if ((body.match(/^## /gm) || []).length < 4) err('new posts need at least 4 H2 sections');
    if ((body.match(/\]\(\/post\//g) || []).length < 2) err('new posts need at least 2 internal links to other posts');
    if (!/sejaconte\.com\.br/.test(body)) warn('no link to sejaconte.com.br in the body');
    if ((field('seoTitle') || title || '').length > 65) warn('seoTitle over 65 chars will be truncated in Google');
  }
}

for (const w of warnings) console.warn(`warn  ${w}`);
for (const e of errors) console.error(`ERROR ${e}`);
console.log(`${files.length} posts checked, ${errors.length} errors, ${warnings.length} warnings`);
process.exit(errors.length ? 1 : 0);
