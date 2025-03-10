// index.js (Server Einstiegspunkt)
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import {bookingRouter} from "./routes/bookingRouter.js";

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use("/booking", bookingRouter);

app.use((err, req, res, next) => {
    console.error("Fehler:", err.message);
    res.status(err.statusCode || 500).json({ message: err.message || "Interner Serverfehler" });
});

app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));




/*
{
    "name": "Test User",
    "email": "testuser@example.com",
    "password": "Passwort123!"
}

{
    "name": "Max Mustermann",
    "email": "max@example.com",
    "password": "Passwort123!"
}

{
    "guestCount": 3,
    "startDate": "2025-04-05T15:00:00.000Z",
    "endDate": "2025-04-10T10:00:00.000Z",
    "houseType": "Villa",
    "status": "Active",
    "price": 500,
    "comments": "Sea view requested"
}

*/

