/*import express from 'express';
import Booking from '../models/Booking.js'; // Dein Buchungsmodell
import { protect } from '../middleware/authMiddleware.js'; // Falls Auth nötig

const router = express.Router();

// 🔹 1. GET: Alle Buchungen des eingeloggten Users abrufen
router.get('/my-bookings', protect, async (req, res) => {
    try {
        const bookings = await Booking.find({ email: req.user.email }); // Nutzer findet seine Buchungen anhand der E-Mail
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Fehler beim Abrufen der Buchungen." });
    }
});

// 🔹 2. PUT: Buchung stornieren
router.put('/cancel/:id', protect, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: "Buchung nicht gefunden." });
        }
        booking.status = "Canceled"; // Setze den Status auf "Canceled"
        await booking.save();
        res.json({ message: "Buchung erfolgreich storniert.", booking });
    } catch (error) {
        res.status(500).json({ message: "Fehler beim Stornieren der Buchung." });
    }
});

export default router;
*/
// routes/bookingRoutes.js
// routes/bookingRoutes.js
import express from "express";
import { getAvailableBooking } from "../middleware/bookingMW.js";
import { getAvailableRooms } from "../middleware/bookingMW.js";
import { createBookingMiddleware } from "../middleware/bookingMW.js";
import { getBookingTicket } from "../middleware/bookingMW.js";
import protect from "../middleware/authMiddleware.js"; // Auth Middleware

const router = express.Router();


router.get("/active-bookings",[getAvailableBooking], (req, res) => {
    // const result = { message: "ok" }; // 直接定义响应数据
    console.log("Response:", req.result);
    res.status(200).json(req.result); // 直接返回响应
});
router.get("/booking/:bookingNumber",[getBookingTicket], (req, res) => {
    // const result = { message: "ok" }; // 直接定义响应数据
    console.log("Response:", req.result);
    res.status(200).json(req.result); // 直接返回响应
});

router.post("/check-availability", getAvailableRooms, (req, res) => {
    const availableRooms = req.result;
    if (!availableRooms || availableRooms.length === 0) {
        return res.status(404).json({ message: "No available rooms for the given criteria." });
    }
    res.status(200).json(availableRooms);
});
router.post("/create-booking",protect, createBookingMiddleware, (req, res) => {
    res.status(201).json({ message: "Booking created successfully", booking: req.result });
});
router.use((err, req, res, next)=>{
    res.status(err.status || 400).json({ message: err.message });
});

export { router as bookingRouter };