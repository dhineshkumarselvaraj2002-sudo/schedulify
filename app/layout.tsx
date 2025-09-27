import type { ReactNode } from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import QueryProvider from "@/context/query-provider";
import { NuqsAdapter } from 'nuqs/adapters/next/app';

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<QueryProvider>
					<ThemeProvider>
						<NuqsAdapter>
							{children}
						</NuqsAdapter>
					</ThemeProvider>
				</QueryProvider>
			</body>
		</html>
	);
}
