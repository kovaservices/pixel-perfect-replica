import type { Collection } from 'tinacms';

// Página de inicio: un único documento con un bloque por cada sección de la web.
// Las etiquetas y descripciones están en español porque son lo que ve el cliente
// en el editor.

const text = (name: string, label: string, description?: string) => ({
	type: 'string' as const,
	name,
	label,
	...(description ? { description } : {}),
});

const longText = (name: string, label: string, description?: string) => ({
	...text(name, label, description),
	ui: { component: 'textarea' as const },
});

export const HomeCollection: Collection = {
	name: 'home',
	label: 'Página de inicio',
	path: 'src/content/home',
	format: 'json',
	ui: {
		router: () => '/',
		allowedActions: { create: false, delete: false },
	},
	fields: [
		{
			type: 'object',
			name: 'seo',
			label: 'Google y redes sociales',
			description: 'Cómo aparece la web en los resultados de Google y al compartirla. No se ve en la página.',
			fields: [
				text('title', 'Título en Google', 'Unos 60 caracteres como máximo.'),
				longText('description', 'Descripción en Google', 'Unos 155 caracteres como máximo.'),
				{
					type: 'image',
					name: 'image',
					label: 'Imagen al compartir',
					description: 'La que aparece al enviar el enlace por WhatsApp, Instagram o LinkedIn. Tamaño: 1200 × 630 px.',
				},
			],
		},
		{
			type: 'object',
			name: 'hero',
			label: '1 · Portada',
			fields: [
				text('titleStart', 'Titular (principio)'),
				text('titleHighlight', 'Titular (parte destacada en color)'),
				text('titleEnd', 'Titular (final)', 'Opcional: lo que va después de la parte destacada.'),
				longText('subtitle', 'Subtítulo'),
				text('priceLabel', 'Texto antes del precio', 'Por ejemplo: «desde».'),
				text('price', 'Precio', 'Solo el número, sin el símbolo €.'),
				text('emailPlaceholder', 'Texto dentro del campo de email'),
				text('buttonLabel', 'Texto del botón'),
				text('callLinkLabel', 'Enlace secundario'),
				{
					type: 'object',
					name: 'images',
					label: 'Capturas de webs',
					fields: [
						{ type: 'image', name: 'laptopMain', label: 'Portátil grande' },
						{ type: 'image', name: 'laptopSecond', label: 'Portátil pequeño' },
						{ type: 'image', name: 'phone', label: 'Móvil', description: 'Imagen vertical.' },
					],
				},
			],
		},
		{
			type: 'object',
			name: 'services',
			label: '2 · Servicios',
			fields: [
				text('eyebrow', 'Etiqueta pequeña'),
				text('title', 'Título'),
				longText('text', 'Texto'),
				{
					type: 'object',
					name: 'items',
					label: 'Servicios',
					list: true,
					ui: { itemProps: (item: { title?: string }) => ({ label: item?.title }) },
					fields: [
						{
							type: 'string',
							name: 'icon',
							label: 'Icono',
							options: [
								{ value: 'layout-template', label: 'Página web' },
								{ value: 'shopping-bag', label: 'Bolsa de la compra' },
								{ value: 'store', label: 'Tienda' },
								{ value: 'app-window', label: 'Aplicación' },
								{ value: 'code-xml', label: 'Código' },
								{ value: 'layout-dashboard', label: 'Panel de gestión' },
								{ value: 'workflow', label: 'Automatización' },
								{ value: 'monitor-smartphone', label: 'Ordenador y móvil' },
								{ value: 'life-buoy', label: 'Soporte' },
							],
						},
						text('title', 'Nombre del servicio', 'También aparece en el desplegable del formulario de contacto.'),
						longText('text', 'Descripción'),
						{ type: 'string', name: 'features', label: 'Puntos destacados', list: true },
						text('buttonLabel', 'Texto del botón'),
					],
				},
			],
		},
		{
			type: 'object',
			name: 'includes',
			label: '3 · Qué incluye cada web',
			fields: [
				text('eyebrow', 'Etiqueta pequeña'),
				text('title', 'Título'),
				longText('text', 'Texto'),
				{ type: 'string', name: 'items', label: 'Lista de cosas incluidas', list: true },
			],
		},
		{
			type: 'object',
			name: 'priceBand',
			label: '4 · Banda de precio',
			fields: [
				text('label', 'Texto antes del precio'),
				text('price', 'Precio', 'Solo el número, sin el símbolo €.'),
				text('note', 'Nota bajo el precio'),
				text('buttonLabel', 'Texto del botón'),
			],
		},
		{
			type: 'object',
			name: 'plans',
			label: '5 · Modalidades',
			fields: [
				text('eyebrow', 'Etiqueta pequeña'),
				text('title', 'Título'),
				{
					type: 'object',
					name: 'items',
					label: 'Modalidades',
					list: true,
					ui: { itemProps: (item: { name?: string }) => ({ label: item?.name }) },
					fields: [
						text('name', 'Nombre'),
						text('description', 'Descripción corta'),
						text('price', 'Precio', 'Solo el número, sin el símbolo €.'),
						text('priceExtra', 'Cuota u otro importe', 'Opcional. Aparece junto al precio, por ejemplo: «+ 99 €/mes».'),
						{ type: 'boolean', name: 'featured', label: 'Destacar esta modalidad' },
						text('badge', 'Etiqueta de destacada', 'Solo se ve si la modalidad está destacada.'),
						{ type: 'string', name: 'features', label: 'Qué incluye', list: true },
						text('buttonLabel', 'Texto del botón'),
					],
				},
				{
					type: 'object',
					name: 'custom',
					label: 'Banda «Presupuesto a medida»',
					description: 'Aparece debajo de las modalidades, para servicios sin precio fijo (tiendas, aplicaciones, software).',
					fields: [
						text('title', 'Título'),
						longText('text', 'Texto'),
						{ type: 'string', name: 'tags', label: 'Etiquetas', description: 'Servicios que se muestran como pequeñas etiquetas.', list: true },
						text('buttonLabel', 'Texto del botón'),
					],
				},
			],
		},
		{
			type: 'object',
			name: 'projects',
			label: '6 · Proyectos',
			fields: [
				text('eyebrow', 'Etiqueta pequeña'),
				text('title', 'Título'),
				{
					type: 'object',
					name: 'items',
					label: 'Proyectos',
					list: true,
					ui: { itemProps: (item: { name?: string }) => ({ label: item?.name }) },
					fields: [
						text('name', 'Nombre del proyecto'),
						text('description', 'Descripción corta'),
						{
							type: 'string',
							name: 'tag',
							label: 'Tipo',
							options: ['Diseño web', 'Tienda online'],
						},
						{ type: 'image', name: 'image', label: 'Captura de la web', description: 'Horizontal, a ser posible 1280 × 800 px.' },
						text('url', 'Enlace a la web', 'Dirección completa, empezando por https://'),
					],
				},
			],
		},
		{
			type: 'object',
			name: 'why',
			label: '7 · Por qué Kova',
			fields: [
				text('eyebrow', 'Etiqueta pequeña'),
				text('title', 'Título'),
				{
					type: 'object',
					name: 'items',
					label: 'Motivos',
					list: true,
					ui: { itemProps: (item: { title?: string }) => ({ label: item?.title }) },
					fields: [
						{
							type: 'string',
							name: 'icon',
							label: 'Icono',
							options: [
								{ value: 'map-pin', label: 'Ubicación' },
								{ value: 'key-round', label: 'Llave' },
								{ value: 'pencil-line', label: 'Lápiz' },
								{ value: 'badge-euro', label: 'Euro' },
								{ value: 'clock', label: 'Reloj' },
								{ value: 'shield-check', label: 'Escudo' },
								{ value: 'smartphone', label: 'Móvil' },
								{ value: 'heart-handshake', label: 'Apretón de manos' },
							],
						},
						text('title', 'Título'),
						longText('text', 'Texto'),
					],
				},
			],
		},
		{
			type: 'object',
			name: 'process',
			label: '8 · Cómo trabajamos',
			fields: [
				text('eyebrow', 'Etiqueta pequeña'),
				text('title', 'Título'),
				longText('text', 'Texto'),
				{
					type: 'object',
					name: 'steps',
					label: 'Pasos',
					list: true,
					ui: { itemProps: (item: { title?: string }) => ({ label: item?.title }) },
					fields: [text('title', 'Título del paso'), longText('text', 'Texto')],
				},
			],
		},
		{
			type: 'object',
			name: 'faq',
			label: '9 · Preguntas frecuentes',
			fields: [
				text('eyebrow', 'Etiqueta pequeña'),
				text('title', 'Título'),
				text('buttonLabel', 'Texto del botón'),
				{
					type: 'object',
					name: 'items',
					label: 'Preguntas',
					list: true,
					ui: { itemProps: (item: { question?: string }) => ({ label: item?.question }) },
					fields: [text('question', 'Pregunta'), longText('answer', 'Respuesta')],
				},
			],
		},
		{
			type: 'object',
			name: 'contact',
			label: '10 · Contacto',
			fields: [
				text('eyebrow', 'Etiqueta pequeña'),
				text('title', 'Título'),
				longText('text', 'Texto'),
				text('servicePlaceholder', 'Texto del desplegable de servicios', 'Las opciones son los servicios de la sección «Servicios», más «Otra cosa».'),
				text('messagePlaceholder', 'Texto dentro del campo de mensaje'),
				text('buttonLabel', 'Texto del botón'),
			],
		},
	],
};
