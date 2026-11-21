/**
 * /llms.txt: resumen de Kova en texto plano para los asistentes de IA
 * (ChatGPT, Claude, Perplexity…). Se genera con los mismos textos de la web.
 */
import type { APIRoute } from 'astro';
import { getHome, getProjectPages, getServicePages, getSettings, isFilled, list, getZonePage, ZONE_HREF } from '../lib/data';

export const GET: APIRoute = ({ site }) => {
	const home = getHome();
	const settings = getSettings();
	const abs = (p: string) => new URL(p, site).href;
	const plans = list(home.plans.items).map((p) => {
		const extra = 'priceExtra' in p && p.priceExtra ? ` ${p.priceExtra}` : '';
		const note = 'priceNote' in p && p.priceNote ? ` ${p.priceNote}` : '';
		return `- ${p.name}: ${p.price} €${extra}. ${p.description}${note}`;
	});
	const lines = [
		'# Kova',
		'',
		'> Soluciones digitales a medida para tu negocio: diseño de páginas web, automatizaciones, aplicaciones y software a medida. Precio cerrado antes de empezar, sin permanencias, y la web, el dominio y el código a nombre del cliente.',
		'',
		`Kova es una empresa de soluciones digitales con base en ${settings.base ?? 'Ciudad Real'} (España) que trabaja con negocios de toda España y de otros países, sobre todo en remoto. Atiende en español.`,
		'',
		'## Servicios',
		'',
		...getServicePages().map((s) => `- [${s.service}](${abs(s.href)}): ${s.seo.description}`),
		`- [Diseño web en Ciudad Real](${abs(ZONE_HREF)}): ${getZonePage().seo.description}`,
		'- Mantenimiento: actualizaciones, copias de seguridad, pequeños cambios y ayuda por teléfono y WhatsApp.',
		'',
		'## Precios de páginas web',
		'',
		...plans,
		'- Automatizaciones, aplicaciones y software: presupuesto cerrado en 24-48 horas, sin compromiso.',
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
