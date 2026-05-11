"use client";

import { useState } from "react";
import LazyIframe from "../../components/LazyIframe";

const videos = [
  "https://www.youtube.com/embed/a5eVe5PYeTM",
  "https://www.youtube.com/embed/LBZnuWikmJk",
  "https://www.youtube.com/embed/2Sf3N0xXqPI",
  "https://www.youtube.com/embed/k5cL2aMLSM8",
  "https://www.youtube.com/embed/784aQRMK4hg",
  "https://www.youtube.com/embed/qijub8l_kDs",
  "https://www.youtube.com/embed/mNkM45Zhd2s",
  "https://www.youtube.com/embed/Hc0_SWrs9nc",
  "https://www.youtube.com/embed/s8NRYr2fmJE",
  "https://www.youtube.com/embed/mxiRUVCIMO8",
  "https://www.youtube.com/embed/HHETngw8tz4"
];

export default function AiTvorbaPage() {
  const [visibleCount, setVisibleCount] = useState(6);
  const visibleVideos = videos.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, videos.length));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      <h1 className="text-2xl font-bold">Tohle nás opravdu baví</h1>

      <p className="text-lg">
        AI tvorba nás posouvá dál a my si vyloženě užíváme, co se s tím dá vše dělat. V kombinaci s hranými záběry jsou možnosti opravdu nekonečné.
      </p>

      <div>
        <div className="grid md:grid-cols-3 gap-6">
          {visibleVideos.map((src, index) => (
            <LazyIframe key={index} src={src} title={`AI video ${index + 1}`} heightClassName="aspect-video" />
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
