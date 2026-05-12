import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Ignorovat statické soubory, admin, api a auth cesty
  if (
    pathname.startsWith('/_next') || 
    pathname.includes('/api/') || 
    pathname.startsWith('/admin') ||
    pathname.startsWith('/reset-password') ||
    pathname.startsWith('/login') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  let API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.videojinak.cz/api";
  // Ošetření koncového lomítka v API_URL
  if (API_URL.endsWith('/')) API_URL = API_URL.slice(0, -1);

  try {
    // Načtení všech přesměrování s krátkým timeoutem, aby se web nezasekl
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 vteřiny max

    const res = await fetch(`${API_URL}/redirects/all`, {
        cache: 'no-store',
        signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
        const redirectsList = await res.json();
        const redirects = Array.isArray(redirectsList) ? redirectsList : [];
        
        // Najít shodu (zkusit s i bez koncového lomítka)
        // Porovnáváme čistou cestu bez ohledu na koncové lomítko na obou stranách
        const cleanPath = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
        
        const match = redirects.find((r: any) => {
            if (!r.source_url) return false;
            const cleanSource = r.source_url.endsWith('/') && r.source_url !== '/' ? r.source_url.slice(0, -1) : r.source_url;
            return cleanSource === cleanPath;
        });

        if (match && match.target_url) {
            const status = Number(match.status_code) || 301;
            // Absolutní URL pro přesměrování
            const target = match.target_url.startsWith('http') 
                ? match.target_url 
                : new URL(match.target_url, request.url).toString();
                
            return NextResponse.redirect(target, status);
        }
    }
  } catch (error) {
    console.error("Middleware error:", error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
