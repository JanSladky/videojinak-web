"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";
import Image from 'next/image'
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const isHome = pathname === '/'
  const mainClass = isHome ? "" : "mt-20"

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Videojinak logo"
              width={160} // můžeš upravit podle velikosti loga
              height={40}
              priority
            />
          </Link>

          {/* Hamburger */}
          <button onClick={toggleMenu} className="md:hidden focus:outline-none text-gray-800" aria-label="Toggle menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop menu */}
          <nav className="hidden md:flex space-x-4 font-medium">
            <Link href="/">Úvod</Link>
            <Link href="/o-mne">O mně</Link>
            <Link href="/showreel">Showreel</Link>
            <Link href="/svatebni-nataceni">Svatební natáčení</Link>
            <Link href="/promovidea">Promovidea</Link>
            <Link href="/backstage">BackStage</Link>
            <Link href="/kontakt">Kontakt</Link>
          </nav>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="md:hidden px-4 pb-4 pt-2 space-y-2 font-medium bg-white border-t border-gray-200 shadow">
            <Link href="/" onClick={closeMenu} className="block">
              Úvod
            </Link>
            <Link href="/o-mne" onClick={closeMenu} className="block">
              O mně
            </Link>
            <Link href="/showreel" onClick={closeMenu} className="block">
              Showreel
            </Link>
            <Link href="/svatebni-nataceni" onClick={closeMenu} className="block">
              Svatební natáčení
            </Link>
            <Link href="/promovidea" onClick={closeMenu} className="block">
              Promovidea
            </Link>
            <Link href="/backstage" onClick={closeMenu} className="block">
              BackStage
            </Link>
            <Link href="/kontakt" onClick={closeMenu} className="block">
              Kontakt
            </Link>
          </nav>
        )}
      </header>

      <main className={mainClass}>{children}</main>
    </>
  );
}
