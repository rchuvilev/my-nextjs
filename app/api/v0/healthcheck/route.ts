import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { DICT_RESPONSE_CODES } from '@/dicts/dictResponseCodes';

export async function POST(req: Request): Promise<Response> {
	const body = await req.text();
	const headerz = await headers();
	const header = headerz.get('test-header');
	const access: boolean = !!header;
	const errorCode = 500;
	const errorMessage = DICT_RESPONSE_CODES[errorCode];

	if (!access) {
		return new NextResponse(errorMessage, {
			status: errorCode,
		});
	}

	try {
		return new NextResponse(null, { status: 200 });
	} catch {
		return new NextResponse(errorMessage, {
			status: errorCode,
		});
	}
}
