import { Metadata } from 'next';

export type TDomainsConfig = {
	[domain: string]: {
		routes: string[]; // all handled domain routes
		routesHidden: string[]; // hidden from sitemap, robots, etc.
		metadata: Metadata; // domain metadata
	};
};

export const DOMAINS_CONFIG = {
	'indiegrams.com': {
		allRoutes: [],
		routesHidden: [],
		metadata: {},
	},
};

export const getDomain = (): string => {
	return process.env.ENV === 'development' ? 'localhost:9000' : 'indiegrams.com';
};
