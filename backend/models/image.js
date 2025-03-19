import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true }, // 📌 URL de l'image stockée sur Cloudinary
  description: { type: String, default: "" },
});

const Image = mongoose.model("Image", imageSchema);
export default Image;
