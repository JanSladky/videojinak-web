"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

import { LazyImage } from "../../components/LazyImage";

const imageCount = 60;
const images = Array.from({ length: imageCount }, (_, i) => {
  const num = i + 1;
  return {
    src: `/images/backstage/${num}.jpg`,
    title: `Zákulisí ${num}`,
    alt: `Backstage foto ${num}`,
  };
});

export default function BackstagePage() {
  const [index, setIndex] = useState(-1);

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Backstage</h1>
      <p className="mb-6 text-lg">Pohled do zákulisí natáčení – fotografie z produkcí a zajímavé momenty.</p>

      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-7 gap-4">
        {images.map((img, i) => (
          <button key={i} onClick={() => setIndex(i)} className="relative aspect-[4/3] overflow-hidden rounded shadow hover:scale-105 transition-transform">
            <LazyImage src={img.src} alt={img.alt} objectFit="cover" className="w-full h-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>

      <Lightbox open={index >= 0} close={() => setIndex(-1)} slides={images} index={index} plugins={[Captions]} />
    </div>
  );
}
