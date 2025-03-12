//Zahra, seed.js
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { connect } from "./connect.js";  // Remonter dans backend
import Image from "../models/image.js";  // Vérifier si models est bien dans backend
import { fileURLToPath } from "url";
import assets from "../assets/images/asset.js";  // Vérifier si le chemin est correct

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 📌 Correction : Aller chercher "uploads/" dans backend/
const uploadsDir = path.join(__dirname, "../uploads");  
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const imagesList = Object.values(assets).flat().map((img) => {
  const imageName = `${Date.now()}-${img.file}`;
  const sourcePath = path.join(__dirname, "../assets/images", img.file);  // Correction ici
  const destinationPath = path.join(uploadsDir, imageName);

  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destinationPath);
  } else {
    console.warn(`❌ Image non trouvée: ${sourcePath}`);
  }

  return {
    url: `/uploads/${imageName}`,
    description: img.description,
  };
});

const seedDatabase = async () => {
  try {
    await connect();
    await Image.deleteMany({});
    console.log("✅ Collection Images vidée");

    await Image.insertMany(imagesList);
    console.log("✅ Images insérées avec succès");
  } catch (error) {
    console.error("❌ Erreur:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Connexion MongoDB fermée");
  }
};

seedDatabase();
