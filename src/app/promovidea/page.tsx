"use client";

import { useState } from "react";
import LazyIframe from "../../components/LazyIframe";

const videos = [
  "https://www.youtube.com/embed/1vM6My77UMM?si=Xifn-jFpnC65BhRV",
  "https://www.youtube.com/embed/A-nNhf1LBeo?si=ucqetaIzFUc91DyL",
  "https://www.youtube.com/embed/KuuhHBxU_0E?si=qNzqfne_Gq41gP2d",
  "https://www.youtube.com/embed/Fb20E35icHw?si=w5tiFqxEZoUdGlZ9",
  "https://www.youtube.com/embed/tVKlTeV5AeM?si=qyg1hERjPIXbfnzv",
  "https://www.youtube.com/embed/lAahyGGgMow?si=huzvIdGTUO4nyS_x",
  "https://www.youtube.com/embed/7NaCiYv_wlk?si=8IdIJREOWFSLJMZw",
  "https://www.youtube.com/embed/iB6bnjk2-qs?si=guVCiaQxZpZqYxQo",
  "https://www.youtube.com/embed/HHBu6vXF_9I?si=Al3VgHnMaZECFBV-",
  "https://www.youtube.com/embed/NLEW9-I7SaA?si=1z5pi1jTYnFJrJMH",
  "https://www.youtube.com/embed/QOJXg95vV2E?si=nQW35niGyjihgfmy",
  "https://www.youtube.com/embed/buoU5O-kJXM?si=9fZyWtHqPgc7XcXO",
  "https://www.youtube.com/embed/3pPZxyBNFFQ?si=BsTVpXYHRUTd8uPF",
  "https://www.youtube.com/embed/m2raTAqAFF8?si=-haiK6h6gvJFqWFz",
  "https://www.youtube.com/embed/XKlZbxNEVeo?si=wNxDppQELRrqt1G8",
  "https://www.youtube.com/embed/H-sjQn64YUQ?si=MRUd1ffFq0GwfTnv",
  "https://www.youtube.com/embed/3sFcOLF6vRE?si=-sMPATjnJfb2u-q2",
  "https://www.youtube.com/embed/jfCHWA-5nkY?si=UsnMuzflE6kf-KdF",
  "https://www.youtube.com/embed/DZvDsmETpGk?si=c3wmac7oYUBozz8v",
  "https://www.youtube.com/embed/CKZj1qKkLHU?si=gs-nKjrXTrYVLctg",
  "https://www.youtube.com/embed/5Bca1TUDjUU?si=xebGqZDMg-l-4pq_",
  "https://www.youtube.com/embed/COpVcz11VNM?si=DZhG15ZuR3BWmLnI",
  "https://www.youtube.com/embed/_3AE0sTN7pE?si=XOGVCxLqQB00-mTj",
  "https://www.youtube.com/embed/V7pXNPgyPxA?si=50oODzoZoK2No5RF",
  "https://www.youtube.com/embed/ZDRo2rvaIa4?si=p0uPl9-0TTftqjLw",
  "https://www.youtube.com/embed/tdrMick4sjU?si=i2Ybbjz_rVH2kVmW",
  "https://www.youtube.com/embed/6K8jSe8bGkg?si=XSEhC-cvmxyTtepB",
  "https://www.youtube.com/embed/URw9kFwg_-E?si=6T2RgjIA3x9OogQE",
  "https://www.youtube.com/embed/svmB2-mfFpU?si=faFq9YtmK41Nm2TL",
  "https://www.youtube.com/embed/mv9jo9aXQTk?si=S9dlTMivzSuOkpqd",
  "https://www.youtube.com/embed/hH2DDmiPkuc?si=5AcK1WV36EirVtbm",
  "https://www.youtube.com/embed/lzJVJFDgJ34?si=5CenckPJWOe9fyQG",
  "https://www.youtube.com/embed/LIFVk1a0EqM?si=dA5e9nHWG-X2OwcQ",
  "https://www.youtube.com/embed/EZqRJKb05cE?si=ja01I91VAQ8e9GQj",
  "https://www.youtube.com/embed/fzx0ZyoECcE?si=c6BDMUPa4O_9qNnt",
  "https://www.youtube.com/embed/jWJ3OBTokHA?si=Rdg0vZ1xMKFjXBQp",
  "https://www.youtube.com/embed/JK-CIEAdQGg?si=-2GoqNqGxxCgBpnZ",
  "https://www.youtube.com/embed/-4aw4ilLeTQ?si=98egwOB-XSCZ4rF2",
  "https://www.youtube.com/embed/llgyKVkorcQ?si=HvTqoAlrk38hTAPP",
  "https://www.youtube.com/embed/TbgD4hIZMDo?si=mBblu0KsbWmViU5d",
  "https://www.youtube.com/embed/MUbZeIVP5_8?si=7vVedHB1hRLGIovG",
  "https://www.youtube.com/embed/NjL5kyESDPg?si=qDQkqBDdfa5YDiHa",
  "https://www.youtube.com/embed/0tKEKjuZm-M?si=Ku_bKAYw4Rr2_eRz",
  "https://www.youtube.com/embed/E6kixAyu49Y?si=eVU_4RIsHtDhr6He",
  "https://www.youtube.com/embed/ngG6Hwg-M1c?si=2zebEJ0dsMJErzyv",
  "https://www.youtube.com/embed/os5ob0f4c6E?si=5B7gYo36utUXaWhP",
  "https://www.youtube.com/embed/HKfUmj889ms?si=Jon01qv13X8W-dYK",
  "https://www.youtube.com/embed/4hhF0LjA5aE?si=p7XgTUZm3voxnAgo",
  "https://www.youtube.com/embed/uP8uY6udGrs?si=YOkZJ4Z_2FeQOCof",
  "https://www.youtube.com/embed/tZjq9dXA8FA?si=kPCqONxwA3Ib-tHQ",
];

export default function PromoVideoPage() {
  const [visibleCount, setVisibleCount] = useState(6);
  const visibleVideos = videos.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, videos.length));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      <h1 className="text-2xl font-bold">Promo & Firemní videa</h1>

      <p className="text-lg">
        O Promo videjka je čím dál větší zájem. Ať už jde o prezentaci firmy, videoklip skupiny, krátký film, či prezentaci sportovního klubu. Cena se stanovuje
        na základě složitosti projektu.
      </p>

      <LazyIframe src="https://www.youtube.com/embed/xBzmewPnkBE?si=Khex44VlHOFx_b_s" title="Úvodní svatební klip" heightClassName="h-[400px]" />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Na co se specializujeme:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Produktová videa</li>
          <li>Reportáže z eventů a akcí</li>
          <li>Firemní medailonky</li>
          <li>Reklamní klipy pro sociální sítě</li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Ukázky promo videí</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {visibleVideos.map((src, index) => (
            <LazyIframe key={index} src={src} title={`Promo video ${index + 1}`} heightClassName="aspect-video" />
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
