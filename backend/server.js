import express from "express";
import dotenv from "dotenv";
import { connect } from "./utils/connect.js";
import cors from "cors";
import cookieParser from "cookie-parser"; //Naheeda
// here is for routers, begin
import { bookingRouter } from "./routes/bookingRouter.js";
import imageRoutes from "./routes/imageRoutes.js";
import { authRouter } from "./routes/authRouter.js"; // authRouter durch Naheeda importiert
import hausRoutes from "./routes/HausRoutes.js"; //Minas
import reviewRouter from "./routes/reviewRouter.js"; //Minas
import { singleHouseRouter } from "./routes/singleHouseRouter.js";// Xiangyu

// here is for routers, end

dotenv.config();
connect();
const app = express();

app.use("/images", express.static("public/images"));

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser()); //Add Cookieparser von Naheeda
app.use(express.json());
// app.get("/", (req, res) => {
//   res.send("✅ Myluxzen API läuft... 🚀");
// });
// here add routers, begin
// booking router,  Xiangyu
app.use("/booking", bookingRouter);//Xiangyu
app.use("/singleHouse", singleHouseRouter);//Xiangyu

// 📌 Servir les images statiques, Zahra
app.use("/uploads", express.static("uploads"));
// 📌 Routes, Zahra
app.use("/api/images", imageRoutes);

app.use("/api/auth", authRouter); // authRouter durch Naheeda hinzugefügt
// Minas
app.use("/api/houses", hausRoutes);
app.use("/api/reviews", reviewRouter);

// test: change from dev direct
// test: change from Xiangyu-branch direct
//here add routers, end
app.use((err, req, res, next) => {
  console.error("Error occurred:", err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server läuft auf ${process.env.MONGODB_URL}:${PORT}`);
});
