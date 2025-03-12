import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  description: { type: String, default: "" },
});

const Image = mongoose.model("image", imageSchema);
export default Image;
