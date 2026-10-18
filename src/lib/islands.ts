/**
 * Zonas editables de la web. Cuando el cliente cambia algo en el editor,
 * Tina vuelve a pintar solo la zona afectada usando estas entradas.
 */
import type { IslandRegistry } from '@tinacms/astro/experimental';
import type { QueryResult } from '@tinacms/astro/data';
import type { HomeQuery, LegalQuery, SettingsQuery } from '../../tina/__generated__/types';
import HomeBody from '../components/HomeBody.astro';
import LegalBody from '../components/LegalBody.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import NotFoundBody from '../components/NotFoundBody.astro';
import { getHome, getLegal, getSettings, getSettingsPrimary } from './data';

const settingsProps = (data: unknown) => ({
	settings: (data as QueryResult<SettingsQuery>).data?.settings,
});

export const islands: IslandRegistry = {
	home: {
		fetch: () => getHome(),
		component: HomeBody,
		wrapper: { tag: 'main' },
		propsFromData: (data) => ({ data: (data as QueryResult<HomeQuery>).data?.home }),
	},
	legal: {
		fetch: (_request, params) => getLegal(params.get('slug') ?? 'aviso-legal'),
		component: LegalBody,
		wrapper: { tag: 'main' },
		propsFromData: (data) => ({ data: (data as QueryResult<LegalQuery>).data?.legal }),
	},
	notFound: {
		fetch: () => getSettingsPrimary(),
		component: NotFoundBody,
		wrapper: { tag: 'main' },
		propsFromData: settingsProps,
	},
	header: {
		fetch: () => getSettings(),
		component: Header,
		wrapper: { tag: 'div' },
		propsFromData: settingsProps,
	},
	footer: {
		fetch: () => getSettings(),
		component: Footer,
		wrapper: { tag: 'div' },
		propsFromData: settingsProps,
	},
};
