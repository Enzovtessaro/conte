import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const { render, routes } = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href);

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8');

const renderPage = (route) => {
  const { html, head } = render(route);
  return template.replace('<!--app-head-->', head).replace('<div id="root"></div>', `<div id="root">${html}</div>`);
};

// Flat files (calculadora.html, not calculadora/index.html): Netlify serves /calculadora directly,
// without redirecting to /calculadora/, so the URL matches the canonical.
for (const route of routes) {
  const file = path.join(dist, route === '/' ? 'index.html' : `${route.slice(1)}.html`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, renderPage(route));
  console.log(`prerendered ${route}`);
}

// Netlify serves 404.html with a real 404 status for any path without a file.
fs.writeFileSync(path.join(dist, '404.html'), renderPage('/404'));
console.log('prerendered 404');

// The sitemap comes from the same route list, so a new page can't be missing from it.
const today = new Date().toISOString().slice(0, 10);
const urls = routes.map((r) => `  <url>\n    <loc>https://sejaconte.com.br${r}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`);
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
);
console.log(`sitemap: ${routes.length} urls`);

fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
