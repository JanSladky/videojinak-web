"use client";

import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const references = [
  {
    id: 1,
    text:
      "Naprosto bezkonkurenční! Měli jsme na svatbě víc jak půlku hostů z Irska a ti dodnes mluví o nejlepší svatbě a to především právě diky klukům z Videojinak!",
    sign: "Nelli Přibáňová (svatba)",
  },
  {
    id: 2,
    text: "Je na 100% jasný, že s takovým profíkem budeme letos znova točit a s nesmírnou chutí!!! Lukáš je super profesionál na nápady a kameru.",
    sign: "Ondřej Demut (promo automobilových závodů)",
  },
  {
    id: 3,
    text: "Termín svatby jsme vybírali dle možnosti natáčení, protože svatbu bez videa od nich nechcete :) Doporučuju všem!",
    sign: "Nella Šolcová (svatba)",
  },
  {
    id: 4,
    text: "Šimi nám točil v létě svatbičku, a taky točil svatbičku ségře, a kámošce, a ... a to vlastně asi vypovídá o všem  Dáváme hodnocení 1853 ze 100!",
    sign: "Áňa Vaníčková (svatba)",
  },
  {
    id: 5,
    text: "Kluci nám natáčeli firemní promo video a výsledek, rychlost a osobní přístup byl na top úrovni. Do budoucna cokoliv už jen s VIDEOJINAK.",
    sign: "Lukáš Málek (promo na restauraci)",
  },
];

const companies = [
  "Rimmel", "Škoda", "Nescafé", "Radio Frekvence 1", "Makro", "Fany Gastro",
  "Bidvest", "COTY", "Timelab", "Sally Hansen", "Astor", "Mary Key", "Narex", "Oktagon",
  "Gestamp", "Cushman & Wakefield", "Remax G8", "Tessuto", "Xandor", "BOS", "Bohemia Hop",
  "Nemovito", "Extreme Hobby", "Ruda z Ostravy", "Česká Federace Aikido", "Stavebniny VHV",
  "Eurosupport", "Černý Žaludi", "Wheelabrator", "Biopreparáty", "Reinders MMA", "Cavalier", "Město Žatec",
];

export default function HomePage() {
  const desktopRef = useRef<HTMLVideoElement>(null);
  const mobileRef = useRef<HTMLVideoElement>(null);
  const [currentRef, setCurrentRef] = useState(0);

  useEffect(() => {
    desktopRef.current?.play().catch(() => {});
    mobileRef.current?.play().catch(() => {});
    const interval = setInterval(() => {
      setCurrentRef((prev) => (prev + 1) % references.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const prev = () => setCurrentRef((prev) => (prev - 1 + references.length) % references.length);
  const next = () => setCurrentRef((prev) => (prev + 1) % references.length);

  return (
    <>
      {/* VIDEO SEKCE */}
      <div className="relative min-h-screen overflow-hidden">
        <video
          ref={desktopRef}
          className="hidden md:block absolute top-0 left-0 w-full h-full object-cover"
          src="/video/title-video-desktop.mp4"
          muted
          loop
          playsInline
        />
        <video
          ref={mobileRef}
          className="block md:hidden absolute top-0 left-0 w-full h-full object-cover"
          src="/video/title-video-mobil.mp4"
          muted
          loop
          playsInline
        />
        <div className="absolute bottom-20 right-0 left-0 flex items-center justify-center text-white text-center">
          <div className="bg-white/80 text-black p-6 rounded-lg max-w-xl">
            <p className="mb-4 text-lg">
              Specializujeme se na promo, klipy, komerční i svatební videa. Nejraději děláme akčnější videa, a když do nich můžeme promítnout i srandu, pak jedině super 😄
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <a href="/svatebni-nataceni" className="btn">SVATBY</a>
              <a href="/promovidea" className="btn">PROMO</a>
              <a href="#recenze" className="btn">RECENZE</a>
            </div>
          </div>
        </div>
      </div>

      {/* RECENZE */}
      <section id="recenze" className="pt-28 pb-20 px-6 bg-gray-50 text-center relative">
        <h2 className="text-3xl font-bold mb-6">Recenze</h2>
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6 relative">
          <p className="text-lg italic mb-4">{`"${references[currentRef].text}"`}</p>
          <p className="font-semibold text-gray-600">{references[currentRef].sign}</p>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 text-xl text-gray-600 hover:text-black"
            aria-label="Předchozí recenze"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={next}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-xl text-gray-600 hover:text-black"
            aria-label="Další recenze"
          >
            <FaChevronRight />
          </button>
        </div>

        <div className="mt-6">
          <a href="#spoluprace" className="btn">Spolupráce s</a>
        </div>
      </section>

      {/* SPOLUPRÁCE */}
      <section id="spoluprace" className="py-16 px-6 bg-white scroll-mt-28">
        <h2 className="text-3xl font-bold mb-8 text-center">Spolupráce s</h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {companies.map((name, idx) => (
            <div key={idx} className="px-4 py-2 bg-gray-100 rounded shadow text-sm font-medium hover:bg-gray-200 transition">
              {name}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}