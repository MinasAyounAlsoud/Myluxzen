// routes/authRoutes.js (Authentifizierungsrouten mit Logout)
import express from 'express';
import { registerUser, authUser, logoutUser } from '../controllers/authController.js';
import { getUserProfile, updateUserProfile } from "../controllers/authController.js";
import {  getUserBookings,cancelUserBooking} from "../controllers/authController.js";
import protect  from "../middleware/authMiddleware.js";
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);
router.get("/me", protect, getUserProfile);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);
//  Alle Buchungen des eingeloggten Nutzers abrufen
router.get("/my-bookings", protect, getUserBookings);

//  Buchung stornieren
router.put("/cancel-booking/:bookingNumber", protect, cancelUserBooking);


export default router;
