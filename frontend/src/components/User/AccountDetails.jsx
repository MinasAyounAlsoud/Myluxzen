import { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";

const countryCodes = [
    { code: "+49", name: "Deutschland" },
    { code: "+1", name: "USA" },
]

const AccountDetails = () => {
    const { user, setUser } = useContext(AuthContext);
    const [editingFields, setEditingFields] = useState({}); 
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");

    const [formData, setFormData] = useState({
        vorname: "",
        nachname: "",
        email: "",
        telefonnummer: "",
        landesvorwahl: "+49", // Standardwert
        address: {  //  Address als Standard-Objekt setzen
            land: "",
            straße: "",
            snummer: "",
            stadt: "",
            postleitzahl: "",
        },
    });

    // **Daten beim Start aus Backend laden**
   
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/auth/me", {
                    method: "GET",
                    credentials: "include",
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                    setFormData(userData);
                } else {
                    console.error("Fehler beim Laden der Benutzerdaten.");
                }
            } catch (error) {
                console.error("Fehler beim Abrufen der Benutzerdaten:", error);
            }
        };

        if (!user?.vorname || !user?.nachname || !user?.telefonnummer) {
            fetchUserProfile();
        }
    }, [setUser]);

    
    const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name.startsWith("address.")) {
            const field = name.split(".")[1]; // "address.land" → "land"
            setFormData((prevData) => ({
                ...prevData,
                address: { 
                    ...prevData.address, 
                    [field]: value 
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };
    
    const validateFields = () => {
        let newErrors = {};

        // Vorname & Nachname: nur Buchstaben erlaubt
        const nameRegex = /^[A-Za-zÄÖÜäöüß\s-]+$/;
        if (!nameRegex.test(formData.vorname)) {
            newErrors.vorname = "Vorname darf nur Buchstaben enthalten.";
        }
        if (!nameRegex.test(formData.nachname)) {
            newErrors.nachname = "Nachname darf nur Buchstaben enthalten.";
        }

        // Telefonnummer: nur Zahlen erlaubt
        const phoneRegex = /^\d{6,15}$/;
        if (!phoneRegex.test(formData.telefonnummer)) {
            newErrors.telefonnummer = "Telefonnummer darf nur Zahlen enthalten.";
        }

        // E-Mail Validierung
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = "Bitte eine gültige E-Mail-Adresse eingeben.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        setErrors({});
        setSuccessMessage("");
        if (!validateFields()) {
            console.error("❌ Validierungsfehler:", errors);
            return; // Stoppe das Speichern, wenn Fehler vorhanden sind
        }

        try {
            const response = await fetch("http://localhost:3000/api/auth/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data.user);
                setFormData(data.user);
                setEditingFields({});
                setSuccessMessage("Deine Änderungen wurden erfolgreich gespeichert!");

                setTimeout(() => setSuccessMessage(""), 3000);
            } else {
                setErrors(data.errors || { general: data.message || "Fehler beim Speichern." });
            }
        } catch (error) {
            console.error("Fehler beim Speichern:", error);
            setErrors({ general: "Serverfehler, bitte später erneut versuchen." });
        }
    };

    
    const handleCancel = (field) => {
        setFormData(user); // ✅ Ursprüngliche Werte aus `user` wiederherstellen
        setEditingFields((prev) => ({ ...prev, [field]: false })); // ✅ Bearbeitungsfeld schließen
    };
    

    return (
        /*
        <div className="max-w-4xl mx-auto px-8 md:px-12 lg:px-16 py-8 bg-white shadow-lg rounded-2xl space-y-4">
        */
        <div className="max-w-5xl mx-auto p-8 bg-white shadow-md rounded-lg space-y-4">

        
      
    <h2 className="text-4xl font-semibold mb-15  text-[#0e5756] text-center"
        style={{ fontFamily: 'Merriweather, serif' }} >
         Persönliche Daten
         </h2>
  {/* 1️⃣ Vorname */}
 <div className="p-6 bg-gray-50 shadow-md rounded-xl">
    <h2 className="text-xl font-semibold text-[#0e5756]"  style={{ fontFamily: 'Merriweather, serif' }}>Vorname</h2>

    {editingFields.vorname ? (
        <>
            <input
                type="text"
                name="vorname"
                placeholder="Vorname"
                value={formData.vorname}
                onChange={handleChange}
                className="w-full bg-white p-3 text-gray-600 rounded-md border border-gray-300 mt-2 focus:border-[#116769] focus:outline-none shadow-sm"
            />
            {errors.vorname && <p className="text-[#9C785E] text-sm mt-1">{errors.vorname}</p>}

            {/* ✅ Buttons: Speichern angepasst, Abbrechen bleibt unverändert */}
            <div className="flex justify-between mt-3">
                <button 
                    onClick={handleSave} 
                    className="px-4 py-2 bg-[#116769] text-white border border-[#0e5756] rounded-md hover:bg-[#0e5756] transition duration-200"
                >
                    Speichern
                </button>
                <button 
                    onClick={() => handleCancel("vorname")} 
                    className="text-gray-600 hover:underline"
                >
                    Abbrechen
                </button>
            </div>
        </>
    ) : (
        <div className="flex justify-between mt-3">
            <p className="text-gray-600">{user?.vorname || "Kein Benutzername angegeben"}</p>

            {/* ✅ Bearbeiten-Button jetzt in der gleichen Farbe wie h2 in der Buchungsseite */}
            <button 
                onClick={() => setEditingFields({ vorname: true })} 
                 className="text-[#0e5756] hover:text-[#116769] font-medium transition duration-200 cursor-pointer hover:underline "
            >
                Bearbeiten
            </button>
        </div>
    )}
</div>

    {/* 2️⃣ Name (Nachname) */}
<div className="p-6 bg-gray-50 shadow-md rounded-xl">
    <h2 className="text-xl font-semibold text-[#0e5756]" style={{ fontFamily: 'Merriweather, serif' }}>
        Nachname
    </h2>

    {editingFields.nachname ? (
        <>
            <input
                type="text"
                name="nachname"
                placeholder="Nachname"
                value={formData.nachname}
                onChange={handleChange}
                className="w-full bg-white p-3 text-gray-600 rounded-md border border-gray-300 mt-2 focus:border-[#116769] focus:outline-none shadow-sm"
            />
            {errors.nachname && <p className="text-[#9C785E] text-sm mt-1">{errors.nachname}</p>}

            {/* ✅ Buttons: Speichern & Abbrechen */}
            <div className="flex justify-between mt-3">
                <button 
                    onClick={handleSave} 
                    className="px-4 py-2 bg-[#116769] text-white border border-[#0e5756] rounded-md hover:bg-[#0e5756] transition duration-200"
                >
                    Speichern
                </button>
                <button 
                    onClick={() => handleCancel("nachname")} 
                    className="text-gray-600 hover:underline"
                >
                    Abbrechen
                </button>
            </div>
        </>
    ) : (
        <div className="flex justify-between mt-3">
            <p className="text-gray-600">{user?.nachname || "Kein Nachname angegeben"}</p>

            {/* ✅ Bearbeiten-Button angepasst */}
            <button 
                onClick={() => setEditingFields({ nachname: true })} 
                className="text-[#0e5756] hover:text-[#116769] font-medium transition duration-200 cursor-pointer hover:underline"
            >
                Bearbeiten
            </button>
        </div>
    )}
</div>

    
      {/* 3️⃣ E-Mail Adresse */}
<div className="p-6 bg-gray-50 shadow-md rounded-xl">
    <h2 className="text-xl font-semibold text-[#0e5756]" style={{ fontFamily: 'Merriweather, serif' }}>
        E-Mail Adresse
    </h2>

    {editingFields.email ? (
        <>
            <input
                type="email"
                name="email"
                placeholder="E-Mail eingeben"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white p-3 text-gray-600 rounded-md border border-gray-300 mt-2 focus:border-[#116769] focus:outline-none shadow-sm"
            />
            {errors.email && <p className="text-[#9C785E] text-sm mt-1">{errors.email}</p>}

            {/* ✅ Buttons: Speichern & Abbrechen */}
            <div className="flex justify-between mt-3">
                <button 
                    onClick={handleSave} 
                    className="px-4 py-2 bg-[#116769] text-white border border-[#0e5756] rounded-md hover:bg-[#0e5756] transition duration-200"
                >
                    Speichern
                </button>
                <button 
                    onClick={() => handleCancel("email")} 
                    className="text-gray-600 hover:underline"
                >
                    Abbrechen
                </button>
            </div>
        </>
    ) : (
        <div className="flex justify-between mt-3">
            <p className="text-gray-600">{user?.email || "Keine E-Mail angegeben"}</p>

            {/* ✅ Bearbeiten-Button angepasst */}
            <button 
                onClick={() => setEditingFields({ email: true })} 
                className="text-[#0e5756] hover:text-[#116769] font-medium transition duration-200 cursor-pointer hover:underline"
            >
                Bearbeiten
            </button>
        </div>
    )}
</div>

    
{/* 4️⃣ Telefonnummer */}
<div className="p-6 bg-gray-50 shadow-md rounded-xl">
    <h2 className="text-xl font-semibold text-[#0e5756]" style={{ fontFamily: 'Merriweather, serif' }}>
        Telefonnummer
    </h2>

    {editingFields.telefonnummer ? (
        <>
            <div className="flex space-x-3 mt-3">
                {/* ✅ Landesvorwahl Dropdown */}
                <select
                    name="landesvorwahl"
                    value={formData.landesvorwahl}
                    onChange={handleChange}
                    className="w-1/3 bg-white p-3 text-gray-600 rounded-md border border-gray-300 focus:border-[#116769] focus:outline-none shadow-sm"
                >
                    {countryCodes.map((country) => (
                        <option key={country.code} value={country.code}>
                            {country.name} ({country.code})
                        </option>
                    ))}
                </select>

                {/* ✅ Telefonnummer Input */}
                <input
                    type="text"
                    name="telefonnummer"
                    placeholder="Telefonnummer"
                    value={formData.telefonnummer}
                    onChange={handleChange}
                    className="w-2/3 bg-white p-3 text-gray-600 rounded-md border border-gray-300 focus:border-[#116769] focus:outline-none shadow-sm"
                />
            </div>

            {/* ✅ Fehlermeldung */}
            {errors.telefonnummer && <p className="text-[#9C785E] text-sm mt-1">{errors.telefonnummer}</p>}

            {/* ✅ Buttons: Speichern & Abbrechen */}
            <div className="flex justify-between mt-3">
                <button 
                    onClick={handleSave} 
                    className="px-4 py-2 bg-[#116769] text-white border border-[#0e5756] rounded-md hover:bg-[#0e5756] transition duration-200"
                >
                    Speichern
                </button>
                <button 
                    onClick={() => handleCancel("telefonnummer")} 
                    className="text-gray-600 hover:underline"
                >
                    Abbrechen
                </button>
            </div>
        </>
    ) : (
        <div className="flex justify-between mt-3">
            <p className="text-gray-600">{user?.landesvorwahl} {user?.telefonnummer || "Keine Nummer hinterlegt"}</p>

            {/* ✅ Bearbeiten-Button angepasst */}
            <button 
                onClick={() => setEditingFields({ telefonnummer: true })} 
                className="text-[#0e5756] hover:text-[#116769] font-medium transition duration-200 cursor-pointer hover:underline"
            >
                Bearbeiten
            </button>
        </div>
    )}
</div>

{/* 5️⃣ Adresse */}
<div className="p-6 bg-gray-50 shadow-md rounded-xl">
    <h2 className="text-xl font-semibold text-[#0e5756]" style={{ fontFamily: 'Merriweather, serif' }}>
        Adresse
    </h2>

    {editingFields.address ? (
        <>
            {/* ✅ Landesauswahl mit sanfter Hintergrundfarbe */}
            <select
                name="address.land"
                value={formData.address.land}
                onChange={handleChange}
                className="w-full bg-[#e6f2f1] p-3 text-gray-700 rounded-md border border-gray-300 mt-2 focus:border-[#116769] focus:outline-none shadow-sm"
            >
                <option value="">Land auswählen...</option>
                {[
                    { code: "DE", name: "Deutschland" },
                    { code: "US", name: "USA" },
                    { code: "FR", name: "Frankreich" },
                    { code: "GB", name: "Großbritannien" },
                    { code: "IT", name: "Italien" },
                    { code: "ES", name: "Spanien" },
                    { code: "CN", name: "China" },
                    { code: "IN", name: "Indien" },
                    { code: "BR", name: "Brasilien" },
                    { code: "JP", name: "Japan" },
                    { code: "AU", name: "Australien" },
                    { code: "CA", name: "Kanada" }
                ].map((country) => (
                    <option key={country.code} value={country.name} className="bg-white text-[#0e5756]">
                        {country.name}
                    </option>
                ))}
            </select>

            {/* ✅ Adressfelder mit schönem Design */}
            <input
                type="text"
                name="address.straße"
                placeholder="Straße"
                value={formData.address.straße}
                onChange={handleChange}
                className="w-full bg-white p-3 text-gray-600 rounded-md border border-gray-300 mt-2 focus:border-[#116769] focus:outline-none shadow-sm"
            />
            <input
                type="text"
                name="address.snummer"
                placeholder="Straße Nummer"
                value={formData.address.snummer}
                onChange={handleChange}
                className="w-full bg-white p-3 text-gray-600 rounded-md border border-gray-300 mt-2 focus:border-[#116769] focus:outline-none shadow-sm"
            />
            <input
                type="text"
                name="address.stadt"
                placeholder="Stadt"
                value={formData.address.stadt}
                onChange={handleChange}
                className="w-full bg-white p-3 text-gray-600 rounded-md border border-gray-300 mt-2 focus:border-[#116769] focus:outline-none shadow-sm"
            />
            <input
                type="text"
                name="address.postleitzahl"
                placeholder="Postleitzahl"
                value={formData.address.postleitzahl}
                onChange={handleChange}
                className="w-full bg-white p-3 text-gray-600 rounded-md border border-gray-300 mt-2 focus:border-[#116769] focus:outline-none shadow-sm"
            />

            {/* ✅ Buttons: Speichern & Abbrechen */}
            <div className="flex justify-between mt-3">
                <button 
                    onClick={handleSave} 
                    className="px-4 py-2 bg-[#116769] text-white border border-[#0e5756] rounded-md hover:bg-[#0e5756] transition duration-200"
                >
                    Speichern
                </button>
                <button 
                    onClick={() => handleCancel("address")} 
                    className="text-gray-600 hover:underline"
                >
                    Abbrechen
                </button>
            </div>
        </>
    ) : (
        <div className="flex justify-between mt-3">
            <p className="text-gray-600">
                {user?.address?.land ? `${user.address.land}, ` : ""}
                {user?.address?.straße ? `${user.address.straße} ` : ""}
                {user?.address?.snummer ? `${user.address.snummer}, ` : ""}
                {user?.address?.stadt ? `${user.address.stadt}, ` : ""}
                {user?.address?.postleitzahl ? `${user.address.postleitzahl}` : ""}
            </p>

            {/* ✅ Bearbeiten-Button angepasst */}
            <button 
                onClick={() => setEditingFields({ address: true })} 
                className="text-[#0e5756] hover:text-[#116769] font-medium transition duration-200 cursor-pointer hover:underline"
            >
                Bearbeiten
            </button>
        </div>
    )}
</div>

        {successMessage && (
            <div className="fixed bottom-5 left-5 bg-green-100 text-green-800 px-4 py-2 rounded-lg shadow-md">
                ✅ {successMessage}
            </div>
        )}
    </div>

    );
};


export default AccountDetails;
