"use client";

import Link from "next/link";
import Image from "next/image";
import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const isHomepage = pathname === "/";
  const mainClass = isHomepage ? "" : "pt-[80px]";

  const navItems = [
    { href: "/", label: "Úvod" },
    { href: "/o-mne", label: "O mně" },
    { href: "/showreel", label: "Showreel" },
    { href: "/svatebni-nataceni", label: "Svatební natáčení" },
    { href: "/promovidea", label: "Promovidea" },
    { href: "/backstage", label: "BackStage" },
    { href: "/kontakt", label: "Kontakt" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/">
            <Image src="/images/logo.png" alt="Videojinak logo" width={160} height={40} priority />
          </Link>

          {/* Hamburger – zobrazit do velikosti LG */}
          <button onClick={toggleMenu} className="lg:hidden focus:outline-none text-gray-800 text-4xl" aria-label="Toggle menu">
            {menuOpen ? "✕" : "☰"}
          </button>

          {/* Desktop menu – až od LG */}
          <nav className="hidden lg:flex flex-wrap gap-x-4 gap-y-2 font-medium max-w-full">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded transition-colors ${
                  pathname === item.href ? "text-[#009ddc] font-semibold" : "text-gray-800 hover:text-blue-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile menu */}

        {menuOpen && (
          <nav className="lg:hidden fixed inset-0 bg-white z-40 flex flex-col">
            <div className="flex-grow flex flex-col justify-evenly items-center text-xl font-semibold text-center px-6 py-10">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`hover:text-blue-600 transition-colors ${pathname === item.href ? "text-[#009ddc] font-semibold" : "text-gray-800"}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main className={`${mainClass} flex-grow`}>{children}</main>
      <footer className="text-center text-sm py-6 bg-black text-white">
        © {new Date().getFullYear()} <span className="">Web vyrobil - </span>
        <a href="https://www.jansladky.eu" target="_blank" className="underline">
          Jan Sladký
        </a>
      </footer>
    </>
  );
}
