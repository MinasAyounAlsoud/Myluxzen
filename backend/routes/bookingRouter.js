// routes/bookingRoutes.js
import express from "express";
import { getAvailableBooking } from "../middlewares/bookingMW.js";
import { getAvailableRooms } from "../middlewares/bookingMW.js";
import { createBookingMiddleware } from "../middlewares/bookingMW.js";
import { getBookingTicket } from "../middlewares/bookingMW.js";

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
router.post("/create-booking", createBookingMiddleware, (req, res) => {
    res.status(201).json({ message: "Booking created successfully", booking: req.result });
});
router.use((err, req, res, next)=>{
    res.status(err.status || 400).json({ message: err.message });
});

export { router as bookingRouter };