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
        next();
    } catch (error) {
        res.status(401);
        throw new Error("Nicht autorisiert, ungültiges Token");
    }
});

export default protect;
