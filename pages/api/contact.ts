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

    const subjectToAdmin = isCompany ? "Nová poptávka z firemního formuláře" : "Nová poptávka ze svatebního formuláře";

    // ✉️ HTML email pro admina
    const htmlToAdmin = `
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
        <hr style="margin-top:24px;" />
        <p style="font-size:13px;color:#444;">Tento e-mail byl odeslán z webového formuláře na <strong>VideoJinak.cz</strong></p>
      </div>
    `;

    // ✉️ HTML email pro uživatele
    const htmlToUser = `
  <div style="background-color:#e6f0fa;padding:24px;border-radius:8px;font-family:Arial,sans-serif;color:#111;">
    <h2 style="margin:0 0 12px 0;color:#1a4a7f;font-size:20px;text-align:left;">Děkujeme za zprávu</h2>
    <p style="margin-top:0;">Vaše informace dorazily v pořádku. Brzy se Vám ozveme.</p>

    <hr style="margin:24px 0;"/>

    <div style="line-height:1.6;">
      <strong>Lukáš Šimandl – Videojinak</strong><br/>
      Telefon: <a href="tel:604403564" style="color:#1a4a7f;">604 403 564</a><br/>
      E-mail: <a href="mailto:videojinak@centrum.cz" style="color:#1a4a7f;">videojinak@centrum.cz</a>
    </div>

    <div style="margin:20px 0 10px 0;">
      <a href="https://www.youtube.com/@lukassvatby/featured" target="_blank" style="margin-right:8px;display:inline-block;">
        <img src="https://upload.wikimedia.org/wikipedia/commons/7/75/YouTube_social_white_squircle_%282017%29.svg" alt="YouTube" width="32" height="32" style="display:block;"/>
      </a>
      <a href="https://www.facebook.com/@Videojinak" target="_blank" style="margin-right:8px;display:inline-block;">
        <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" alt="Facebook" width="32" height="32" style="display:block;"/>
      </a>
      <a href="https://www.instagram.com/videojinak_lukas_simandl/" target="_blank" style="display:inline-block;">
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" width="32" height="32" style="display:block;"/>
      </a>
    </div>

    <div style="margin-top: 20px;">
  <a href="https://www.videojinak.cz" target="_blank" rel="noopener noreferrer">
    <img src="https://www.videojinak.cz/images/logo.png" alt="VideoJinak logo" width="160" style="display:block;margin-top:8px;" />
  </a>
</div>

    <p style="font-size:13px;color:#444;margin-top:16px;">
      Tento e-mail byl odeslán z webového formuláře na <strong><a href="https://www.videojinak.cz" target="_blank" rel="noopener noreferrer">VideoJinak.cz</a></strong>
    </p>
  </div>
`;

    // ✅ E-mail adminovi
    await transporter.sendMail({
      from: `"${isCompany ? req.body.company_name : req.body.name}" <${req.body.email}>`,
      to: process.env.EMAIL_TO,
      subject: subjectToAdmin,
      html: htmlToAdmin,
    });

    // ✅ Automatická odpověď pro uživatele
    await transporter.sendMail({
      from: `"VideoJinak" <${process.env.EMAIL_USER}>`,
      to: req.body.email,
      subject: "Děkujeme za zprávu",
      html: htmlToUser,
    });

    return res.status(200).json({ message: "Úspěšně odesláno" });
  } catch (err) {
    console.error("❌ Email error:", err);
    return res.status(500).json({ message: "Chyba při odesílání e-mailu" });
  }
}
