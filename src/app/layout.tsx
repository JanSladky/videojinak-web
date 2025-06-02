import './globals.css';
import { ReactNode } from 'react';
import ClientLayout from './ClientLayout';

export const metadata = {
  title: 'Videojinak.cz',
  description: 'Promo, klipy, svatby, video jinak.',
   icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="cs">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}