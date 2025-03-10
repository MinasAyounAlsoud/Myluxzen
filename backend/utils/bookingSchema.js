import mongoose  from "mongoose";


const bookingSchema = new mongoose.Schema({
    bookingNumber: { type: String },
    guestFirstName: { type: String },
    guestFamilyName: { type: String },
    email: { type: String, required: true },  // ✅ Benutzer wird über Email verknüpft
    guestCount: { type: Number },
    mobileNumber: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    houseType: { type: String },
    status: { 
        type: String, 
        enum: ['Active', 'Canceled', 'CheckedIn', 'CheckedOut'],
        required: true  
    },
    bookingDay: { type: String },
    price: { type: Number },
    comments: { type: String },
});

const houseSchema = new mongoose.Schema({
    housegId: { type: String},
    houseType: { type: String},
    guestCount: { type: Number},
    availableCount: { type: Number},
    price: { type: Number},
});



export const Booking = mongoose.model("booking", bookingSchema, "booking");

export const House = mongoose.model("house", houseSchema, "house");