import { connect } from "../utils/connect.js";
import { HausBeschreibung } from "../models/HausBeschreibung.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
connect();
const houses = [
  {
    title: "Moderne Strandvilla mit Pool",
    images: [
      "http://localhost:3000/images/Apartment01.jpg",
      "http://localhost:3000/images/Apartment01-01.jpg",
      "http://localhost:3000/images/Apartment01-02.jpg",
      "http://localhost:3000/images/Apartment01-03.jpg",
      "http://localhost:3000/images/Apartment01-04.jpg",
      "http://localhost:3000/images/Apartment01-05.jpg",
      "http://localhost:3000/images/Apartment01-06.jpg",
      "http://localhost:3000/images/Apartment01-07.jpg",
      "http://localhost:3000/images/Apartment01-08.jpg",
    ],
    description:
      "Diese moderne Villa bietet direkten Zugang zum Strand, einen Infinity-Pool und stilvolle Innenräume für einen entspannten Aufenthalt. Großzügige Fenster lassen viel Tageslicht hinein und bieten einen wunderschönen Blick aufs Meer. Die Ausstattung umfasst eine Designer-Küche, Smart-Home-Technologie und luxuriöse Badezimmer mit Whirlpool.",
    guests: 6,
    bedrooms: 3,
    livingRoom: 1,
    terrace: 1,
    toilet: 2,
    bathroom: 2,
    roomAmenities: {
      bathroomInfo: "Whirlpool, Regendusche, Luxus-Pflegeprodukte",
      internetInfo: "High-Speed WLAN (500 Mbit/s)",
      heatingInfo: "Fußbodenheizung & Klimaanlage",
      kitchenInfo: "Moderne Einbauküche mit Weinkühler",
      entertainment: "65'' Smart-TV, Netflix, Soundsystem",
      homeSafety: "Alarmanlage, Safe, Videoüberwachung",
    },
    pricePerNight: 350,
    location: "Mallorca, Spanien",
    availability: [{ date: "2025-06-15", isAvailable: true }],
  },
  {
    title: "Gemütliche Berghütte mit Sauna",
    images: [
      "http://localhost:3000/images/Apartment02.jpg",
      "http://localhost:3000/images/Apartment02-01.jpg",
      "http://localhost:3000/images/Apartment02-02.jpg",
      "http://localhost:3000/images/Apartment02-03.jpg",
      "http://localhost:3000/images/Apartment02-04.jpg",
      "http://localhost:3000/images/Apartment02-05.jpg",
      "http://localhost:3000/images/Apartment02-06.jpg",
      "http://localhost:3000/images/Apartment02-07.jpg",
      "http://localhost:3000/images/Apartment02-08.jpg",
    ],
    description:
      "Rustikale Berghütte mit Kamin, privater Sauna und einem spektakulären Blick auf die Berge. Die Hütte ist liebevoll mit Holzmöbeln eingerichtet und verfügt über eine große Terrasse zum Entspannen. Eine moderne Küche, kuschelige Schlafräume und eine Fußbodenheizung sorgen für maximalen Komfort.",
    guests: 5,
    bedrooms: 2,
    livingRoom: 1,
    terrace: 1,
    toilet: 2,
    bathroom: 2,
    roomAmenities: {
      bathroomInfo: "Wellness-Dusche, Bademäntel",
      internetInfo: "WLAN & Smart-Home-Steuerung",
      heatingInfo: "Holzofen & elektrische Heizung",
      kitchenInfo: "Rustikale Holzküche mit Espressomaschine",
      entertainment: "Brettspiele, Bücher, Beamer mit Leinwand",
      homeSafety: "Rauchmelder, Erste-Hilfe-Set",
    },
    pricePerNight: 250,
    location: "Tirol, Österreich",
    availability: [{ date: "2025-07-10", isAvailable: true }],
  },
  {
    title: "Luxuriöses Penthouse mit Dachterrasse",
    images: [
      "http://localhost:3000/images/Apartment03.jpg",
      "http://localhost:3000/images/Apartment03-01.jpg",
      "http://localhost:3000/images/Apartment03-02.jpg",
      "http://localhost:3000/images/Apartment03-03.jpg",
      "http://localhost:3000/images/Apartment03-04.jpg",
      "http://localhost:3000/images/Apartment03-05.jpg",
      "http://localhost:3000/images/Apartment03-06.jpg",
      "http://localhost:3000/images/Apartment03-07.jpg",
      "http://localhost:3000/images/Apartment03-08.jpg",
    ],
    description:
      "Elegantes Penthouse mit Panoramablick, privatem Whirlpool auf der Terrasse und hochwertiger Ausstattung. Die bodentiefen Fenster sorgen für ein helles Ambiente und bieten eine atemberaubende Aussicht. Die moderne Küche mit Induktionskochfeld und das elegante Badezimmer mit Regendusche runden das luxuriöse Erlebnis ab.",
    guests: 6,
    bedrooms: 2,
    livingRoom: 2,
    terrace: 1,
    toilet: 2,
    bathroom: 2,
    roomAmenities: {
      bathroomInfo: "Freistehende Badewanne mit Skyline-Blick",
      internetInfo: "Glasfaser-Internet (1 Gbit/s)",
      heatingInfo: "Klimaanlage & elektrische Fußbodenheizung",
      kitchenInfo: "Designerküche mit Induktionskochfeld",
      entertainment: "Dolby Atmos Soundsystem, Apple TV",
      homeSafety: "Smart Lock, 24/7 Concierge",
    },
    pricePerNight: 500,
    location: "Berlin, Deutschland",
    availability: [{ date: "2025-08-01", isAvailable: true }],
  },
  {
    title: "Strandhaus mit direktem Meerzugang",
    images: [
      "http://localhost:3000/images/Apartment04.jpg",
      "http://localhost:3000/images/Apartment04-01.jpg",
      "http://localhost:3000/images/Apartment04-02.jpg",
      "http://localhost:3000/images/Apartment04-03.jpg",
      "http://localhost:3000/images/Apartment04-04.jpg",
      "http://localhost:3000/images/Apartment04-05.jpg",
      "http://localhost:3000/images/Apartment04-06.jpg",
      "http://localhost:3000/images/Apartment04-07.jpg",
      "http://localhost:3000/images/Apartment04-08.jpg",
    ],
    description:
      "Wunderschönes Strandhaus mit großer Sonnenterrasse, privatem Zugang zum Meer und traumhaftem Ausblick. Genießen Sie Ihren Morgenkaffee mit Blick auf den Ozean oder verbringen Sie entspannte Nachmittage in der Hängematte. Das Haus bietet großzügige Wohnbereiche, eine offene Küche und komfortable Schlafzimmer für die ganze Familie.",
    guests: 8,
    bedrooms: 4,
    livingRoom: 1,
    terrace: 2,
    toilet: 3,
    bathroom: 3,
    roomAmenities: {
      bathroomInfo: "Doppelwaschbecken, Regendusche",
      internetInfo: "WLAN, Bluetooth-Lautsprecher",
      heatingInfo: "Klimaanlage & Sonnenschutz",
      kitchenInfo: "Offene Küche mit Meerblick",
      entertainment: "Strandspiele, Kajaks, Smart-TV",
      homeSafety: "Erste-Hilfe-Set, Feuerlöscher",
    },
    pricePerNight: 600,
    location: "Bali, Indonesien",
    availability: [{ date: "2025-09-15", isAvailable: true }],
  },
  {
    title: "Modernes Loft im Stadtzentrum",
    images: [
      "http://localhost:3000/images/Apartment05.jpg",
      "http://localhost:3000/images/Apartment05-01.jpg",
      "http://localhost:3000/images/Apartment05-02.jpg",
      "http://localhost:3000/images/Apartment05-03.jpg",
      "http://localhost:3000/images/Apartment05-04.jpg",
      "http://localhost:3000/images/Apartment05-05.jpg",
      "http://localhost:3000/images/Apartment05-06.jpg",
      "http://localhost:3000/images/Apartment05-07.jpg",
      "http://localhost:3000/images/Apartment05-08.jpg",
    ],
    description:
      "Elegantes Loft mit offener Raumgestaltung, moderner Einrichtung und Balkon mit Blick auf die Stadt. Hohe Decken, große Fenster und stilvolle Möbel verleihen dem Apartment ein einzigartiges Flair. Die voll ausgestattete Küche, das gemütliche Schlafzimmer und die zentrale Lage machen es perfekt für Städtereisende und Geschäftsleute.",
    guests: 5,
    bedrooms: 2,
    livingRoom: 1,
    terrace: 1,
    toilet: 2,
    bathroom: 2,
    roomAmenities: {
      bathroomInfo: "Marmorbad mit Goldarmaturen",
      internetInfo: "WLAN in allen Räumen",
      heatingInfo: "Kamin & Zentralheizung",
      kitchenInfo: "Landhausküche mit Steinofen",
      entertainment: "Weinverkostungen, Klavier",
      homeSafety: "Wachdienst, Sicherheitstor",
    },
    pricePerNight: 200,
    location: "Toskana, Italien",
    availability: [{ date: "2025-10-20", isAvailable: true }],
  },
];

const seedDB = async () => {
  try {
    await HausBeschreibung.deleteMany();
    await HausBeschreibung.insertMany(houses);
    console.log("✅ Seed-Daten erfolgreich eingefügt!");
  } catch (error) {
    console.error("❌ Fehler beim Seeding:", error);
    mongoose.connection.close();
  }
};

seedDB();
