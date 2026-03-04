import type { Metadata, Viewport } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'BMW M4 Neon | Performance Reimagined',
    description: 'A complete, production-ready, single-page Scrollytelling automotive experience for the BMW M4 Neon Performance Edition.',
};

export const viewport: Viewport = {
    themeColor: '#000000',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={outfit.className}>{children}</body>
        </html>
    );
}
