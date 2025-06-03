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

    const subject = isCompany
      ? "Nová poptávka z firemního formuláře"
      : "Nová poptávka ze svatebního formuláře";

    const text = isCompany
      ? `
        Název firmy: ${req.body.company_name}
        E-mail: ${req.body.email}
        Telefon: ${req.body.phone}
        Datum akce: ${req.body.event_date}
        Místo konání akce: ${req.body.place}
        Zdroj: ${req.body.source}
        Zpráva: ${req.body.message}
      `
      : `
        Jméno ženicha a nevěsty: ${req.body.name}
        E-mail: ${req.body.email}
        Telefon: ${req.body.phone}
        Datum svatby: ${req.body.wedding_date}
         Místo konání svatby: ${req.body.place}
        Zdroj: ${req.body.source}
        Zpráva: ${req.body.message}
      `;

    await transporter.sendMail({
      from: `"${isCompany ? req.body.company_name : req.body.name}" <${req.body.email}>`,
      to: process.env.EMAIL_TO,
      subject,
      text,
    });

    return res.status(200).json({ message: "Úspěšně odesláno" });
  } catch (err) {
    console.error("❌ Email error:", err);
    return res.status(500).json({ message: "Chyba při odesílání e-mailu" });
  }
}