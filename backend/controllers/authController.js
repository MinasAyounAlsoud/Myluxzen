// controllers/authController.js (Benutzer-Authentifizierung mit Passwort-Validierung & Logout)
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import  {Booking}  from '../utils/bookingSchema.js';
import generateToken from '../utils/generateToken.js';


//  Hilfsfunktion: Name validieren & formatieren (Vorname & Nachname)
const formatAndValidateName = (name) => {
    const regex = /^[A-Za-zÄÖÜäöüß\s-]+$/;  // ✅ Erlaubt nur Buchstaben, Leerzeichen & Bindestriche
    if (!regex.test(name)) {
        throw new Error("Vorname und Nachname dürfen nur Buchstaben enthalten.");
    }
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(); // 🔹 Erster Buchstabe groß
};
// Passwort-Validierung
const isValidPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
};
const isValidPhoneNumber = (phoneNumber) => {
    const regex = /^\d{6,15}$/; // ✅ Akzeptiert "+49..." oder "+123456789" (6-15 Ziffern nach "+")
    return regex.test(phoneNumber);
};

// 🔹 E-Mail-Validierung
const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // ✅ Standard E-Mail-Format prüfen
    return regex.test(email);
};


// Benutzer registrieren
const registerUser = asyncHandler(async (req, res) => {
    let { vorname, nachname, email, password } = req.body;

    // 🔹 Validierung
    if (!vorname || !nachname || !email || !password) {
        res.status(400);
        throw new Error("Alle Felder (Vorname, Nachname, E-Mail, Passwort) sind erforderlich.");
    }
     //  Vor/Nach name validieren
    try {
        vorname = formatAndValidateName(vorname);
        nachname = formatAndValidateName(nachname);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
     //  E-Mail validieren
     if (!isValidEmail(email)) {
        return res.status(400).json({ message: "Ungültige E-Mail-Adresse. Bitte eine gültige Adresse eingeben." });
    }
    if (!isValidPassword(password)) {
        res.status(400);
        throw new Error('Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten.');
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "Diese E-Mail-Adresse wird bereits verwendet." });
    }

    // 🔹 Neuen Benutzer erstellen
    const user = await User.create({ vorname, nachname, email, password });

    if (user) {
        res.status(201).json({
            _id: user.id,
            vorname: user.vorname,
            nachname: user.nachname,
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
            vorname: user.vorname,
            nachname: user.nachname,
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
            vorname: req.user.vorname,
            nachname: req.user.nachname,
            email: req.user.email,
            telefonnummer: req.user.telefonnummer,
            landesvorwahl: req.user.landesvorwahl,
            address: req.user.address,
        });
    });
// 🔹 Benutzerprofil aktualisieren
const updateUserProfile = asyncHandler(async (req, res) => {
    console.log("📌 Update-Profil: Request erhalten");
    console.log("🔹 Eingehende Daten:", req.body);

    // Benutzer aus der Datenbank suchen
    const user = await User.findById(req.user._id);

    if (!user) {
        console.log("❌ Benutzer nicht gefunden!");
        return res.status(404).json({ message: "Benutzer nicht gefunden" });
    }

    console.log("✅ Benutzer gefunden:", user.email);

    try {
        // Falls Vorname übergeben wird, validieren & formatieren
        if (req.body.vorname) {
            req.body.vorname = formatAndValidateName(req.body.vorname);
            console.log("✅ Neuer Vorname:", req.body.vorname);
        }

        // Falls Nachname übergeben wird, validieren & formatieren
        if (req.body.nachname) {
            req.body.nachname = formatAndValidateName(req.body.nachname);
            console.log("✅ Neuer Nachname:", req.body.nachname);
        }

        // 🔹 E-Mail validieren
        if (req.body.email && !isValidEmail(req.body.email)) {
            res.status(400);
            throw new Error("Ungültige E-Mail-Adresse! Bitte ein gültiges Format verwenden.");
        }
                 // 🔹 Telefonnummer validieren
        if (req.body.telefonnummer && !isValidPhoneNumber(req.body.telefonnummer)) {
            res.status(400);
            throw new Error("Ungültige Telefonnummer! Sie darf nur Zahlen enthalten ");
        }

            // Persönliche Daten aktualisieren
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
            console.log("📌 Speichere Benutzer...");
            const updatedUser = await user.save();
            console.log("✅ Benutzer erfolgreich gespeichert:", updatedUser);
            res.json({
                message: "Benutzer erfolgreich aktualisiert",
                user: {
                    _id: updatedUser._id,
                    vorname: updatedUser.vorname,
                    nachname: updatedUser.nachname,
                    email: updatedUser.email,
                    telefonnummer: updatedUser.telefonnummer,
                    landesvorwahl: updatedUser.landesvorwahl,
                    address: updatedUser.address,
                }
            });
        } catch (error) {
            console.log("❌ Fehler beim Speichern:", error);
            return res.status(500).json({ message: "Interner Serverfehler" });
        }
    });
/**
 * 🔹 Alle Buchungen des eingeloggten Nutzers abrufen
 */
const getUserBookings = asyncHandler(async (req, res) => {
    try {
        const bookings = await Booking.find({ email: req.user.email });
        console.log("🛠 User:", req.user);

        if (!bookings.length) {
            return res.status(404).json({ message: "Keine Buchungen gefunden" });
        }

        res.status(200).json(bookings);
    } catch (error) {
        console.error("Fehler beim Abrufen der Buchungen:", error);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

/**
 * 🔹 Storniere eine Buchung, wenn sie dem eingeloggten Benutzer gehört
 */
const cancelUserBooking = asyncHandler(async (req, res) => {
    try {
        const { bookingNumber } = req.params;

        // ✅ Stelle sicher, dass die Buchung existiert
        const booking = await Booking.findOne({ bookingNumber });

        if (!booking) {
            return res.status(404).json({ message: "Buchung nicht gefunden." });
        }

        // ✅ Überprüfung: Gehört die Buchung dem eingeloggten Nutzer?
        if (booking.email !== req.user.email) {
            return res.status(403).json({ message: "Du kannst nur deine eigenen Buchungen stornieren!" });
        }

        // ✅ Status auf "Canceled" setzen
        booking.status = "Canceled";
        await booking.save();

        res.status(200).json({ message: "Buchung erfolgreich storniert", booking });
    } catch (error) {
        console.error("Fehler beim Stornieren:", error);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

export { 
    registerUser, 
    authUser, 
    logoutUser, 
    getUserProfile, 
    updateUserProfile,
    getUserBookings,
    cancelUserBooking
};