/**
 * Carga del contenido desde Tina. `requestWithMetadata()` añade la
 * información que necesita el editor visual para saber qué campo es cada
 * texto de la página.
 */
import { requestWithMetadata } from '@tinacms/astro/data';
import client from '../../tina/__generated__/client';

export const getHome = () =>
	requestWithMetadata(client.queries.home({ relativePath: 'index.json' }), { priority: 'primary' });

export const getSettings = () =>
	requestWithMetadata(client.queries.settings({ relativePath: 'settings.json' }));

// Los datos de la empresa como contenido principal de la página (la 404).
export const getSettingsPrimary = () =>
	requestWithMetadata(client.queries.settings({ relativePath: 'settings.json' }), { priority: 'primary' });

export const getLegal = (slug: string) =>
	requestWithMetadata(client.queries.legal({ relativePath: `${slug}.md` }), { priority: 'primary' });

export async function listLegal() {
	const result = await client.queries.legalConnection();
	return (result.data.legalConnection.edges ?? []).flatMap((e) => (e?.node ? [e.node] : []));
}

export type Home = Awaited<ReturnType<typeof getHome>>['data']['home'];
export type Legal = Awaited<ReturnType<typeof getLegal>>['data']['legal'];
export type Settings = Awaited<ReturnType<typeof getSettings>>['data']['settings'];

/** Quita los elementos vacíos que Tina puede devolver en las listas. */
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
