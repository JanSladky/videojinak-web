import "./globals.css";
import { ReactNode } from "react";
import ClientLayout from "./ClientLayout";

export async function generateMetadata(): Promise<any> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.videojinak.cz/api";
  let settings: any = {};

  try {
    const res = await fetch(`${API_URL}/settings/public`, { next: { revalidate: 60 } });
    if (res.ok) {
      settings = await res.json();
    }
  } catch (e) {
    console.error("Failed to fetch global settings for metadata", e);
  }

  const siteName = settings.site_name || "Videojinak.cz – Firemní, svatební a reklamní videa";
  const separator = settings.title_separator || "|";
  const defaultDescription = settings.site_description || "Točíme firemní videa, svatební videoklipy, produktové reklamy i zábavné promo spoty. Kreativní zpracování, profesionální kvalita, cit pro detail a nápaditý střih – to je Videojinak.cz.";
  const favicon = settings.site_favicon ? (typeof settings.site_favicon === 'string' ? settings.site_favicon.replace("http://127.0.0.1:8000", "https://api.videojinak.cz") : settings.site_favicon.url?.replace("http://127.0.0.1:8000", "https://api.videojinak.cz")) : "/favicon.ico";

  // Keywords z administrace nebo fallback
  let siteKeywords = settings.site_keywords 
    ? (typeof settings.site_keywords === 'string' ? settings.site_keywords : settings.site_keywords.join(", "))
    : "firemní video, svatební video, reklamní spot, promo video, produktové video, videoprodukce, videotvorba, video pro firmy, svatba video, komerční video, videoklip, Videojinak.cz, profesionální kameraman, natáčení videí, zpracování videa";

  return {
    title: {
      default: siteName,
      template: `%s ${separator} ${siteName}`
    },
    description: defaultDescription,
    keywords: siteKeywords,
    metadataBase: new URL("https://www.videojinak.cz"),
    authors: [{ name: "Jan Sladký", url: "https://www.videojinak.cz" }],
    icons: {
      icon: favicon,
      shortcut: favicon,
      apple: favicon,
    },
    openGraph: {
      title: siteName,
      description: defaultDescription,
      url: "https://www.videojinak.cz",
      siteName: "Videojinak.cz",
      images: [
        {
          url: settings.default_og_image || "/uvodni_foto.png",
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
      type: "website",
    },
  };
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="cs">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
