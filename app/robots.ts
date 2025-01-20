import { MetadataRoute } from 'next';
import { DOMAINS_CONFIG, getDomain } from '@/DomainsConfig';

export default async function robots(): Promise<MetadataRoute.Robots> {
	const domain = getDomain();
	const excludes: string[] = (DOMAINS_CONFIG as any)?.[domain as string]?.routesHidden ?? [];
	return {
		rules: {
			userAgent: '*',
			disallow: [...excludes],
		},
		sitemap: `https://${domain}/sitemap.xml`,
	};
}
