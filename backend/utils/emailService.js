// Zahra utils/emailService.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const sendEmailToClient = async ({ to, subject, text }) => {
  const htmlTemplate = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; color: #333;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="cid:logoMyLuxZen" alt="MyLuxZen Logo" style="width: 100px;" />
      </div>

      <h2 style="color: #116769;">Antwort von MyLuxZen</h2>
      <p>Liebe Kundin, lieber Kunde,</p>
      <p>${text.replace(/\n/g, "<br/>")}</p>

      <br/>
      <p>Mit freundlichen Grüßen,<br/><strong>Ihr MyLuxZen Team</strong></p>

      <hr style="margin: 30px 0;" />

      <div style="font-size: 14px; color: #555; line-height: 1.6;">
        <p><strong>📞 Telefon:</strong> +49 123 456 789</p>
        <p><strong>🌐 Website:</strong> <a href="https://myluxzen.com" target="_blank" style="color: #116769;">www.myluxzen.com</a></p>
        <p><strong>✉️ E-Mail:</strong> info@myluxzen.com</p>
      </div>

      <hr style="margin: 30px 0;" />
      <p style="font-size: 12px; color: #888; text-align: center;">
        Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht auf diese Adresse.
      </p>
    </div>
  `;

  const mailOptions = {
    from: `"MyLuXZeN Support" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    text,
    html: htmlTemplate,
    attachments: [
      {
        filename: "logo.png",
        path: path.join(__dirname, "../assets/images/logo.png"), // ✅ chemin local
        cid: "logoMyLuxZen", // correspond à src="cid:logoMyLuxZen"
      },
    ],
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("✅ Email envoyé :", info.response);
};