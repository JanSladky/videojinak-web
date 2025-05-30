import './globals.css';
import { ReactNode } from 'react';
import ClientLayout from './ClientLayout';

export const metadata = {
  title: 'Videojinak.cz',
  description: 'Promo, klipy, svatby, video jinak.',
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