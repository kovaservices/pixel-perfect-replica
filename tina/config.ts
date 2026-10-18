import { defineConfig } from 'tinacms';
import { HomeCollection } from './collections/home';
import { SettingsCollection } from './collections/settings';
import { LegalCollection } from './collections/legal';

// Rama de Git donde Tina guarda los cambios al publicar (Cloudflare la indica sola).
const branch =
	process.env.GITHUB_BRANCH ||
	process.env.CF_PAGES_BRANCH ||
	process.env.WORKERS_CI_BRANCH ||
	'main';

export default defineConfig({
	branch,
	// Solo hacen falta al publicar con Tina Cloud (ver .env.example).
	clientId: process.env.PUBLIC_TINA_CLIENT_ID,
	token: process.env.TINA_TOKEN,

	build: {
		outputFolder: 'admin',
		publicFolder: 'public',
	},
	media: {
		tina: {
			mediaRoot: 'uploads',
			publicFolder: 'public',
		},
	},
	schema: {
		collections: [HomeCollection, SettingsCollection, LegalCollection],
	},
});
