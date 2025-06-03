"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";

export default function KontaktPage() {
  const [activeTab, setActiveTab] = useState<"svatebni" | "firemni">("svatebni");

  const [formWedding, setFormWedding] = useState({
    name: "",
    email: "",
    phone: "",
    wedding_date: "",
    source: "",
    message: "",
  });

  const [formCompany, setFormCompany] = useState({
    company_name: "",
    email: "",
    phone: "",
    event_date: "",
    source: "",
    message: "",
  });

  const [status, setStatus] = useState<string | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, isCompany = false) => {
    const { name, value } = e.target;
    if (isCompany) {
      setFormCompany((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormWedding((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("⏳ Odesílání...");

    if (!recaptchaToken) {
      setStatus("⚠️ Ověřte, že nejste robot.");
      return;
    }

    const form = activeTab === "svatebni" ? formWedding : formCompany;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...form, recaptchaToken }),
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(error || "Chyba při odesílání.");
      }

      setStatus("✅ Zpráva byla úspěšně odeslána.");
      if (activeTab === "svatebni") {
        setFormWedding({
          name: "",
          email: "",
          phone: "",
          wedding_date: "",
          source: "",
          message: "",
        });
      } else {
        setFormCompany({
          company_name: "",
          email: "",
          phone: "",
          event_date: "",
          source: "",
          message: "",
        });
      }
    } catch (err) {
      console.error("❌ Výjimka:", err);
      setStatus("❌ Nepodařilo se odeslat zprávu.");
    }
  };

  return (
    <div className="px-6 py-12 max-w-4xl mx-auto text-center space-y-6">
      <h1 className="text-3xl font-bold mb-4">Kontakt</h1>
      {/* Social Icons */}
      <div className="mt-4 flex justify-center gap-6 text-2xl text-gray-700">
        <Link href="https://www.instagram.com/videojinak_lukas_simandl/" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </Link>
        <Link href="https://www.facebook.com/Videojinak" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </Link>
        <Link href="https://www.youtube.com/@lukassvatby" target="_blank" rel="noopener noreferrer">
          <FaYoutube />
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-6 space-x-4">
        <button
          className={`px-4 py-2 font-semibold ${activeTab === "svatebni" ? "border-b-2 border-black" : "text-gray-500"}`}
          onClick={() => setActiveTab("svatebni")}
        >
          Svatební poptávka
        </button>
        <button
          className={`px-4 py-2 font-semibold ${activeTab === "firemni" ? "border-b-2 border-black" : "text-gray-500"}`}
          onClick={() => setActiveTab("firemni")}
        >
          Firemní poptávka
        </button>
      </div>

      {/* Formuláře */}
      <form onSubmit={handleSubmit} className="mt-8 space-y-4 max-w-md mx-auto text-left">
        {activeTab === "svatebni" ? (
          <>
            <input
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Vaše jméno"
              value={formWedding.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded"
            />
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Váš e-mail"
              value={formWedding.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded"
            />
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              placeholder="Telefonní číslo"
              value={formWedding.phone}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded"
            />
            <span className="block mb-1 font-medium">Datum svatby</span>
            <input
              type="date"
              name="wedding_date"
              autoComplete="off"
              value={formWedding.wedding_date}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded"
            />
            <select name="source" value={formWedding.source} onChange={handleChange} required className="w-full p-3 border rounded">
              <option value="">Odkud jste se o nás dozvěděli?</option>
              <option value="Facebook">Facebook</option>
              <option value="Instagram">Instagram</option>
              <option value="Doporučení">Doporučení</option>
              <option value="Google">Google</option>
              <option value="Jiné">Jiné</option>
            </select>
            <textarea
              name="message"
              rows={5}
              placeholder="Poznámka"
              value={formWedding.message}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />
          </>
        ) : (
          <>
            <input
              type="text"
              name="company_name"
              autoComplete="organization"
              placeholder="Název firmy"
              value={formCompany.company_name}
              onChange={(e) => handleChange(e, true)}
              required
              className="w-full p-3 border rounded"
            />
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Váš e-mail"
              value={formCompany.email}
              onChange={(e) => handleChange(e, true)}
              required
              className="w-full p-3 border rounded"
            />
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              placeholder="Váš telefon"
              value={formCompany.phone}
              onChange={(e) => handleChange(e, true)}
              required
              className="w-full p-3 border rounded"
            />
            <span className="block mb-1 font-medium">Datum akce</span>
            <input
              type="date"
              name="event_date"
              autoComplete="off"
              value={formCompany.event_date}
              onChange={(e) => handleChange(e, true)}
              required
              className="w-full p-3 border rounded"
            />
            <select name="source" value={formCompany.source} onChange={handleChange} required className="w-full p-3 border rounded">
              <option value="">Odkud jste se o nás dozvěděli?</option>
              <option value="Facebook">Facebook</option>
              <option value="Instagram">Instagram</option>
              <option value="Doporučení">Doporučení</option>
              <option value="Google">Google</option>
              <option value="Jiné">Jiné</option>
            </select>
            <textarea
              name="message"
              rows={5}
              placeholder="Popis akce"
              value={formCompany.message}
              onChange={(e) => handleChange(e, true)}
              className="w-full p-3 border rounded"
            />
          </>
        )}

        <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} onChange={(token: string | null) => setRecaptchaToken(token)} className="mx-auto" />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Odeslat zprávu
        </button>
        {status && <p className="text-sm text-center mt-2">{status}</p>}
      </form>
    </div>
  );
}
