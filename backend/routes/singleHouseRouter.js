import express from "express";
import { getHouses, editSingleHouse, querySingleHouses, } from "../middlewares/singleHouseMW.js";
import { bookingCheckin,bookingCheckOut } from "../middlewares/bookingMW.js";

const router = express.Router();
router.get("/getHouses/:houseType",[getHouses], (req, res) => {
    console.log("/houses:");
    res.status(200).json(req.result); 
});
router.get('/query',[querySingleHouses], (req, res) => {
    res.status(200).json(req.result); 
});
//house check in, update isAvailable as false, set bookingNum and guestName, 
//update the Booking, set houseNum and update status as checkedIn
router.put("/houseCheckin/:houseNum", [editSingleHouse,bookingCheckin], (req, res) => {
    res.status(201).json({ message: "house checkin successfully", houseNum: req.houseNum, bookingNum : req.bookingNum});
});
router.put("/houseCheckOut/:houseNum", [editSingleHouse,bookingCheckOut], (req, res) => {
    res.status(201).json({ message: "house checkin successfully",bookingNum : req.bookingNum});
});
router.use((err, req, res, next)=>{
    res.status(err.status || 400).json({ message: err.message });
});
export { router as singleHouseRouter };