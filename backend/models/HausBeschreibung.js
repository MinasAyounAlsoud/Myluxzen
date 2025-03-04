import { Schema, model } from "mongoose";

const hausBeschreibungSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    images: [String],
    description: {
      type: String,
      required: true,
    },
    guests: Number,
    bedrooms: Number,
    livingRoom: Number,
    terrace: Number,
    toilet: Number,
    bathroom: Number,
    roomAmenities: {
      bathroomInfo: String,
      internetInfo: String,
      heatingInfo: String,
      kitchenInfo: String,
      entertainment: String,
      homeSafety: String,
    },
    pricePerNight: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    availability: [
      {
        date: String,
        isAvailable: Boolean,
      },
    ],
  },
  { timestamps: true }
);

export const HausBeschreibung = model(
  "HausBeschreibung",
  hausBeschreibungSchema
);
