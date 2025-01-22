'use client';

import { RedirectToast } from '@/components/RedirectToast';

type RootTemplateProps = {
	children: React.ReactNode;
};

// FOR STANDALONE COMPONENTS THAT NEED RERENDER ON NAVIGATION

export default function RootTemplate({ children }: RootTemplateProps) {
	return (
		<>
			<>{children}</>
			<RedirectToast />
		</>
	);
}
