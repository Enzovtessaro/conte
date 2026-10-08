import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const { render, blogPosts } = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href);
const routes = ['/', '/calculadora', '/clt-vs-pj', '/blog', ...blogPosts.map((p) => `/blog/${p.slug}`)];

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8');

const renderPage = (route) => {
  const { html, head } = render(route);
  return template.replace('<!--app-head-->', head).replace('<div id="root"></div>', `<div id="root">${html}</div>`);
};

for (const route of routes) {
  const outDir = path.join(dist, route);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), renderPage(route));
  console.log(`prerendered ${route}`);
}

// Netlify serves 404.html with a real 404 status for any path without a file.
fs.writeFileSync(path.join(dist, '404.html'), renderPage('/404'));
console.log('prerendered 404');

fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
