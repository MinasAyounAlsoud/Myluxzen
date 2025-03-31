// Zahra - utils/emailService.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Base URL je nach Umgebung (localhost oder production)
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://myluxzen.com"
    : "http://localhost:5173";

// Gmail-Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

//  Hauptfunktion zum Versenden von E-Mails an Kunden
export const sendEmailToClient = async ({ to, subject, text, hasAccount = false, bookingLink = null }) => {
  // 🔗 Link zum Kundenkonto (wenn vorhanden)
  const accountLink = hasAccount
    ? `<p style="margin-top: 20px;">
         <a href="${BASE_URL}/account-booking?view=account" target="_blank" style="color:#116769; text-decoration: none;">
         Hier klicken, um Ihre Reservierungen in Ihrem Konto zu verwalten
         </a>
       </p>`
    : "";

  // Link zur Buchung (z.B. /booking/BOOK4008)
  const directBookingLink = bookingLink
    ? `<p style="margin-top: 10px;">
         <a href="${bookingLink.replace("http://localhost:5173", BASE_URL)}" target="_blank" style="color:#116769; text-decoration: none;">
         Hier klicken, um Ihre Buchung direkt anzusehen
         </a>
       </p>`
    : "";

  // HTML-Vorlage für die E-Mail
  const htmlTemplate = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; color: #333;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="cid:logoMyLuxZen" alt="MyLuxZen Logo" style="width: 100px;" />
      </div>

      <h2 style="color: #116769;">Antwort von MyLuxZen</h2>
      <p>Liebe Kundin, lieber Kunde,</p>
      <p>${text.replace(/\n/g, "<br/>")}</p>

      ${directBookingLink}
      ${accountLink}

      <br/>
      <p>Mit freundlichen Grüßen,<br/><strong>Ihr MyLuxZen Team</strong></p>

      <hr style="margin: 30px 0;" />

      <div style="font-size: 14px; color: #555; line-height: 1.6;">
        <p><strong>Telefon:</strong> +49 123 456 789</p>
        <p><strong>Website:</strong> <a href="https://myluxzen.com" target="_blank" style="color: #116769;">www.myluxzen.com</a></p>
        <p><strong>E-Mail:</strong> info@myluxzen.com</p>
      </div>

      <hr style="margin: 30px 0;" />
      <p style="font-size: 12px; color: #888; text-align: center;">
        Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht auf diese Adresse.
      </p>
    </div>
  `;

  // E-Mail-Optionen
  const mailOptions = {
    from: `"MyLuxZen Support" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    text,
    html: htmlTemplate,
    attachments: [
      {
        filename: "logo.png",
        path: path.join(__dirname, "../assets/images/logo.png"),
        cid: "logoMyLuxZen",
      },
    ],
  };

  // E-Mail versenden
  const info = await transporter.sendMail(mailOptions);
  console.log("E-Mail erfolgreich gesendet:", info.response);
};
