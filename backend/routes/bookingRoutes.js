// routes/bookingRoutes.js (Buchungsrouten)
import express from 'express';
import { getBookings, createBooking } from '../controllers/bookingController.js';
import protect from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').get(protect, getBookings).post(protect, createBooking);

export default router;