//zahra 

import express from "express";
import Image from "../models/image.js";
import upload from "../middlewares/uploadMiddleware.js";
import fs from "fs";

const router = express.Router();

// 📌 Récupérer toutes les images
router.get("/", async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// 📌 Upload d'une image
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const newImage = new Image({
      url: `/uploads/${req.file.filename}`,
      description: req.body.description || "",
    });

    await newImage.save();
    res.json(newImage);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'upload" });
  }
});

// 📌 Suppression d'une image
router.delete("/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Image non trouvée" });

    fs.unlinkSync(`.${image.url}`); // Supprime le fichier image
    await image.deleteOne();
    res.json({ message: "Image supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression" });
  }
});

export default router;


