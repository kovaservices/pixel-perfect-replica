// Prepara dist/client para la vista previa en GitHub Pages, que sirve la web
// en una subcarpeta (https://usuario.github.io/repositorio/). Añade esa
// subcarpeta a las rutas que empiezan por "/" y evita que Google la indexe.
// Solo lo usa .github/workflows/pages.yml; no afecta a local ni a Cloudflare.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const dir = 'dist/client';
const origin = (process.env.PAGES_ORIGIN ?? '').replace(/\/$/, '');
const base = (process.env.PAGES_BASE ?? '').replace(/\/$/, '');
if (!origin) throw new Error('Falta PAGES_ORIGIN');

async function* files(path) {
	for (const entry of await readdir(path, { withFileTypes: true })) {
		const full = join(path, entry.name);
		if (entry.isDirectory()) yield* files(full);
		else yield full;
	}
}

for await (const file of files(dir)) {
	const ext = extname(file);
	if (!['.html', '.xml', '.css'].includes(ext)) continue;
	let text = await readFile(file, 'utf8');
	if (base) {
		text = text
			.replace(/((?:href|src|srcset|action|content|poster|data-image)=")\/(?!\/)/g, `$1${base}/`)
			.replace(/url\(\/(?!\/)/g, `url(${base}/`)
			.replaceAll(`${origin}/`, `${origin}${base}/`);
	}
	if (ext === '.html') text = text.replace('<head>', '<head><meta name="robots" content="noindex, nofollow">');
	await writeFile(file, text);
}

await writeFile(join(dir, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
console.log(`Vista previa lista para ${origin}${base}/`);
