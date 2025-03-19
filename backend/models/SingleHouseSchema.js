import mongoose  from "mongoose";
const { Schema, model } = mongoose;
const singleHouseSchema = new mongoose.Schema({
    houseNum: { type: String, required: true },
    houseType: { type: String, 
        enum: ['HouseType1', 'HouseType2', 'HouseType3', 'HouseType4', 'HouseType5'],  
        required: true  
    },    
    hausBeschreibung: {
        type: Schema.Types.ObjectId,
        ref: 'HausBeschreibung'
    },
    bookingNum: { type: String},
    guestName: [{ type: String}],
    isAvailable: { type: Boolean},
});

export const SingleHouse = mongoose.model("singleHouse", singleHouseSchema, "singleHouse");