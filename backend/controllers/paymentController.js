// controllers/paymentController.js (Zahlung & Rechnungen)
import asyncHandler from 'express-async-handler';
import Payment from '../models/Payment.js';

const getPayments = asyncHandler(async (req, res) => {
    const payments = await Payment.find({ user: req.user._id }).populate('booking');
    res.json(payments);
});

const createPayment = asyncHandler(async (req, res) => {
    const { bookingId, amount } = req.body;
    const payment = new Payment({ user: req.user._id, booking: bookingId, amount });
    const createdPayment = await payment.save();
    res.status(201).json(createdPayment);
});

export { getPayments, createPayment };
