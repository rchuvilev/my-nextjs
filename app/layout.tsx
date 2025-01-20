import './globals.css';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { Footer } from '@/components/view/Footer';
import { Header } from '@/components/view/Header';

// FOR PERSISTENT, NOT RE-RENDERED LAYOUT COMPONENTS

export default function RootLayout({
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
				<NuqsAdapter>
					<ThemeProvider>
						<Header />
						<main>{children}</main>
						<Footer />
						<Toaster expand />
					</ThemeProvider>
				</NuqsAdapter>
			</body>
		</html>
	);
}
