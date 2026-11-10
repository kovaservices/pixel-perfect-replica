/**
 * Ayudas para los datos estructurados (JSON-LD) de cada página. El nodo de
 * la empresa (#kova) y el de la web (#web) se añaden siempre en Base.astro.
 */
type QA = { question?: string | null; answer?: string | null };

const kova = (site: URL) => ({ '@id': new URL('/#kova', site).href });

export function faqPage(items: QA[], url: URL) {
	const qs = items.filter((q) => q.question && q.answer);
	if (!qs.length) return [];
	return [{
		'@type': 'FAQPage',
		'@id': `${url.href}#faq`,
		mainEntity: qs.map((q) => ({ '@type': 'Question', name: q.question, acceptedAnswer: { '@type': 'Answer', text: q.answer } })),
	}];
}

export function breadcrumbs(site: URL, items: { name: string; path: string }[]) {
	return {
		'@type': 'BreadcrumbList',
		itemListElement: [{ name: 'Inicio', path: '/' }, ...items].map((it, i) => ({
			'@type': 'ListItem', position: i + 1, name: it.name, item: new URL(it.path, site).href,
		})),
	};
}

export function service(site: URL, url: URL, name: string, description: string) {
	return {
		'@type': 'Service',
		'@id': `${url.href}#servicio`,
		name,
		serviceType: name,
		description,
		url: url.href,
		provider: kova(site),
		areaServed: { '@type': 'Country', name: 'España' },
	};
}

/** Las modalidades con precio publicado, como catálogo de ofertas. */
export function offers(site: URL, plans: { name?: string | null; description?: string | null; price?: string | null }[]) {
	const items = plans.filter((p) => p.name && /^\d+$/.test(p.price ?? ''));
	if (!items.length) return [];
	return [{
		'@type': 'OfferCatalog',
		'@id': new URL('/#precios', site).href,
		name: 'Precios de páginas web',
		itemListElement: items.map((p) => ({
			'@type': 'Offer',
			name: p.name,
			description: p.description ?? undefined,
			price: p.price,
			priceCurrency: 'EUR',
			seller: kova(site),
		})),
	}];
}
