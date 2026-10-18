import type { Collection } from 'tinacms';

// Datos que se repiten en varias partes de la web (cabecera, contacto, pie,
// botón de WhatsApp). Se cambian una vez aquí y se actualizan en todas.
export const SettingsCollection: Collection = {
	name: 'settings',
	label: 'Datos de la empresa',
	path: 'src/content/config',
	format: 'json',
	ui: {
		global: true,
		allowedActions: { create: false, delete: false },
	},
	fields: [
		{ type: 'string', name: 'siteName', label: 'Nombre de la empresa' },
		{ type: 'string', name: 'location', label: 'Ciudad o zona', description: 'Aparece en el pie de la web.' },
		{
			type: 'string',
			name: 'phone',
			label: 'Teléfono',
			description: 'Tal como quieres que se lea, por ejemplo: 600 123 456.',
		},
		{
			type: 'string',
			name: 'whatsapp',
			label: 'Número de WhatsApp',
			description: 'Con prefijo de país y sin espacios ni «+», por ejemplo: 34600123456.',
		},
		{ type: 'string', name: 'email', label: 'Email de contacto' },
		{
			type: 'object',
			name: 'social',
			label: 'Redes sociales',
			description: 'Pega la dirección completa del perfil (empieza por https://). Deja el campo vacío para ocultar esa red.',
			fields: [
				{ type: 'string', name: 'instagram', label: 'Instagram' },
				{ type: 'string', name: 'linkedin', label: 'LinkedIn' },
				{ type: 'string', name: 'tiktok', label: 'TikTok' },
			],
		},
		{
			type: 'object',
			name: 'nav',
			label: 'Menú de la cabecera',
			list: true,
			ui: { itemProps: (item: { label?: string }) => ({ label: item?.label }) },
			fields: [
				{ type: 'string', name: 'label', label: 'Texto' },
				{ type: 'string', name: 'link', label: 'Enlace', description: 'Por ejemplo #contacto para ir a una sección.' },
			],
		},
		{ type: 'string', name: 'headerButton', label: 'Botón principal de la cabecera' },
		{ type: 'string', name: 'services', label: 'Servicios (pie de página)', list: true },
		{ type: 'string', name: 'copyright', label: 'Texto de copyright' },
		{
			type: 'object',
			name: 'notFound',
			label: 'Página no encontrada (404)',
			description: 'Lo que se ve cuando alguien entra en una dirección que no existe.',
			fields: [
				{ type: 'string', name: 'title', label: 'Título' },
				{ type: 'string', name: 'text', label: 'Texto', ui: { component: 'textarea' } },
				{ type: 'string', name: 'button', label: 'Botón para volver al inicio' },
				{ type: 'string', name: 'contactLink', label: 'Enlace a contacto' },
			],
		},
	],
};
