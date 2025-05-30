export default function ShowreelPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Sestřih nejzajímavějších videí, na kterých jsme pracovali …</h1>

      <div className="aspect-w-16 aspect-h-9 mb-6">
        <iframe
          src="https://www.youtube.com/embed/HGCtCazEWxY"
          title="Videojinak Showreel"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg"
        ></iframe>
      </div>
    </div>
  );
}
