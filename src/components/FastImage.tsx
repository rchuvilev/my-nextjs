'use server';
import Image, { ImageProps } from 'next/image';
import { getFastAssetsUrl } from '@/utils/server.getFastAssetsUrl';

export type TFastImageProps = {} & ImageProps;

export const FastImage = async (props: TFastImageProps) => {
	const src: string = await getFastAssetsUrl(props.src as string);
	return <Image {...props} src={src} />;
};
