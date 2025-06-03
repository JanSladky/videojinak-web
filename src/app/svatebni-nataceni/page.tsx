"use client";

import { useState } from "react";
import LazyIframe from "../../components/LazyIframe";

const videos = [
  "https://www.youtube.com/embed/PSCz_A-dpa8?si=GGOuOphEnjmOYGdZ",
  "https://www.youtube.com/embed/OZi45NhJc_8?si=okka_ZDRhzfqyFAA",
  "https://www.youtube.com/embed/uLNdEZpaFXY?si=77eNU5BdCUM1_3Sc",
  "https://www.youtube.com/embed/Mg29bfkROdQ?si=5w6pICbCZPj10Vqy",
  "https://www.youtube.com/embed/ovqWelH_j-w?si=JoKHKK5_RN_LJGzM",
  "https://www.youtube.com/embed/LPKPueX_GEc?si=g-XbiEiHClhslNOP",
  "https://www.youtube.com/embed/k9qG2IYv7ds?si=xalhWyMtmjwa6cOl",
  "https://player.vimeo.com/video/239808483?h=6cc9b901b0",
  "https://www.youtube.com/embed/CaKMveQYslM?si=LI6Pf8okHiTbmEAk",
  "https://www.youtube.com/embed/_y-V2tfMLno?si=uBheOnlqKd_FNrsQ",
  "https://www.youtube.com/embed/BAN-yBBd6gk?si=9D6xSHReFy8aW3q_",
  "https://player.vimeo.com/video/165786558?h=9ee524c868",
  "https://www.youtube.com/embed/tquC3OkyuKg?si=UOGxvOxqPDFMEYI8",
  "https://www.youtube.com/embed/YIbs8-UcR9s?si=dTsbdqgvmmywH3my",
  "https://www.youtube.com/embed/aPJ4SfWVhlA?si=2gBT61lp_Em2ceFK",
  "https://www.youtube.com/embed/SZvxOilLdao?si=k0nmO0LwxZJGSlzp",
  "https://www.youtube.com/embed/Qu525UTXd0M?si=4snNLNqTd-YEcg-J",
  "https://www.youtube.com/embed/hDws43hsmzg?si=MYHk9bo9k4QXb-ak",
  "https://www.youtube.com/embed/es-XRY--Pzs?si=YEvstR6fRmPouyD7",
  "https://www.youtube.com/embed/2JQNmQAtEFU?si=Jbiq9dHNut5vavmA",
  "https://www.youtube.com/embed/att9Jmbkn6E?si=ZiAUO8QKDLi1EfqD",
  "https://www.youtube.com/embed/L8Fe0bgkdZQ?si=i7ubh4iUIuHR-Ncf",
  "https://www.youtube.com/embed/D8nbB1t-wMk?si=sNCTL-znD4e9YAUo",
  "https://www.youtube.com/embed/mO_ujeCW3iU?si=0OqT37HJFSQdWVax",
  "https://www.youtube.com/embed/xrpciZJByxc?si=RuwhVLeASFuIa9gk",
  "https://www.youtube.com/embed/LmOZt5G1M0s?si=GBvaXPnLuaBq_qXp",
  "https://www.youtube.com/embed/-D7CYTVFbEE?si=RWGN8lVcLmR-gQIB",
  "https://www.youtube.com/embed/XnuwwUWS7dI?si=iw9OPNr1pjVfgwD3",
  "https://www.youtube.com/embed/CSWxcRjIknI?si=7dyy-xCYNuC59CnO",
  "https://www.youtube.com/embed/4UqShsE8yog?si=YOvFnrDSwTkRgx25",
  "https://www.youtube.com/embed/9_vBjrVkgcs?si=8nLYtOQlaP30u23A",
  "https://www.youtube.com/embed/CNCKnt7ejFM?si=ehiiEfIRfXCUfU3U",
  "https://www.youtube.com/embed/ctPSB05MZ1c?si=a-WiKBh22bC9TDkr",
];

export default function SvatebniNataceniPage() {
  const [visibleCount, setVisibleCount] = useState(6);
  const visibleVideos = videos.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, videos.length));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      <p className="text-lg">
        Jestliže hledáte někoho, kdo vám jen nějak natočí svatbu, tak to tady nebudete správně. 😄 Na svatebních videích si fakt dáváme záležet… Chceme, abyste
        se po shlédnutí regulérně smáli, aby vás video pobavilo, přesto abyste si na svatbu díky našemu videjku zavzpomínali jako na parádní párty a ještě vám k
        tomu ukápla i nějaká ta slza.
      </p>

      <LazyIframe
        src="https://www.youtube.com/embed/IPnMLNMQhG0?si=2lySl7nYpegNiIPI"
        title="Úvodní svatební klip"
        heightClassName="h-[400px]"
      />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Co se týče variant natáčení, tak nabízíme 2:</h2>
        <div>
          <h3 className="font-bold mb-1">Verze klip</h3>
          <p>
            Natáčet jezdíme 2 kameramani – já si hlavně natáčím naše „videojinak“ záběry do videoklipu a kolega zachycuje průběh celého dne, aby nic důležitého
            neuniklo. Výsledkem je svatební klip + bonus „V JEDNÉ MINUTĚ“.
          </p>
        </div>
        <div>
          <h3 className="font-bold mb-1">Verze klip + záznam</h3>
          <p>
            Kromě videoklipu novomanželé dostanou i profi sestříhaný záznam celého dne (25–30 minut). Používáme SONY, DJI, BLACKMAGIC, GOPRO. Zaručujeme zábavu.
            😁
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Ukázky z natáčení svateb</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {visibleVideos.map((src, index) => (
            <LazyIframe key={index} src={src} title={`Svatební video ${index + 1}`} heightClassName="h-64" />
          ))}
        </div>

        {visibleCount < videos.length && (
          <div className="text-center mt-6">
            <button className="btn" onClick={handleLoadMore}>
              Načíst další videa
            </button>
          </div>
        )}
      </div>
    </div>
  );
}