import Image from "next/image";
import { useState } from "react";

export function LazyImage({
  src,
  alt,
  className,
  loading = "lazy",
  objectFit = "cover", // 👈 Nový prop
}: {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  objectFit?: "cover" | "contain";
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-red-100 text-red-500 text-xs font-medium rounded ${className}`}
      >
        🖼️ Nelze načíst
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 shimmer pointer-events-none z-10" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        loading={loading}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`transition-opacity duration-500 rounded ${
          loaded ? "opacity-100" : "opacity-0"
        } object-${objectFit}`}
      />
    </div>
  );
}