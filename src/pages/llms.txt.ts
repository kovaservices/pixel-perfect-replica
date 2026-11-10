/**
 * /llms.txt: resumen de Kova en texto plano para los asistentes de IA
 * (ChatGPT, Claude, Perplexity…). Se genera con los mismos textos de la web.
 */
import type { APIRoute } from 'astro';
import { getHome, getProjectPages, getServicePages, getSettings, isFilled, list } from '../lib/data';

export const GET: APIRoute = ({ site }) => {
	const home = getHome();
	const settings = getSettings();
	const abs = (p: string) => new URL(p, site).href;
	const plans = list(home.plans.items).map((p) => {
		const extra = 'priceExtra' in p && p.priceExtra ? ` ${p.priceExtra}` : '';
		return `- ${p.name}: ${p.price} €${extra}. ${p.description}`;
	});
	const lines = [
		'# Kova',
		'',
		'> Soluciones digitales a medida para tu negocio: diseño de páginas web, automatizaciones, aplicaciones y software a medida. Precio cerrado antes de empezar, sin permanencias, y la web, el dominio y el código a nombre del cliente.',
		'',
		`Kova es una empresa de soluciones digitales con sede en ${settings.location} (España) que trabaja con negocios de toda España, en persona o en remoto. Atiende en español.`,
		'',
		'## Servicios',
		'',
		...getServicePages().map((s) => `- [${s.service}](${abs(s.href)}): ${s.seo.description}`),
		'- Mantenimiento: actualizaciones, copias de seguridad, pequeños cambios y ayuda por teléfono y WhatsApp.',
		'',
		'## Precios de páginas web',
		'',
		...plans,
		'- Tiendas online, automatizaciones, aplicaciones y software: presupuesto cerrado en 24-48 horas, sin compromiso.',
		'',
		'## Cómo trabajamos',
		'',
		...list(home.process.steps).map((s, i) => `${i + 1}. ${s.title}: ${s.text}`),
		'',
		'## Proyectos',
		'',
		...getProjectPages().map((p) => `- [${p.name}](${abs(p.href)}): ${p.summary} Web: ${p.url}`),
		'',
		'## Preguntas frecuentes',
		'',
		...list(home.faq.items).flatMap((f) => [`### ${f.question}`, f.answer, '']),
		'## Contacto',
		'',
		`- Web: ${abs('/')}`,
		`- Formulario: ${abs('/#contacto')}`,
		...(isFilled(settings.email) ? [`- Email: ${settings.email}`] : []),
		...(isFilled(settings.phone) ? [`- Teléfono: ${settings.phone}`] : []),
		'',
	];
	return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
