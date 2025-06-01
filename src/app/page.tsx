"use client";

import { useEffect, useRef, useState } from "react";

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
    text: "Šimi nám točil v létě svatbičku, a taky točil svatbičku ségře, a kámošce, a ... a to vlastně asi vypovídá o všem. Dáváme hodnocení 1853 ze 100!",
    sign: "Áňa Vaníčková (svatba)",
  },
  {
    id: 5,
    text: "Kluci nám natáčeli firemní promo video a výsledek, rychlost a osobní přístup byl na top úrovni. Do budoucna cokoliv už jen s VIDEOJINAK.",
    sign: "Lukáš Málek (promo na restauraci)",
  },
];

const companies = [
  "Rimmel",
  "Škoda",
  "Nescafé",
  "Radio Frekvence 1",
  "Makro",
  "Fany Gastro",
  "Bidvest",
  "COTY",
  "Timelab",
  "Sally Hansen",
  "Astor",
  "Mary Key",
  "Narex",
  "Oktagon",
  "Gestamp",
  "Cushman & Wakefield",
  "Remax G8",
  "Tessuto",
  "Xandor",
  "BOS",
  "Bohemia Hop",
  "Nemovito",
  "Extreme Hobby",
  "Ruda z Ostravy",
  "Česká Federace Aikido",
  "Stavebniny VHV",
  "Eurosupport",
  "Černý Žaludi",
  "Wheelabrator",
  "Biopreparáty",
  "Reinders MMA",
  "Cavalier",
  "Město Žatec",
];

export default function HomePage() {
  const desktopRef = useRef<HTMLVideoElement>(null);
  const mobileRef = useRef<HTMLVideoElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [autoSlide, setAutoSlide] = useState(true);

  const stopAutoSlide = () => setAutoSlide(false);
  const resumeAutoSlide = () => setTimeout(() => setAutoSlide(true), 8000);

  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setViewportHeight();
    window.addEventListener("resize", setViewportHeight);
    return () => window.removeEventListener("resize", setViewportHeight);
  }, []);

  useEffect(() => {
    desktopRef.current?.play().catch(() => {});
    mobileRef.current?.play().catch(() => {});
  }, []);

  useEffect(() => {
    if (!sliderRef.current || !autoSlide) return;
    const slider = sliderRef.current;
    const scrollAmount = slider.clientWidth;
    const interval = setInterval(() => {
      slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
      if (slider.scrollLeft + scrollAmount >= slider.scrollWidth) {
        setTimeout(() => {
          slider.scrollTo({ left: 0, behavior: "smooth" });
        }, 1000);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [autoSlide]);

  // Drag scroll pro desktop i mobil
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const start = (e: MouseEvent | TouchEvent) => {
      isDown = true;
      startX = (e instanceof MouseEvent ? e.pageX : e.touches[0].pageX) - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      slider.classList.add("cursor-grabbing");
    };

    const end = () => {
      isDown = false;
      slider.classList.remove("cursor-grabbing");
    };

    const move = (e: MouseEvent | TouchEvent) => {
      if (!isDown) return;
      const x = (e instanceof MouseEvent ? e.pageX : e.touches[0].pageX) - slider.offsetLeft;
      const walk = (x - startX) * 1.2;
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener("mousedown", start);
    slider.addEventListener("touchstart", start);
    slider.addEventListener("mouseup", end);
    slider.addEventListener("touchend", end);
    slider.addEventListener("mousemove", move);
    slider.addEventListener("touchmove", move);
    slider.addEventListener("mouseleave", end);

    return () => {
      slider.removeEventListener("mousedown", start);
      slider.removeEventListener("touchstart", start);
      slider.removeEventListener("mouseup", end);
      slider.removeEventListener("touchend", end);
      slider.removeEventListener("mousemove", move);
      slider.removeEventListener("touchmove", move);
      slider.removeEventListener("mouseleave", end);
    };
  }, []);

  return (
    <>
      {/* VIDEO SEKCE */}
      <div className="relative" style={{ minHeight: "calc(var(--vh, 1vh) * 100)" }}>
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
        <div className="absolute inset-0 flex justify-center items-end sm:items-center text-white text-center px-4 pb-[calc(env(safe-area-inset-bottom)+20px)] sm:pb-0">
          <div className="bg-white/80 text-black px-4 py-4 sm:p-6 rounded-lg max-w-xs sm:max-w-xl w-full sm:w-auto">
            <p className="mb-4 text-sm sm:text-base leading-snug">
              Specializujeme se na promo, klipy, komerční i svatební videa. Nejraději děláme akčnější videa, a když do nich můžeme promítnout i srandu, pak
              jedině super 😄
            </p>
            <div className="flex gap-2 sm:gap-3 justify-center flex-wrap">
              <a href="/svatebni-nataceni" className="px-3 py-1.5 bg-black text-white rounded hover:bg-gray-800 transition text-sm sm:text-base">
                SVATBY
              </a>
              <a href="/promovidea" className="px-3 py-1.5 bg-black text-white rounded hover:bg-gray-800 transition text-sm sm:text-base">
                PROMO
              </a>
              <a href="#recenze" className="px-3 py-1.5 bg-black text-white rounded hover:bg-gray-800 transition text-sm sm:text-base">
                RECENZE
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* RECENZE */}
      <section id="recenze" className="pt-28 pb-20 px-6 bg-gray-50 text-center relative">
        <h2 className="text-3xl font-bold mb-6">Recenze</h2>
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto px-1 scrollbar-hide cursor-grab snap-x snap-mandatory scroll-smooth"
          style={{ WebkitOverflowScrolling: "touch" }}
          onMouseEnter={stopAutoSlide}
          onMouseLeave={resumeAutoSlide}
        >
          {references.map((ref) => (
            <div
              key={ref.id}
              className="snap-center min-w-[90%] sm:min-w-[500px] max-w-full bg-white rounded-lg shadow flex-shrink-0 flex justify-center items-center text-center h-[350px] px-4"
            >
              <div className="flex flex-col justify-center items-center w-full max-w-xl overflow-hidden">
                <p className="text-base sm:text-lg italic leading-relaxed mb-4 break-words">{`"${ref.text}"`}</p>
                <p className="font-semibold text-gray-600 text-sm sm:text-base">{ref.sign}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <a href="#spoluprace" className="btn">
            Spolupráce s
          </a>
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
