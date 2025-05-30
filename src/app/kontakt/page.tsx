'use client';

import { FaYoutube, FaFacebook, FaInstagram } from 'react-icons/fa';

export default function KontaktPage() {
  return (
    <div className="px-6 py-12 max-w-4xl mx-auto text-center space-y-6">
      <h1 className="text-3xl font-bold mb-4">Kontakt</h1>

      <div className="text-left text-lg space-y-2">
        <p><strong>Lukáš Šimandl</strong></p>
        <p>tel. 604 403 564</p>
        <p>e-mail: <a href="mailto:videojinak@centrum.cz" className="text-blue-600 underline">videojinak@centrum.cz</a></p>
      </div>

      <div className="flex justify-center items-center gap-6 text-3xl mt-4">
        <a href="https://www.youtube.com/@lukassvatby/featured" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:scale-110 transition">
          <FaYoutube />
        </a>
        <a href="https://www.facebook.com/@Videojinak" target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:scale-110 transition">
          <FaFacebook />
        </a>
        <a href="https://www.instagram.com/videojinak_lukas_simandl/" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:scale-110 transition">
          <FaInstagram />
        </a>
      </div>

      <p className="text-lg mt-8">
        Pro objednání svatby nebo firemního videa nás prosím kontaktujte e-mailem:{' '}
        <a href="mailto:videojinak@centrum.cz" className="text-blue-600 underline">
          videojinak@centrum.cz
        </a>
      </p>
    </div>
  );
}