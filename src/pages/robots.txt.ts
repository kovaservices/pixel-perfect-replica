/**
 * robots.txt generado al compilar, para que la dirección del sitemap use
 * siempre el dominio real de la web (SITE_URL).
 */
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
	const sitemap = new URL('/sitemap-index.xml', site).href;
	// Se deja entrar a todos los buscadores y asistentes de IA (queremos que
	// nos citen y recomienden). Los de IA se nombran para que quede explícito.
	const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'CCBot'];
	const body = [
		'User-agent: *',
		'Disallow: /api/',
		'',
		...aiBots.map((b) => `User-agent: ${b}`),
		'Allow: /',
		'Disallow: /api/',
		'',
		`Sitemap: ${sitemap}`,
		'',
	].join('\n');
	return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
