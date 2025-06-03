import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Pouze POST je povolen." });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const isCompany = !!req.body.company_name;

    const subjectToAdmin = isCompany ? "Nová poptávka z firemního formuláře" : "Nová poptávka ze svatebního formuláře";

    const textToAdmin = isCompany
      ? `
        Název firmy: ${req.body.company_name}
        E-mail: ${req.body.email}
        Telefon: ${req.body.phone}
        Datum akce: ${req.body.event_date}
        Místo konání akce: ${req.body.place}
        Odkud se o nás dozvěděli: ${req.body.source}
        Doplňující informace o firmě: ${req.body.message}
      `
      : `
        Jméno ženicha a nevěsty: ${req.body.name}
        E-mail: ${req.body.email}
        Telefon: ${req.body.phone}
        Datum svatby: ${req.body.wedding_date}
        Místo konání svatby: ${req.body.place}
        Odkud se o nás dozvěděli: ${req.body.source}
        Doplňující informace o páru: ${req.body.message}
      `;

    const textToUser = isCompany
      ? `Dobrý den,\n\nDěkujeme za zaslání firemní poptávky. Brzy se Vám ozveme.\n\nS pozdravem,\nLukáš Šimandl – VideoJinak`
      : `Dobrý den,\n\nDěkujeme za zaslání svatební poptávky. Brzy se Vám ozveme.\n\nS pozdravem,\nLukáš Šimandl – VideoJinak`;

    // 1. E-mail tobě
    await transporter.sendMail({
      from: `"${isCompany ? req.body.company_name : req.body.name}" <${req.body.email}>`,
      to: process.env.EMAIL_TO,
      subject: subjectToAdmin,
      text: textToAdmin,
    });

    // 2. Odpověď uživateli
    await transporter.sendMail({
      from: `"VideoJinak" <${process.env.EMAIL_USER}>`,
      to: req.body.email,
      subject: "Děkujeme za poptávku",
      text: textToUser,
    });

    return res.status(200).json({ message: "Úspěšně odesláno" });
  } catch (err) {
    console.error("❌ Email error:", err);
    return res.status(500).json({ message: "Chyba při odesílání e-mailu" });
  }
}
