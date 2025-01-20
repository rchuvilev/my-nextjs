import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const domain = '';
	let pages: string[] = [];
	switch (domain) {
		default:
			pages = [];
			break;
	}
	const priority = 1;
	const changeFrequency = 'weekly';
	const formattedLastMod = new Date().toISOString().split('T')[0];

	return pages.map((pageUrl: string) => ({
		url: pageUrl,
		priority: priority,
		lastModified: formattedLastMod,
		changeFrequency: changeFrequency,
	}));
}
