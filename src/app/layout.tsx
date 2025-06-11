import "./globals.css";
import { ReactNode } from "react";
import ClientLayout from "./ClientLayout";

export const metadata = {
  title: "Videojinak.cz – Firemní, svatební a reklamní videa",
  description:
    "Točíme firemní videa, svatební videoklipy, produktové reklamy i zábavné promo spoty. Kreativní zpracování, profesionální kvalita, cit pro detail a nápaditý střih – to je Videojinak.cz.",
  keywords: [
    "firemní video",
    "Profesionální svatební video",
    "Profesionální svatební kameraman",
    "Firemní video",
    "svatební video",
    "reklamní spot",
    "promo video",
    "produktové video",
    "videoprodukce",
    "videotvorba",
    "video pro firmy",
    "svatba video",
    "komerční video",
    "videoklip",
    "Videojinak.cz",
  ],
  authors: [{ name: "Jan Sladký", url: "https://www.videojinak.cz" }],
  creator: "Videojinak.cz",
  metadataBase: new URL("https://www.videojinak.cz"),
  openGraph: {
    title: "Videojinak.cz – Tvoříme videa s nápadem",
    description: "Kreativní videoprodukce: svatební klipy, firemní prezentace, reklamní a produktová videa. Natáčíme originálně a s chutí!",
    url: "https://www.videojinak.cz",
    siteName: "Videojinak.cz",
    images: [
      {
        url: "/uvodni_foto.png", // přidej si vlastní obrázek do /public/images/
        width: 1200,
        height: 630,
        alt: "Videojinak.cz – ukázka tvorby",
      },
    ],
    type: "website",
  },
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
