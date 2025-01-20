import axios from 'axios';
import { getDomain } from '@/DomainsConfig';
import extDict from '../../prepare-assets';

export enum TFastAssetsTypes {
	'IMAGE' = 'image',
	'VIDEO' = 'video',
}

export const getFastAssetsUrl = async (src: string): Promise<string> => {
	const ext: string = ('.' + (src as string).split('.').pop()) as string;
	if (ext === extDict.extImageOut || ext === extDict.extVideoOut) {
		return src;
	}
	const extData = (
		extDict.extDict as {
			[ext: string]: {
				type: TFastAssetsTypes;
				regex: RegExp;
			};
		}
	)?.[ext];
	const extFast = extData?.type === TFastAssetsTypes.IMAGE ? extDict.extImageOut : extDict.extVideoOut;
	let srcFast = src;
	if (extData) {
		const fastUrl = `${(src as string).replace(extData.regex, extFast)}`;
		try {
			const protocol = process.env.ENV === 'development' ? 'http://' : 'https://';
			const absUrl = new URL(`${protocol}${getDomain()}${fastUrl}`).toString();
			const fastData = await axios.get(absUrl).catch((e) => {
				console.error(e);
				return src;
			});
			if (fastData) {
				srcFast = fastUrl;
			}
		} catch (e) {
			console.error(e);
		}
	}
	return srcFast;
};
