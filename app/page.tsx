'use server';
import { Metadata } from 'next';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';
import { FastImage } from '@/components/FastImage';
import { FastVideo } from '@/components/FastVideo';
import { Spinner } from '@/components/Spinner';
import { DOMAINS_CONFIG, getDomain } from '@/DomainsConfig';
import { searchParamsCache } from '@/utils/server.search-params';

type HomePageProps = {
	searchParams: Promise<SearchParams>;
};

export const generateMetadata = async (): Promise<Metadata> => {
	const domain = getDomain();
	const metadata: Metadata =
		(DOMAINS_CONFIG as any)?.[domain as string]?.metadata ??
		({
			title: 'My next-app',
			description: 'My Road to Next application ...',
		} as Metadata);
	return metadata;
};

const HomePage = async ({ searchParams }: HomePageProps) => {
	const searchParamsObj = searchParamsCache.parse(await searchParams);
	return (
		<Suspense fallback={<Spinner />}>
			<h1>HomePage</h1>
			<FastImage src={'/__test__/image.png'} alt={'test image'} width={500} height={240} />
			<FastVideo
				src={'/__test__/video.mp4'}
				muted={true}
				autoPlay={true}
				loop={true}
				controls={false}
				playsInline={true}
			/>
		</Suspense>
	);
};

export default HomePage;
