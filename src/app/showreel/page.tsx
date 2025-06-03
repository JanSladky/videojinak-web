"use client";

import LazyIframe from "../../components/LazyIframe";

export default function ShowreelPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Sestřih nejzajímavějších videí, na kterých jsme pracovali …
      </h1>

      <LazyIframe
        src="https://www.youtube.com/embed/HGCtCazEWxY"
        title="Videojinak Showreel"
        heightClassName="h-[400px]"
      />
    </div>
  );
}