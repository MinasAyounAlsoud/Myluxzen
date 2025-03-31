// Zahra routes/contact.routes.js
import express from "express";
import EmailMessage from "../models/emailMessage.js";
import { sendEmailToClient } from "../utils/emailService.js";

const router = express.Router();

// ✅ 1. POST-Route: Kunde sendet eine Nachricht (wird in MongoDB gespeichert)
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const neueNachricht = new EmailMessage({
      name,
      email,
      message,
    });

    await neueNachricht.save();

    res.status(201).json({ message: "Nachricht erfolgreich gespeichert." });
  } catch (error) {
    console.error("Fehler bei POST /api/contact:", error);
    res.status(500).json({ error: "Serverfehler beim Speichern der Nachricht." });
  }
});

// ✅ 2. GET-Route: Admin ruft alle Nachrichten ab
router.get("/all", async (req, res) => {
  try {
    const nachrichten = await EmailMessage.find().sort({ createdAt: -1 });
    res.status(200).json(nachrichten);
  } catch (error) {
    console.error("Fehler bei GET /api/contact/all:", error);
    res.status(500).json({ error: "Serverfehler beim Abrufen der Nachrichten." });
  }
});

// ✅ 3. POST-Route: Admin antwortet auf eine Nachricht
router.post("/reply", async (req, res) => {
  const { id, email, responseText } = req.body;

  try {
    // Antwort per E-Mail senden
    await sendEmailToClient({
      to: email,
      subject: "Antwort von MyLuxZen",
      text: responseText,
    });

    // Nachricht in der Datenbank aktualisieren
    await EmailMessage.findByIdAndUpdate(id, {
      status: "replied",
      reply: responseText,
      repliedAt: new Date(), // Optional: Zeitpunkt der Antwort speichern
    });

    res.status(200).json({ message: "Antwort erfolgreich gesendet und Nachricht aktualisiert." });
  } catch (error) {
    console.error("Fehler bei POST /api/contact/reply:", error);
    res.status(500).json({ error: "Fehler beim Senden der Antwort." });
  }
});

export default router;
