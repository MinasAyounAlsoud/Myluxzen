import fs from "fs";
import { ObjectId } from 'mongodb';
import { connect } from "../utils/connect.js";
import { Booking } from "../models/bookingSchema.js";
import mongoose from "mongoose";
connect();
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const guestInfo = [
  { vorname: "Max", nachname: "Müller", email: "max.mueller@gmail.com" },
  { vorname: "Anna", nachname: "Schmidt", email: "anna.schmidt@yahoo.com" },
  { vorname: "Lukas", nachname: "Weber", email: "lukas.weber@outlook.com" },
  { vorname: "Sophia", nachname: "Koch", email: "sophia.koch@gmail.com" },
  { vorname: "Felix", nachname: "Bauer", email: "felix.bauer@hotmail.com" },
  { vorname: "Emma", nachname: "Wagner", email: "emma.wagner@yahoo.de" },
  { vorname: "Jonas", nachname: "Becker", email: "jonas.becker@gmail.com" },
  { vorname: "Laura", nachname: "Hoffmann", email: "laura.hoffmann@outlook.de" },
  { vorname: "Paul", nachname: "Schwarz", email: "paul.schwarz@web.de" },
  { vorname: "Mia", nachname: "Neumann", email: "mia.neumann@t-online.de" },
  { vorname: "Tom", nachname: "Schneider", email: "tom.schneider@gmail.com" }
];

const houseDetails = {
  'HouseType1': { guests: 8, pricePerNight: 1600, houseNums: [1010, 1020], houseTitle : "Strandhaus mit direktem Meerzugang" },
  'HouseType2': { guests: 6, pricePerNight: 1350, houseNums: [2010, 2020, 2030, 2040, 2050], houseTitle : "Gemütliche Berghütte mit Sauna"  },
  'HouseType3': { guests: 4, pricePerNight: 950, houseNums: [3010, 3020, 3030, 3040, 3050], houseTitle : "Luxuriöses Penthouse mit Dachterrasse"  },
  'HouseType4': { guests: 4, pricePerNight: 745, houseNums: [4010, 4020, 4030, 4040, 4050], houseTitle : "Moderne Strandvilla mit Pool"  },
  'HouseType5': { guests: 2, pricePerNight: 565, houseNums: [5010, 5020, 5030, 5040, 5050, 5060, 5070, 5080, 5090, 5100], houseTitle : "Modernes Loft"  }
};

const bookings = [];
const today = new Date();

for (let i = 0; i < 40; i++) {
  const startOffset = getRandomInt(-400, 90); // Random start date from 30 days ago to 30 days in the future
  const duration = getRandomInt(1, 28); // Duration between 1 to 14 days
  const startDate = new Date(today.getTime() + startOffset * 24 * 60 * 60 * 1000);
  const endDate = new Date(startDate.getTime() + duration * 24 * 60 * 60 * 1000);
  const totalDays = duration;

  const houseType = Object.keys(houseDetails)[getRandomInt(0, Object.keys(houseDetails).length - 1)];
  const details = houseDetails[houseType];
  const guestCount = getRandomInt(1, details.guests);
  const price = details.pricePerNight;
  const houseNums = details.houseNums;
  const houseTitle = details.houseTitle;

  let status = "CheckedOut";
  if (endDate < today) {
    status = getRandomInt(0, 9) < 1 ? 'Canceled' : 'CheckedOut'; // Mostly 'CheckedOut', rarely 'Canceled'
  } else if (startDate > today) {
    status = getRandomInt(0, 9) < 1 ? 'Canceled' : 'Active'; // Mostly 'Active', rarely 'Canceled'
  } else if (startDate <= today && endDate >= today) {
    status = 'CheckedIn';
  }
  const creationDate = new Date(Math.min(startDate.getTime() - getRandomInt(1, 10) * 24 * 60 * 60 * 1000, today.getTime()));
  const updateDate = new Date(Math.min(creationDate.getTime() + getRandomInt(1, 5) * 24 * 60 * 60 * 1000, today.getTime()));

  const booking = {
    _id: new ObjectId(),
    bookingNumber: `BOOK${getRandomInt(1000, 9999)}`,
    guestFirstName: guestInfo[i % guestInfo.length].vorname,
    guestFamilyName: guestInfo[i % guestInfo.length].nachname,
    email: guestInfo[i % guestInfo.length].email,
    guestCount,
    startDate,
    endDate,
    houseType,
    status,
    price,
    houseTitle,
    mobileNumber: "",
    comments: "",
    houseNum: houseNums[getRandomInt(0, houseNums.length - 1)],
    totalPrice: price * totalDays,
    totalDays,
    createdAt: creationDate,
    updatedAt: updateDate,
    __v: 0
  };

  bookings.push(booking);
}

fs.writeFileSync('bookings.json', JSON.stringify(bookings, null, 2));
const seedDB = async () => {
    try {
      await Booking.deleteMany();
      await Booking.insertMany(bookings);
      console.log("✅ Seed-Daten erfolgreich eingefügt!");
    } catch (error) {
      console.error("❌ Fehler beim Seeding:", error);
      mongoose.connection.close();
    }
  };
  
  seedDB();
