//Naheeda
import {User} from "../models/userSchema.js";
import { Booking } from "../models/bookingSchema.js";
import { generateToken } from "../utils/generateToken.js";

//  Hilfsfunktionen zur Validierung
const formatAndValidateName = (name) => {
    const regex = /^[A-Za-zÄÖÜäöüß\s-]+$/;  //Erlaubt nur Buchstaben, Leerzeichen & Bindestriche
    if (!regex.test(name)){
         throw new Error("Vorname und Nachname dürfen nur Buchstaben enthalten.");
    }
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();  //  Erster Buchstabe groß
};

const isValidPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
};

const isValidPhoneNumber = (phoneNumber) => {
    const regex = /^\d{6,15}$/;  //   Akzeptiert "+49..." oder "+123456789" (6-15 Ziffern nach "+")
    return regex.test(phoneNumber);
};

const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;   //Standard E-Mail-Format prüfen
    return regex.test(email);
};

// Benutzer registrieren
const registerUser = async (req, res, next) => {
    try {
        let { vorname, nachname, email, password } = req.body;

        // Überprüfen, ob alle Felder ausgefüllt sind
        if (!vorname || !nachname || !email || !password) {
            return next(new Error("Alle Felder (Vorname, Nachname, E-Mail, Passwort) sind erforderlich."));
        }

        // Namen formatieren und validieren
        vorname = formatAndValidateName(vorname);
        nachname = formatAndValidateName(nachname);

        // E-Mail-Validierung
        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Ungültige E-Mail-Adresse. Bitte eine gültige Adresse eingeben." });
        }

        // Passwort-Validierung
        if (!isValidPassword(password)) {
            return res.status(400).json({ 
                message: "Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten."
            });
        }

        // Prüfen, ob der Benutzer bereits existiert
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Diese E-Mail-Adresse wird bereits verwendet." });
        }

        // Neuen Benutzer erstellen
        const user = await User.create({ vorname, nachname, email, password });

        if (user) {
            // Token generieren
            const token = generateToken(user._id);

            // Cookie setzen
            res.cookie("jwt", token, { 
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30 Tage
            });

            // Erfolgreiche Registrierung
            return res.status(201).json({
                _id: user.id,
                vorname: user.vorname,
                nachname: user.nachname,
                email: user.email,
                token: token
            });
        }

        // Falls `user` aus irgendeinem Grund `null` oder `undefined` ist (was selten passiert)
        return res.status(500).json({ message: "Fehler beim Erstellen des Benutzers. Bitte später erneut versuchen." });

    } catch (error) {
        next(error);
    }
};


//  Benutzer Login
const authUser = async (req, res, next) => {
    console.log(" Eingehende Login-Daten:", req.body); // ✅ Debugging
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            console.log(" Fehlende Daten beim Login:", req.body);
            return res.status(400).json({ message: "Bitte E-Mail und Passwort eingeben." });
        }

        const user = await User.findOne({ email });

        if (!user || !(await user.matchPassword(password))) {
            console.log("Falsche Login-Daten für:", email);
            return res.status(400).json({ message: "E-Mail oder Passwort ist falsch." });
        }
        console.log("✅ Erfolgreicher Login:", user.email);
        const token = generateToken(user._id);
        res.cookie("jwt", token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production", 
        sameSite: "strict",
         maxAge: 30 * 24 * 60 * 60 * 1000
         });
        res.status(201).json({ 
            _id: user.id, 
            vorname: user.vorname, 
            nachname: user.nachname, 
            email: user.email,
            isAdmin: user.isAdmin,
            token:token
            });
    } catch (error) {
        next(error);
    }
};

// Benutzer Logout
const logoutUser = (req, res, next) => {
    try {
        res.cookie("jwt", "", { 
            httpOnly: true, 
            expires: new Date(0) 
        });
        res.json({ message: "Logout erfolgreich" });
    } catch (error) {
        next(error);
    }
};
//  Benutzerprofil abrufen
const getUserProfile = async (req, res, next) => {
    try {
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
    } catch (error) {
        next(error);
    }
};


// Benutzerprofil aktualisieren
const updateUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            console.log(" Benutzer nicht gefunden!");
            return res.status(404).json({ message: "Benutzer nicht gefunden" });
        }
    

      // Falls Vorname übergeben wird, validieren & formatieren
      if (req.body.vorname) {
        req.body.vorname = formatAndValidateName(req.body.vorname);

    }
    if (req.body.nachname) {
        req.body.nachname = formatAndValidateName(req.body.nachname);
    }
    if (req.body.email && !isValidEmail(req.body.email)) {
        res.status(400);
        throw new Error("Ungültige E-Mail-Adresse! Bitte ein gültiges Format verwenden.");
    }
    if (req.body.telefonnummer && !isValidPhoneNumber(req.body.telefonnummer)) {
        res.status(400);
        throw new Error("Ungültige Telefonnummer! Sie darf nur Zahlen enthalten ");
    }

        Object.assign(user, req.body);
        const updatedUser = await user.save();
        res.json({ message: "Profil aktualisiert.", user: updatedUser });
    } catch (error) {
        next(error);
    }
};

//  Alle Buchungen des eingeloggten Nutzers abrufen
const getUserBookings = async (req, res, next) => {
    try {
        if (!req.user || !req.user.email) {
            return res.status(401).json({ message: "Nicht autorisiert! Bitte erneut einloggen." });
        }

        console.log("📡 Suche Buchungen für:", req.user.email); // Debugging-Log

        const bookings = await Booking.find({ email: req.user.email });

        if (!bookings.length) {
            return res.status(200).json([]); // ✅ Leeres Array statt Fehler senden
        }

        res.status(200).json(bookings);
    } catch (error) {
        console.error(" Fehler beim Abrufen der Buchungen:", error.message);
        res.status(500).json({ message: "Interner Serverfehler beim Laden der Buchungen" });
    }
};

//  Buchung stornieren
const cancelUserBooking = async (req, res, next) => {
    try {
        const { bookingNumber } = req.params;
        const booking = await Booking.findOne({ bookingNumber });

        if (!booking) {
            return res.status(404).json({ message: "Buchung nicht gefunden." });
        }
       // Überprüfung: Gehört die Buchung dem eingeloggten Nutzer?
       if (booking.email !== req.user.email) {
        return res.status(403).json({ message: "Du kannst nur deine eigenen Buchungen stornieren!" });
    }

        booking.status = "Canceled";
        await booking.save();

        res.status(200).json({ message: "Buchung storniert.", booking });
    } catch (error) {
        next(error);
    }
};

const adminCheck = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next(); //  Admin erlaubt
    } else {
        res.status(403).json({ message: " Zugriff verweigert. Nur für Admins." });
    }
};

export { registerUser, authUser, logoutUser, getUserProfile, updateUserProfile, getUserBookings, cancelUserBooking, adminCheck  };
