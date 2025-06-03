import React, { useState } from "react";
import Image from "next/image";

export function LazyImage({
  src,
  alt,
  className,
  loading = "lazy",
  objectFit = "cover",
  fill = true, // defaultně fill
  width,
  height,
}: {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  objectFit?: "cover" | "contain";
  fill?: boolean;
  width?: number;
  height?: number;
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-red-100 text-red-500 text-xs font-medium rounded ${className}`}>
        🖼️ Nelze načíst
      </div>
    );
  }

  return (
    <div className={`relative ${fill ? "w-full h-full" : ""} ${className}`}>
      {!loaded && <div className="absolute inset-0 shimmer pointer-events-none z-10" />}
      <Image
        src={src}
        alt={alt}
        loading={loading}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`transition-opacity duration-500 rounded object-${objectFit} ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}