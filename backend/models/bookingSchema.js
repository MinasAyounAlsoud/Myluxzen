import mongoose  from "mongoose";

const bookingSchema = new mongoose.Schema({
    bookingNumber: { type: String },
    guestFirstName: { type: String, required: true },
    guestFamilyName: { type: String, required: true },
    email: {
        type: String,
        // select: false,
    },
    guestCount : { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    houseType: { type: String, 
        enum: ['House Type 1', 'House Type 2', 'House Type 3', 'House Type 4', 'House Type 5'],  
        required: true  
    },
    status:  { type: String, 
        enum: ['Active', 'Canceled', 'CheckedIn', 'CheckedOut'], 
        required: true  
    },
    price: { type: Number, required: true },
    mobileNumber: { type: String },
    comments:{ type: String },
},
{ timestamps: true });


const houseSchema = new mongoose.Schema({
    housegId: { type: String},
    houseType: { type: String},
    guestCount: { type: Number},
    availableCount: { type: Number},
    price: { type: Number},
});

const singleHouseSchema = new mongoose.Schema({
    housegNum: { type: String},
    houseType: { type: String},
    price: { type: Number},
});



export const Booking = mongoose.model("booking", bookingSchema, "booking");

export const House = mongoose.model("house", houseSchema, "house");