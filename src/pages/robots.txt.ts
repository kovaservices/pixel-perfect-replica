/**
 * robots.txt generado al compilar, para que la dirección del sitemap use
 * siempre el dominio real de la web (SITE_URL).
 */
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
	const sitemap = new URL('/sitemap-index.xml', site).href;
	const body = ['User-agent: *', 'Disallow: /admin/', 'Disallow: /api/', 'Disallow: /tina-island/', '', `Sitemap: ${sitemap}`, ''].join('\n');
	return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
