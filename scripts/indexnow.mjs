// Avisa a Bing (y al resto de buscadores con IndexNow) de todas las páginas
// del sitemap publicado. Lo ejecuta .github/workflows/indexnow.yml después de
// cada cambio en web-astro; también se puede lanzar a mano: node scripts/indexnow.mjs
import { readdirSync, readFileSync } from 'node:fs';

const site = (process.env.SITE_URL || 'https://kovaservices.es').replace(/\/$/, '');
const keyFile = readdirSync('public').find((f) => /^[a-f0-9]{32}\.txt$/.test(f));
if (!keyFile) throw new Error('Falta la clave de IndexNow en public/');
const key = readFileSync(`public/${keyFile}`, 'utf8').trim();

const xml = await (await fetch(`${site}/sitemap-0.xml`)).text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urlList.length) throw new Error('El sitemap no tiene direcciones');

const res = await fetch('https://api.indexnow.org/indexnow', {
	method: 'POST',
	headers: { 'Content-Type': 'application/json; charset=utf-8' },
	body: JSON.stringify({ host: new URL(site).host, key, keyLocation: `${site}/${keyFile}`, urlList }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} (${urlList.length} direcciones)`);
if (res.status >= 400) process.exit(1);
