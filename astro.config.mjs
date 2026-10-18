// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tina from '@tinacms/astro/integration';
import { tinaAdminDevRedirect } from '@tinacms/astro/vite';
import tailwindcss from '@tailwindcss/vite';

// Todas las páginas se generan como HTML estático. La única ruta "en vivo"
// es /tina-island, que usa el editor visual de Tina. En Cloudflare Pages se
// usa su adaptador automáticamente; en cualquier otro sitio, un servidor Node.
async function getAdapter() {
	if (process.env.CF_PAGES || process.env.WORKERS_CI || process.env.DEPLOY_ADAPTER === 'cloudflare') {
		return (await import('@astrojs/cloudflare')).default();
	}
	return (await import('@astrojs/node')).default({ mode: 'standalone' });
}

function getSiteUrl() {
	if (process.env.SITE_URL) return process.env.SITE_URL;
	if (process.env.CF_PAGES_URL) return process.env.CF_PAGES_URL;
	return 'http://localhost:4321';
}

export default defineConfig({
	site: getSiteUrl(),
	output: 'static',
	adapter: await getAdapter(),
	integrations: [
		sitemap(),
		// Iconos de Lucide que usa la web (los 8 últimos son los que se pueden
		// elegir en «Por qué Kova» desde el editor).
		icon({
			include: {
				lucide: [
					'arrow-right', 'menu', 'x', 'check', 'external-link', 'plus', 'phone', 'mail', 'message-circle',
					'map-pin', 'key-round', 'pencil-line', 'badge-euro', 'clock', 'shield-check', 'smartphone', 'heart-handshake',
					// Iconos que se pueden elegir en «Servicios»
					'layout-template', 'shopping-bag', 'store', 'app-window', 'code-xml', 'layout-dashboard', 'workflow', 'monitor-smartphone', 'life-buoy',
					'chevron-down',
				],
				// Iconos de redes sociales (Remix Icon)
				ri: ['instagram-line', 'linkedin-box-line', 'tiktok-line'],
			},
		}),
		tina(),
	],
	build: { inlineStylesheets: 'always' },
	// Sin la barra de herramientas de Astro en local, para ver la web tal cual.
	devToolbar: { enabled: false },
	vite: {
		plugins: [tailwindcss(), tinaAdminDevRedirect()],
		ssr: { noExternal: ['@tinacms/astro', '@tinacms/bridge'] },
		build: {
			rollupOptions: {
				onwarn(warning, warn) {
					if (warning.code === 'UNUSED_EXTERNAL_IMPORT' && warning.exporter === 'tinacms/dist/client') return;
					warn(warning);
				},
			},
		},
	},
});
