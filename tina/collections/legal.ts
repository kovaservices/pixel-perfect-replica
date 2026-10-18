import type { Collection } from 'tinacms';

// Páginas legales: aviso legal, privacidad y cookies. Cada una es un archivo
// Markdown en src/content/legal y se ve en /legal/<nombre-del-archivo>.
export const LegalCollection: Collection = {
	name: 'legal',
	label: 'Textos legales',
	path: 'src/content/legal',
	format: 'md',
	ui: {
		router: ({ document }) => `/legal/${document._sys.filename}`,
		allowedActions: { create: false, delete: false },
	},
	fields: [
		{ type: 'string', name: 'title', label: 'Título', isTitle: true, required: true },
		{
			type: 'string',
			name: 'updated',
			label: 'Última actualización',
			description: 'Fecha que aparece bajo el título, por ejemplo: 18 de octubre de 2026.',
		},
		{ type: 'rich-text', name: 'body', label: 'Texto', isBody: true },
	],
};
