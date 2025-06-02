import './globals.css';
import { ReactNode } from 'react';
import ClientLayout from './ClientLayout';

export const metadata = {
  title: 'Videojinak.cz',
  description: 'Specializujeme se na promo, klipy, komerční i svatební videa. Nejraději děláme akčnější videa, a když do nich můžeme promítnout i srandu, pak jedině super.',
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