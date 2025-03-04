// controllers/authController.js (Benutzer-Authentifizierung mit Passwort-Validierung & Logout)
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// Passwort-Validierung
const isValidPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
};

// Benutzer registrieren
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    
    if (!isValidPassword(password)) {
        res.status(400);
        throw new Error('Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten.');
    }
    
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "Diese E-Mail-Adresse wird bereits verwendet." });
    }
    
    const user = await User.create({ name, email, password });
    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Ungültige Benutzerdaten');
    }
});

// Benutzer Login
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.cookie("jwt", generateToken(user._id), {
            httpOnly: true, // ✅ Sicherstellen, dass das Cookie nur vom Server gelesen wird
            secure: process.env.NODE_ENV === "production", // ✅ In Production HTTPS aktivieren
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000, // ✅ 30 Tage gültig
        });

        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(401);
        throw new Error("Ungültige Email oder Passwort");
    }
});

// Benutzer Logout
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.json({ message: 'Logout erfolgreich' });
});


// Benutzerinformationen abrufen

const getUserProfile = asyncHandler(async (req, res) => {
    if (!req.user) {
        res.status(401);
        throw new Error("Nicht autorisiert");
    }

    res.json({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        vorname: req.user.vorname, 
        nachname: req.user.nachname, 
        telefonnummer: req.user.telefonnummer,
        landesvorwahl: req.user.landesvorwahl, 
        address: {
            land: req.user.address?.land || "",
            straße: req.user.address?.straße || "",
            snummer: req.user.address?.snummer || "",
            stadt: req.user.address?.stadt || "",
            postleitzahl: req.user.address?.postleitzahl || "",
        },
    });
});

// 🔹 Benutzerprofil aktualisieren
const updateUserProfile = asyncHandler(async (req, res) => {

        const user = await User.findById(req.user._id);
    
        if (user) {
            // Persönliche Daten aktualisieren
            user.name = req.body.name || user.name;
            user.vorname = req.body.vorname || user.vorname;
            user.nachname = req.body.nachname || user.nachname;
            user.email = req.body.email || user.email;
            user.telefonnummer = req.body.telefonnummer || user.telefonnummer;
            user.landesvorwahl = req.body.landesvorwahl || user.landesvorwahl;
    
            // Adresse aktualisieren
            user.address = {
                land: req.body.address?.land || user.address?.land || "",
                straße: req.body.address?.straße || user.address?.straße || "",
                snummer: req.body.address?.snummer || user.address?.snummer || "",
                stadt: req.body.address?.stadt || user.address?.stadt || "",
                postleitzahl: req.body.address?.postleitzahl || user.address?.postleitzahl || "",
            };
    
            const updatedUser = await user.save();
    
            res.json({
                message: "Benutzer erfolgreich aktualisiert",
                user: {
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    vorname: updatedUser.vorname,
                    nachname: updatedUser.nachname,
                    email: updatedUser.email,
                    telefonnummer: updatedUser.telefonnummer,
                    landesvorwahl: updatedUser.landesvorwahl,
                    address: updatedUser.address,
                }
            });
        } else {
            res.status(404);
            throw new Error("Benutzer nicht gefunden");
        }
    });

    
export { registerUser, authUser, logoutUser, getUserProfile, updateUserProfile };