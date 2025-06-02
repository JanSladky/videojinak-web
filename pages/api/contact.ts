import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Pouze POST je povolen." });
  }

  const { name, email, phone, wedding_date, source, message } = req.body;

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
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_TO,
      subject: "Nová poptávka ze svatebního formuláře",
      text: `
        Jméno: ${name}
        E-mail: ${email}
        Telefon: ${phone}
        Datum svatby: ${wedding_date}
        Zdroj: ${source}
        Zpráva: ${message}
      `,
    });

    return res.status(200).json({ message: "Úspěšně odesláno" });
  } catch (err) {
    console.error("❌ Email error:", err);
    return res.status(500).json({ message: "Chyba při odesílání e-mailu" });
  }
}