// Netlify runs a function with this name after every successful deploy. On production deploys,
// it sends every URL in the sitemap to IndexNow, which Bing (and through it Copilot)
// and Yandex use to recrawl pages without waiting. The key is public by design: it's served at /a833db6b0efca86ae29386865ee46f11.txt.
const KEY = 'a833db6b0efca86ae29386865ee46f11';
const HOST = 'sejaconte.com.br';

export const handler = async (event) => {
  const { payload } = JSON.parse(event.body || '{}');
  if (payload?.context !== 'production') return { statusCode: 200, body: 'skipped: not production' };

  const sitemap = await fetch(`https://${HOST}/sitemap.xml`).then((r) => r.text());
  const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
  });
  console.log(`IndexNow: ${urlList.length} urls, HTTP ${res.status}`);
  return { statusCode: 200, body: `indexnow ${res.status}` };
};
