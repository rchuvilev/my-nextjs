'use server';

import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Suspense } from 'react';
import { Spinner } from '@/components/Spinner';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { Footer } from '@/components/view/Footer';
import { Header } from '@/components/view/Header';

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html suppressHydrationWarning={true} lang='en'>
			<head>
				<link rel='stylesheet' href='https://unpkg.com/mvp.css' />
			</head>
			<body>
				<p>{process.env.ENV}</p>
				<NuqsAdapter>
					<ThemeProvider>
						<Suspense fallback={<Spinner />}>
							<Header />
							<main>{children}</main>
							<Footer />
							<Toaster expand />
						</Suspense>
					</ThemeProvider>
				</NuqsAdapter>
				{process.env.ENV === 'development' && <SpeedInsights />}
			</body>
		</html>
	);
}
