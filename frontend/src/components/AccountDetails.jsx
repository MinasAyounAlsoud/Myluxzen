

import { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";

const countryCodes = [
    { code: "+49", name: "Deutschland" },
    { code: "+1", name: "USA" },
]

const AccountDetails = () => {
    const { user, setUser } = useContext(AuthContext);
    const [editField, setEditField] = useState(null);
    const [editingFields, setEditingFields] = useState({}); 
    const [formData, setFormData] = useState({
        name: "",
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

    const [message, setMessage] = useState("");

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
                    setUser(userData); // Benutzer im AuthContext speichern
                    
                    // Sicherstellen, dass `address` existiert
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        name: userData.name || prevFormData.name,
                        vorname: userData.vorname || prevFormData.vorname,
                        nachname: userData.nachname || prevFormData.nachname,
                        email: userData.email || prevFormData.email,
                        telefonnummer: userData.telefonnummer || prevFormData.telefonnummer,
                        landesvorwahl: userData.landesvorwahl || prevFormData.landesvorwahl,
                        address: userData.address ? {  
                            land: userData.address.land || "",
                            straße: userData.address.straße || "",
                            snummer: userData.address.snummer || "",
                            stadt: userData.address.stadt || "",
                            postleitzahl: userData.address.postleitzahl || "",
                        } : { // Falls keine Adresse existiert, leeres Objekt setzen
                            land: "",
                            straße: "",
                            snummer: "",
                            stadt: "",
                            postleitzahl: "",
                        }
                    }));
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
    
    const handleSave = async () => {
        setMessage("");
        try {
            const response = await fetch("http://localhost:3000/api/auth/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formData),
            });
    
            const data = await response.json();
            console.log("🔹 Server-Antwort nach Speicherung:", data);
    
            if (response.ok) {
                setUser(data.user); // ✅ Benutzer-Daten sofort aktualisieren
                setFormData(data.user); // ✅ Form-Daten mit neuen Werten setzen
                setEditingFields((prev) => ({ ...prev, name: false, telefonnummer: false, address: false })); // ✅ Alle Bearbeitungsfelder schließen
                setMessage("Änderungen gespeichert!");
            } else {
                setMessage(data.message || "Fehler beim Speichern.");
            }
        } catch (error) {
            console.error("Fehler beim Speichern:", error);
            setMessage("Serverfehler, bitte später erneut versuchen.");
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
        <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-2xl space-y-4">

        
      
        <h1 className="text-3xl font-bold text-gray-800 mb-10">Personal Info</h1>

            {/* 1️⃣ Benutzername */}
            <div className="p-6 bg-gray-50 shadow-md rounded-xl">
                <h2 className="text-xl font-semibold text-gray-800">Benutzername</h2>
                {editingFields.name ? (
                    <>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-gray-100 p-3 rounded-md border border-gray-300 mt-2"
                        />
                        <div className="flex justify-between mt-3">
                            <button onClick={handleSave} className="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800">
                                Speichern
                            </button>
                            <button onClick={() => handleCancel("name")} className="text-gray-500 hover:underline">
                                Abbrechen
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex justify-between mt-3">
                        <p className="text-gray-500">{user?.name || "Kein Benutzername angegeben"}</p>
                        <button onClick={() => setEditingFields({ name: true })} className="text-blue-600 hover:underline">
                            Bearbeiten
                        </button>
                    </div>
                )}
            </div>
    
            {/* 2️⃣ Name (Vorname & Nachname) */}
            <div className="p-6 bg-gray-50 shadow-md rounded-xl">
                <h2 className="text-lg font-semibold text-gray-800">Offizieller Name</h2>
                <p className="text-gray-500 text-sm">Achte darauf, dass diese Angabe mit deinem Ausweisdokument übereinstimmt.</p>
    
                {editingFields.nameDetails ? (
                    <>
                        <div className="flex space-x-4 mt-3">
                            <input
                                type="text"
                                name="vorname"
                                placeholder="Vorname"
                                value={formData.vorname}
                                onChange={handleChange}
                                className="w-1/2 bg-gray-100 p-3 rounded-md border border-gray-300"
                            />
                            <input
                                type="text"
                                name="nachname"
                                placeholder="Nachname"
                                value={formData.nachname}
                                onChange={handleChange}
                                className="w-1/2 bg-gray-100 p-3 rounded-md border border-gray-300"
                            />
                        </div>
                        <div className="flex justify-between mt-3">
                            <button onClick={handleSave} className="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800">
                                Speichern
                            </button>
                            <button onClick={() => handleCancel("nameDetails")} className="text-gray-500 hover:underline">
                                Abbrechen
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex justify-between mt-3">
                        <p className="text-gray-500">{user?.vorname || "Kein Vorname"} {user?.nachname || "Kein Nachname"}</p>
                        <button onClick={() => setEditingFields({ nameDetails: true })} className="text-blue-600 hover:underline">
                            Bearbeiten
                        </button>
                    </div>
                )}
            </div>
    
            {/* 3️⃣ E-Mail */}
            <div className="p-6 bg-gray-50 shadow-md rounded-xl">
                <h2 className="text-xl font-semibold text-gray-800">E-Mail-Adresse</h2>
                {editingFields.email ? (
                    <>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-gray-100 p-3 rounded-md border border-gray-300 mt-2"
                        />
                        <div className="flex justify-between mt-3">
                            <button onClick={handleSave} className="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800">
                                Speichern
                            </button>
                            <button onClick={() => handleCancel("email")} className="text-gray-500 hover:underline">
                                Abbrechen
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex justify-between mt-3">
                        <p className="text-gray-500">{user?.email}</p>
                        <button onClick={() => setEditingFields({ email: true })} className="text-blue-600 hover:underline">
                            Bearbeiten
                        </button>
                    </div>
                )}
            </div>
    
            {/* 4️⃣ Telefonnummer */}
            <div className="p-6 bg-gray-50 shadow-md rounded-xl">
                <h2 className="text-lg font-semibold text-gray-800">Telefonnummer</h2>
                {editingFields.telefonnummer ? (
                    <>
                        <div className="flex space-x-2 mt-3">
                            <select
                                name="landesvorwahl"
                                value={formData.landesvorwahl}
                                onChange={handleChange}
                                className="w-1/3 bg-gray-100 p-3 rounded-md border border-gray-300"
                            >
                                {countryCodes.map((country) => (
                                    <option key={country.code} value={country.code}>
                                        {country.name} ({country.code})
                                    </option>
                                ))}
                            </select>
                            <input
                                type="text"
                                name="telefonnummer"
                                placeholder="Telefonnummer"
                                value={formData.telefonnummer}
                                onChange={handleChange}
                                className="w-2/3 bg-gray-100 p-3 rounded-md border border-gray-300"
                            />
                        </div>
                        <div className="flex justify-between mt-3">
                            <button onClick={handleSave} className="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800">
                                Speichern
                            </button>
                            <button onClick={() => handleCancel("telefonnummer")} className="text-gray-500 hover:underline">
                                Abbrechen
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex justify-between mt-3">
                        <p className="text-gray-500">{user?.landesvorwahl} {user?.telefonnummer || "Keine Nummer hinterlegt"}</p>
                        <button onClick={() => setEditingFields({ telefonnummer: true })} className="text-blue-600 hover:underline">
                            Bearbeiten
                        </button>
                    </div>
                )}
            </div>
    
                  {/*Addresse*/
                  
                  <div className="p-6 bg-gray-50 shadow-md rounded-xl">
    <h2 className="text-lg font-semibold text-gray-800">Adresse</h2>
    {editingFields.address ? (
        <>
            <select
                name="address.land"
                value={formData.address.land}
                onChange={handleChange}
                className="w-full bg-gray-100 p-3 rounded-md border border-gray-300 mt-2"
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
                    <option key={country.code} value={country.name}>
                        {country.name}
                    </option>
                ))}
            </select>

            <input
                type="text"
                name="address.straße"
                placeholder="Straße"
                value={formData.address.straße}
                onChange={handleChange}
                className="w-full bg-gray-100 p-3 rounded-md border border-gray-300 mt-2"
            />
            <input
                type="text"
                name="address.snummer"
                placeholder="Straße Nummer"
                value={formData.address.snummer}
                onChange={handleChange}
                className="w-full bg-gray-100 p-3 rounded-md border border-gray-300 mt-2"
            />
            <input
                type="text"
                name="address.stadt"
                placeholder="Stadt"
                value={formData.address.stadt}
                onChange={handleChange}
                className="w-full bg-gray-100 p-3 rounded-md border border-gray-300 mt-2"
            />
            <input
                type="text"
                name="address.postleitzahl"
                placeholder="Postleitzahl"
                value={formData.address.postleitzahl}
                onChange={handleChange}
                className="w-full bg-gray-100 p-3 rounded-md border border-gray-300 mt-2"
            />
            <div className="flex justify-between mt-3">
                <button onClick={handleSave} className="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800">
                    Speichern
                </button>
                <button onClick={() => handleCancel("address")} className="text-gray-500 hover:underline">
                    Abbrechen
                </button>
            </div>
        </>
    ) : (
        <div className="flex justify-between mt-3">
            <p className="text-gray-500">
                {user?.address?.land ? `${user.address.land}, ` : ""}
                {user?.address?.straße ? `${user.address.straße} ` : ""}
                {user?.address?.snummer ? `${user.address.snummer}, ` : ""}
                {user?.address?.stadt ? `${user.address.stadt}, ` : ""}
                {user?.address?.postleitzahl ? `${user.address.postleitzahl}` : ""}
            </p>
            <button onClick={() => setEditingFields({ address: true })} className="text-blue-600 hover:underline">
                Bearbeiten
            </button>
        </div>
    )}
</div>
}
            {message && <p className="text-green-600">{message}</p>}
        </div>
        //Addresse

        
    );
}    

export default AccountDetails;
