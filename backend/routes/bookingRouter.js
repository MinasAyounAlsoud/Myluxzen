import express from "express";
import { queryBookingTickets,deleteBooking,getAvailableHouses, bookingCheckoutOrCancel } from "../middlewares/bookingMW.js";
import { createBookingMiddleware } from "../middlewares/bookingMW.js";
import { getBookingTicket } from "../middlewares/bookingMW.js";
import { houseReserve ,houseCheckoutOrCancel} from "../middlewares/singleHouseMW.js";

const router = express.Router();

router.get("/bybookingnum/:bookingNumber",[getBookingTicket], (req, res) => {
    console.log("Response:", req.result);
    res.status(200).json(req.result); 
});
router.get('/query',[queryBookingTickets], (req, res) => {
    res.status(200).json(req.result); 
});
router.post("/check-availability", getAvailableHouses, (req, res) => {
    const availableRooms = req.result;
    if (!availableRooms || availableRooms.length === 0) {
        return res.status(404).json({ message: "No available rooms for the given criteria." });
    }
    res.status(200).json(availableRooms);
});
router.post("/create-booking", [createBookingMiddleware, houseReserve], (req, res) => {
    res.status(201).json({ message: "Booking created successfully", booking: req.result });
});
router.delete("/delete/:bookingNumber", deleteBooking, (req, res) => {
    res.status(201).json({ message: "Booking edited successfully", booking: req.result });
});
router.put("/cancel-or-checkout/:bookingNum", [bookingCheckoutOrCancel, houseCheckoutOrCancel], (req, res) => {
    res.status(201).json({ message: "Booking canceledorcheckedout successfully", booking: req.result });
});

router.use((err, req, res, next)=>{
    res.status(err.status || 400).json({ message: err.message });
});
export { router as bookingRouter };