import express from "express";
import dotenv from "dotenv";
import { connect } from "./utils/connect.js";
import cors from "cors";
// here is for routers, begin
import {bookingRouter} from "./routes/bookingRouter.js";

// here is for routers, end

dotenv.config();
connect();
const app = express();

app.use(cors());
app.use(express.json());
// app.get("/", (req, res) => {
//   res.send("✅ Myluxzen API läuft... 🚀");
// });
// here add routers, begin
// booking router,  Xiangyu
app.use("/booking", bookingRouter);

// test: change from dev direct

//here add routers, end
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



