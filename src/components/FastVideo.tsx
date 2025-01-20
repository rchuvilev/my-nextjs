import { getFastAssetsUrl } from '@/utils/server.getFastAssetsUrl';

export type TVideoProps = {
	controls?: boolean;
	autoPlay?: boolean;
	loop?: boolean;
	muted?: boolean;
	poster?: string;
	width?: number;
	height?: number;
	playsInline?: boolean;
};

export type TFastVideoProps = {
	src: string;
} & TVideoProps;

export const FastVideo = async (props: TFastVideoProps) => {
	const src: string = await getFastAssetsUrl(props.src as string);
	const type: string = ('video/' + (src as string).split('.').pop()) as string;
	const propsVideo: TVideoProps = { ...props };
	if (propsVideo.hasOwnProperty('src')) {
		// @ts-ignore
		delete (propsVideo as TFastVideoProps).src;
	}

	return (
		<video {...propsVideo}>
			<source src={src} type={type} />
		</video>
	);
};
