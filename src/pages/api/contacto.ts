/**
 * Recibe los formularios de la web y los reenvía a Forminit
 * (https://forminit.com), que guarda los mensajes en servidores de la UE
 * y avisa por email.
 *
 * Configuración (variables de entorno, ver .env.example):
 *   FORMINIT_FORM_ID  → identificador del formulario en Forminit (obligatorio)
 *   FORMINIT_API_KEY  → clave de API (opcional, da más margen de envíos)
 *
 * Sin FORMINIT_FORM_ID, en local el mensaje solo se muestra en la terminal
 * y en la web publicada se avisa de que el formulario no está configurado.
 */
import type { APIRoute } from 'astro';
import { getSecret } from 'astro:env/server';

export const prerender = false;

const MAX = { name: 120, email: 160, phone: 40, message: 4000, source: 40, service: 80 };

const clean = (v: unknown, max: number) =>
	(typeof v === 'string' ? v : '').replace(/\s+/g, ' ').trim().slice(0, max);

const json = (body: unknown, status = 200) =>
	new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

export const POST: APIRoute = async ({ request }) => {
	let input: Record<string, unknown>;
	try {
		const type = request.headers.get('content-type') ?? '';
		input = type.includes('application/json')
			? await request.json()
			: Object.fromEntries(await request.formData());
	} catch {
		return json({ ok: false, message: 'No hemos podido leer el formulario.' }, 400);
	}

	// Campo trampa: los bots lo rellenan, las personas no lo ven.
	if (clean(input.empresa_web, 200)) return json({ ok: true });

	const data = {
		name: clean(input.nombre, MAX.name),
		email: clean(input.email, MAX.email),
		phone: clean(input.telefono, MAX.phone),
		message: (typeof input.mensaje === 'string' ? input.mensaje : '').trim().slice(0, MAX.message),
		source: clean(input.origen, MAX.source) || 'web',
		service: clean(input.servicio, MAX.service),
	};

	const emailOk = !data.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
	if (!emailOk) return json({ ok: false, message: 'Revisa el email, parece que no es correcto.' }, 400);
	if (!data.email && !data.phone) {
		return json({ ok: false, message: 'Déjanos un email o un teléfono para poder responderte.' }, 400);
	}
	if (input.privacidad !== undefined && !input.privacidad) {
		return json({ ok: false, message: 'Tienes que aceptar la política de privacidad.' }, 400);
	}

	const formId = getSecret('FORMINIT_FORM_ID');
	if (!formId) {
		if (import.meta.env.DEV) {
			console.log('\n[formulario de prueba] Forminit no está configurado. Mensaje recibido:', data, '\n');
			return json({ ok: true, demo: true });
		}
		return json({ ok: false, message: 'El formulario aún no está activo. Escríbenos por WhatsApp o por email.' }, 503);
	}

	const sender: Record<string, string> = {};
	if (data.name) sender.fullName = data.name;
	if (data.email) sender.email = data.email;
	const blocks: unknown[] = [];
	if (Object.keys(sender).length) blocks.push({ type: 'sender', properties: sender });
	if (data.service) blocks.push({ type: 'text', name: 'servicio', value: data.service });
	if (data.phone) blocks.push({ type: 'text', name: 'telefono', value: data.phone });
	if (data.message) blocks.push({ type: 'text', name: 'mensaje', value: data.message });
	blocks.push({ type: 'text', name: 'origen', value: data.source });

	const headers: Record<string, string> = { 'Content-Type': 'application/json', Accept: 'application/json' };
	const apiKey = getSecret('FORMINIT_API_KEY');
	if (apiKey) headers['X-API-KEY'] = apiKey;

	try {
		const res = await fetch(`https://forminit.com/f/${encodeURIComponent(formId)}`, {
			method: 'POST',
			headers,
			body: JSON.stringify({ blocks }),
		});
		if (res.ok) return json({ ok: true });
		const detail = await res.text().catch(() => '');
		console.error('[formulario] Forminit respondió', res.status, detail);
		const message = res.status === 429
			? 'Has enviado varios mensajes seguidos. Espera unos segundos y vuelve a intentarlo.'
			: 'No hemos podido enviar el mensaje. Inténtalo de nuevo o escríbenos por WhatsApp.';
		return json({ ok: false, message }, 502);
	} catch (err) {
		console.error('[formulario] Error al conectar con Forminit', err);
		return json({ ok: false, message: 'No hemos podido enviar el mensaje. Inténtalo de nuevo o escríbenos por WhatsApp.' }, 502);
	}
};
