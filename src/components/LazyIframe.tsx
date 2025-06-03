"use client";
import { useState } from "react";

type Props = {
  src: string;
  title: string;
  heightClassName?: string; // například "h-[400px]" nebo "h-64"
};

export default function LazyIframe({ src, title, heightClassName = "h-64" }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`w-full overflow-hidden rounded-lg bg-gray-200 relative ${heightClassName}`}>
      <iframe
        src={src}
        title={title}
        className="w-full h-full border-0"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />

      {/* Globální shimmer */}
      {!loaded && !error && (
        <div className="absolute inset-0 shimmer pointer-events-none z-10" />
      )}

      {/* Fallback na chybu */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-white text-red-500 text-sm z-20">
          🧨 Nelze načíst video
        </div>
      )}
    </div>
  );
}