/**
 * Contenido de la web. Los textos están en src/content/ (JSON y Markdown)
 * y se editan directamente en esos archivos.
 */
import homeJson from '../content/home/index.json';
import settingsJson from '../content/config/settings.json';

export type Home = typeof homeJson;
export type Settings = typeof settingsJson;

export const getHome = (): Home => homeJson;
export const getSettings = (): Settings => settingsJson;

/** Páginas de servicio: un JSON por página en src/content/servicios/. El
 *  nombre del archivo es la dirección (paginas-web.json → /paginas-web). */
const serviceFiles = import.meta.glob<{ default: ServiceData }>('../content/servicios/*.json', { eager: true });
type ServiceData = typeof import('../content/servicios/paginas-web.json');
export type ServicePage = ServiceData & { slug: string; href: string };
export const getServicePages = (): ServicePage[] =>
	Object.entries(serviceFiles)
		.map(([path, mod]) => {
			const slug = path.split('/').pop()!.replace(/\.json$/, '');
			return { ...mod.default, slug, href: `/${slug}/` };
		})
		.sort((a, b) => a.order - b.order);

/** Dirección de la página de un servicio a partir de su nombre, si la tiene. */
export const serviceHref = (name?: string | null) =>
	getServicePages().find((p) => p.service === name)?.href;

/** Casos de clientes: un JSON por proyecto en src/content/proyectos/. */
const projectFiles = import.meta.glob<{ default: ProjectData }>('../content/proyectos/*.json', { eager: true });
type ProjectData = typeof import('../content/proyectos/alfisa-instalaciones.json');
export type ProjectPage = ProjectData & { slug: string; href: string };
export const getProjectPages = (): ProjectPage[] =>
	Object.entries(projectFiles).map(([path, mod]) => {
		const slug = path.split('/').pop()!.replace(/\.json$/, '');
		return { ...mod.default, slug, href: `/proyectos/${slug}/` };
	});

/** ¿Es un dato real o todavía un marcador como [TELÉFONO]? */
export const isFilled = (v?: string | null) => !!v && v.trim() !== '' && !/^\[.*\]$/.test(v.trim());

/** Quita los elementos vacíos de una lista. */
export const list = <T>(items: (T | null | undefined)[] | null | undefined): T[] =>
	(items ?? []).filter((x): x is T => x != null);

/** Enlaces de contacto a partir de los datos de la empresa. Si el dato
 *  aún es un marcador como [TELÉFONO], el enlace queda vacío. */
export function contactLinks(s: Settings | null | undefined) {
	const digits = (v?: string | null) => (v ?? '').replace(/[^\d]/g, '');
	const phone = digits(s?.phone);
	const wa = digits(s?.whatsapp);
	const email = s?.email && s.email.includes('@') ? s.email : '';
	return {
		tel: phone ? `tel:+${phone.length === 9 ? '34' + phone : phone}` : '/#contacto',
		whatsapp: wa ? `https://wa.me/${wa}` : '/#contacto',
		mailto: email ? `mailto:${email}` : '/#contacto',
		/** Sin número de WhatsApp real, los botones de WhatsApp no se muestran. */
		hasWhatsapp: wa.length >= 9,
	};
}
