import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

// ✅ reCAPTCHA ověření
async function verifyCaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${secret}&response=${token}`,
  });
  const data = await response.json();
  return data.success;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Pouze POST je povolen." });
  }

  const { recaptchaToken } = req.body;
  if (!recaptchaToken) {
    return res.status(400).json({ message: "Chybí reCAPTCHA token." });
  }

  const isHuman = await verifyCaptcha(recaptchaToken);
  if (!isHuman) {
    return res.status(403).json({ message: "reCAPTCHA ověření selhalo." });
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

    const subjectToAdmin = isCompany
      ? "Nová poptávka z firemního formuláře"
      : "Nová poptávka ze svatebního formuláře";

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
      ? `Dobrý den,\n\nInformace dorazili v pořádku, děkujeme. Brzy se Vám ozveme.\n\nS pozdravem,\nLukáš Šimandl – VideoJinak`
      : `Dobrý den,\n\nInformace dorazili v pořádku, děkujeme. Brzy se Vám ozveme.\n\nS pozdravem,\nLukáš Šimandl – VideoJinak`;

    await transporter.sendMail({
      from: `"${isCompany ? req.body.company_name : req.body.name}" <${req.body.email}>`,
      to: process.env.EMAIL_TO,
      subject: subjectToAdmin,
      text: textToAdmin,
    });

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