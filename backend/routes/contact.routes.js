// Zahra routes/contact.routes.js
import express from "express";
import EmailMessage from "../models/emailMessage.js";
import { sendEmailToClient } from "../utils/emailService.js";

const router = express.Router();

// ✅ 1. Route POST : client envoie un message (stocké dans MongoDB)
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMsg = new EmailMessage({
      name,
      email,
      message,
    });

    await newMsg.save();

    res.status(201).json({ message: "Message enregistré en base de données" });
  } catch (error) {
    console.error("Erreur POST /api/contact :", error);
    res.status(500).json({ error: "Erreur serveur lors de l'enregistrement" });
  }
});

// ✅ 2. Route GET : admin récupère tous les messages
router.get("/all", async (req, res) => {
  try {
    const messages = await EmailMessage.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Erreur GET /api/contact/all :", error);
    res.status(500).json({ error: "Erreur serveur lors de la récupération" });
  }
});

// ✅ 3. Route POST : admin répond à un message
router.post("/reply", async (req, res) => {
  const { id, email, responseText } = req.body;

  try {
    await sendEmailToClient({
      to: email,
      subject: "Antwort von MyLuxZen",
      text: responseText
    });

    await EmailMessage.findByIdAndUpdate(id, {
      status: "replied",
      reply: responseText
    });

    res.status(200).json({ message: "Réponse envoyée et message mis à jour" });
  } catch (error) {
    console.error("Erreur POST /api/contact/reply :", error);
    res.status(500).json({ error: "Erreur lors de l'envoi de la réponse" });
  }
});

export default router;
