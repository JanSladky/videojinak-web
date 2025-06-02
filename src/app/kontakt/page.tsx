"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

export default function KontaktPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    wedding_date: "",
    source: "",
    message: "",
  });

  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("⏳ Odesílání...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(error || "Chyba při odesílání.");
      }

      setStatus("✅ Zpráva byla úspěšně odeslána.");
      setForm({
        name: "",
        email: "",
        phone: "",
        wedding_date: "",
        source: "",
        message: "",
      });
    } catch (err) {
      console.error("❌ Výjimka:", err);
      setStatus("❌ Nepodařilo se odeslat zprávu.");
    }
  };

  return (
    <div className="px-6 py-12 max-w-4xl mx-auto text-center space-y-6">
      <h1 className="text-3xl font-bold mb-4">Kontakt</h1>
      <div className="mt-10 flex justify-center gap-6 text-2xl text-gray-700">
        <a href="https://www.instagram.com/tvoje_instagram" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://www.facebook.com/tvoje_facebook" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
        <a href="https://www.youtube.com/@tvoje_youtube" target="_blank" rel="noopener noreferrer">
          <FaYoutube />
        </a>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4 max-w-md mx-auto text-left">
        <input type="text" name="name" placeholder="Vaše jméno" value={form.name} onChange={handleChange} required className="w-full p-3 border rounded" />
        <input type="email" name="email" placeholder="Váš e-mail" value={form.email} onChange={handleChange} required className="w-full p-3 border rounded" />
        <input
          type="tel"
          name="phone"
          placeholder="Telefonní číslo"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded"
        />
        <input type="date" name="wedding_date" value={form.wedding_date} onChange={handleChange} required className="w-full p-3 border rounded" />
        <select name="source" value={form.source} onChange={handleChange} required className="w-full p-3 border rounded">
          <option value="">Odkud jste se o nás dozvěděli?</option>
          <option value="Facebook">Facebook</option>
          <option value="Instagram">Instagram</option>
          <option value="Doporučení">Doporučení</option>
          <option value="Google">Google</option>
          <option value="Jiné">Jiné</option>
        </select>
        <textarea name="message" rows={5} placeholder="Poznámka" value={form.message} onChange={handleChange} className="w-full p-3 border rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Odeslat zprávu
        </button>
        {status && <p className="text-sm text-center mt-2">{status}</p>}
      </form>
    </div>
  );
}
