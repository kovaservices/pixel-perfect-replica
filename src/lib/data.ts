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
	};
}
