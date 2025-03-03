// config/db.js (MongoDB Verbindung)
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
        });
        console.log(`MongoDB verbunden: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Fehler: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
