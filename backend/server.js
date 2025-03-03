// index.js (Server Einstiegspunkt)
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);

app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));

app.use((err, req, res, next) => {
    console.error("Fehler:", err.message);
    res.status(err.statusCode || 500).json({ message: err.message || "Interner Serverfehler" });
});



/*
{
    "name": "Test",
    "email": "test@example.com",
    "password": "Passwort123!"
}
*/