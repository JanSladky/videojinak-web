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

    const htmlContent = `
      <div style="background-color:#e6f0fa;padding:24px;border-radius:8px;font-family:Arial,sans-serif;color:#111;">
        <h2 style="text-align:center;color:#1a4a7f;">${isCompany ? "💼 Firemní poptávka" : "💍 Svatební poptávka"}</h2>
        <hr style="margin:16px 0;"/>

        ${
          isCompany
            ? `
          <p><strong>Název firmy:</strong><br>${req.body.company_name}</p>
          <p><strong>E-mail:</strong><br>${req.body.email}</p>
          <p><strong>Telefon:</strong><br>${req.body.phone}</p>
          <p><strong>Datum akce:</strong><br>${req.body.event_date}</p>
          <p><strong>Místo konání akce:</strong><br>${req.body.place}</p>
          <p><strong>Odkud se o nás dozvěděli:</strong><br>${req.body.source}</p>
          <p><strong>Doplňující informace o firmě:</strong><br>${req.body.message}</p>
        `
            : `
          <p><strong>Jméno ženicha a nevěsty:</strong><br>${req.body.name}</p>
          <p><strong>E-mail:</strong><br>${req.body.email}</p>
          <p><strong>Telefon:</strong><br>${req.body.phone}</p>
          <p><strong>Datum svatby:</strong><br>${req.body.wedding_date}</p>
          <p><strong>Místo konání svatby:</strong><br>${req.body.place}</p>
          <p><strong>Odkud se o nás dozvěděli:</strong><br>${req.body.source}</p>
          <p><strong>Doplňující informace o páru:</strong><br>${req.body.message}</p>
        `
        }

        <hr style="margin-top:24px;"/>
        <p style="font-size:13px;color:#444;">
          Tento e-mail byl odeslán z webového formuláře na <strong>VideoJinak.cz</strong>
        </p>
      </div>
    `;

    // E-mail pro admina
    await transporter.sendMail({
      from: `"${isCompany ? req.body.company_name : req.body.name}" <${req.body.email}>`,
      to: process.env.EMAIL_TO,
      subject: subjectToAdmin,
      html: htmlContent,
    });

    // E-mail pro uživatele
    const textToUser = isCompany
      ? `Dobrý den,\n\nInformace dorazily v pořádku, děkujeme. Brzy se Vám ozveme.\n\nS pozdravem,\nLukáš Šimandl – VideoJinak`
      : `Dobrý den,\n\nInformace dorazily v pořádku, děkujeme. Brzy se Vám ozveme.\n\nS pozdravem,\nLukáš Šimandl – VideoJinak`;

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