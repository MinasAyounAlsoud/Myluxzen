import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
    let token = req.cookies.jwt; // Token aus Cookies holen

    if (!token) {
        res.status(401);
        throw new Error("Nicht autorisiert, kein Token gefunden");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //  Token entschlüsseln
        req.user = await User.findById(decoded.id).select("-password");
        if (!req.user) {
            console.log("❌ Kein Benutzer gefunden!");
            return res.status(401).json({ message: "Nicht autorisiert, Benutzer existiert nicht" });
        }

        console.log("✅ Authentifiziert:", req.user.email);
        next();
    } catch (error) {
        console.log("❌ Fehler bei Token-Überprüfung:", error.message);
        return res.status(401).json({ message: "Nicht autorisiert, ungültiges Token" });
    }
});

export default protect;