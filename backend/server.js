import express from "express";
import dotenv from "dotenv";
import { connect } from "./utils/connect.js";
import cors from "cors";
import hausRoutes from "./routes/HausRoutes.js";
import { bookingRouter } from "./routes/bookingRouter.js";
import reviewRouter from "./routes/reviewRouter.js";

dotenv.config();
connect();
const app = express();

app.use(cors());
app.use(express.json());
// Minas
app.use("/api/houses", hausRoutes);
app.use("/images", express.static("public/images"));
app.use("/api/reviews", reviewRouter);

app.get("/", (req, res) => {
  res.send("✅ Myluxzen API läuft... 🚀");
});
// booking router  Xiangyu
app.use("/booking", bookingRouter);

app.use((err, req, res, next) => {
  console.error("Error occurred:", err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server läuft auf http://localhost:${PORT}`);
});
