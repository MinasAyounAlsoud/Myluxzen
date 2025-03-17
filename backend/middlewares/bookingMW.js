import { Booking} from "../models/bookingSchema.js";
import { HausBeschreibung } from "../models/HausBeschreibung.js";

export const getAvailableBooking = async(req,res,next)=>{
    try {
        console.log("GET request to getAvailableBooking"); 
        const activeBookings = await Booking.find({ status: { $in: ['Active', 'CheckedIn'] }});
        console.log("activeBookings", activeBookings); 
        req.result = activeBookings;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const getBookingTicket = async(req,res,next)=>{
    try {
        console.log("GET request to getBookingTicket"); 
        const {bookingNumber} = req.params;
        console.log("bookingNumber", bookingNumber);
        const bookingTicket = await Booking.findOne({bookingNumber});
        req.result = bookingTicket;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const queryBookingTickets = async(req,res,next)=>{
    const { bookingNum, email, guestFirstName,guestFamilyName,queryStartDate, queryEndDate, page = 1 } = req.query;
    const limit = 15;
    const skip = (page - 1) * limit;
    console.log("queryBookingTickets req.query ",req.query)
    let query = {};
    if (bookingNum) query.bookingNumber = bookingNum;
    if (email) query.email = email;
    if (guestFirstName) query.guestFirstName = guestFirstName;
    if (guestFamilyName) query.guestFamilyName = guestFamilyName;
    if (queryStartDate && queryEndDate) {
        query.$or = [
            { startDate: { $lte: new Date(queryEndDate) }, startDate: { $gte: new Date(queryStartDate) } }
        ];
    } else {
        if (queryStartDate) {
            query.startDate = { $gte: new Date(queryStartDate) };
        }
        if (queryEndDate) {
            query.startDate = { $lte: new Date(queryEndDate) };
        }
    }
    console.log("query API", query);
    try {
        const bookingTickets = await Booking.find(query)
                                    .sort({ createdAt: -1 }) 
                                    .limit(limit + 1)
                                    .skip(skip);
        const hasMore = bookingTickets.length > limit;
        if (hasMore) bookingTickets.pop();
        console.log("bookingTickets.length", bookingTickets.length);
        console.log("hasMore", hasMore);
        req.result = {
            bookingTickets: bookingTickets,
            hasMore: hasMore
        };
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}
export const getAvailableRooms = async (req, res, next) => {
    try {
        const { startDate, endDate, guestCount } = req.body;
        console.log("startDate", startDate);
        console.log("endDate", endDate);
        console.log("guestCount", guestCount);
        // change it to HausBeschreibung 03.17
        const availableHouses = await HausBeschreibung.find({
            guests: { $gte: guestCount }  
        });
        console.log("availableHouses",availableHouses)
        const activeBookings = await Booking.find({
            status: { $in: ['Active', 'CheckedIn'] },
            $or: [
                { 
                    startDate: { $lte: new Date(endDate) },  
                    endDate: { $gte: new Date(startDate) }   
                }
            ]
        });
        const updatedRooms = availableHouses.map(house => {
            let availableCount = house.availableCount;
            activeBookings.forEach(booking => {
                const bookingStartDate = new Date(booking.startDate);
                const bookingEndDate = new Date(booking.endDate);
                const requestedStartDate = new Date(startDate);
                const requestedEndDate = new Date(endDate);
                const overlap = (bookingStartDate <= requestedEndDate) && (bookingEndDate >= requestedStartDate);
                if (overlap && house.houseType === booking.houseType) {
                    availableCount -= 1;  
                }
            });
            return {//modifyed for hausbeschreibung
                houseType: house.houseType,
                pricePerNight: house.pricePerNight,
                images: house.images,
                title: house.title,
                description: house.description,
                title: house.title,
                guests :house.guests,
                bedrooms: house.bedrooms,
                bathroom: house.bathroom,
                availableCount: availableCount >= 0 ? availableCount : 0,
            };
        });
        console.log("updatedRooms",updatedRooms)
        req.result = updatedRooms.filter(room => room.availableCount > 0);
        if (req.result.length === 0) {
            return res.status(404).json({ message: "No available rooms found" });
        }
        next();  
    } catch (error) {
        console.log("Error in getAvailableRooms middleware:", error);
        next(error);
    }
};
export const createBookingMiddleware = async (req, res, next) => {
    try {
        const { guestCount, startDate, endDate, houseType, status } = req.body;
        if (!guestCount || !startDate || !endDate || !houseType || !status) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const newBooking = new Booking({
            bookingNumber: `BOOK${Math.floor(1000 + Math.random() * 9000)}`, 
            ...req.body
        });
        await newBooking.save();
        req.result = newBooking;
        next(); 
    } catch (error) {
        // console.error("Error creating booking:", error);
        // res.status(500).json({ message: "Internal Server Error" });
        console.log("Error in createBookingMiddleware middleware:", error);
        next(error);
    }
};

export const editBookingStatus = async(req,res,next)=>{
    const { bookingNumber } = req.params;
    const { status } = req.body;
    if (!['Active', 'Canceled', 'CheckedIn', 'CheckedOut'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status provided' });
    }
    try {
        console.log("GET request to editBookingStatus"); 
        const booking = await Booking.findOne({ bookingNumber });
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        booking.status = status;
        await booking.save();
        req.result = booking;
        next(); 
    } catch (error) {
        console.log(error);
        next(error);
    }
}
export const deleteBooking = async(req,res,next)=>{
    const { bookingNumber } = req.params;
    try {
        console.log("GET request to deleteBooking"); 
        const deletedBooking = await Booking.findOneAndDelete({ bookingNumber });

        if (!deletedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        req.result = bookingNumber;
        next(); 
    } catch (error) {
        console.log(error);
        next(error);
    }
}
export const bookingCheckin = async(req,res,next)=>{
    const bookingNum = req.bookingNum;
    const houseNum = req.houseNum;
    console.log("bookingCheckin",bookingNum,houseNum); 
    if (houseNum==="") {
        return res.status(400).json({ message: 'Invalid houseNum provided' });
    }
    try {
        console.log("PUT request to bookingCheckin"); 
        const filter =  { bookingNumber:bookingNum }; 
        console.log("bookingCheckin,bookingNum", bookingNum)
        let  updateData = {
            $set: {
                houseNum: houseNum,
                status: "CheckedIn"
            }
        };
        const booking = await Booking.updateOne(filter, updateData);
        console.log("bookingCheckin,booking", booking)
        req.bookingNum = bookingNum;
        req.houseNum = houseNum;
        next(); 
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const bookingCheckOut = async(req,res,next)=>{
    const bookingNum = req.bookingNum;
    console.log("bookingCheckOut",bookingNum); 
    try {
        console.log("bookingCheckOut"); 
        const filter =  { bookingNumber:bookingNum }; 
        let  updateData = {
            $set: {
                houseNum: "",
                status: "CheckedOut"
            }
        };
        const booking = await Booking.updateOne(filter, updateData);
        req.bookingNum = bookingNum;
        next(); 
    } catch (error) {
        console.log(error);
        next(error);
    }
};
