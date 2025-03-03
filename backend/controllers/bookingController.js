// controllers/bookingController.js (Buchungsverwaltung)
import asyncHandler from 'express-async-handler';
import Booking from '../models/Booking.js';

const getBookings = asyncHandler(async (req, res) => {
    const bookings = await Booking.find({ user: req.user._id });
    res.json(bookings);
});

const createBooking = asyncHandler(async (req, res) => {
    const { checkInDate, checkOutDate, roomType } = req.body;
    const booking = new Booking({
        user: req.user._id,
        checkInDate,
        checkOutDate,
        roomType,
    });
    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
});

export { getBookings, createBooking };