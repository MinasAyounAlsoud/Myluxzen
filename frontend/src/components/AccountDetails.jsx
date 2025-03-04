/*import { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";

const AccountDetails = () => {
    const { user, setUser } = useContext(AuthContext);
    const [editField, setEditField] = useState(null);
    const [formData, setFormData] = useState({
        name: user?.name || "",
        vorname: user?.vorname || "",
        nachname: user?.nachname || "",
        email: user?.email || "",
        telefonnummer: user?.telefonnummer || "",
        password: "",
        land: user?.address?.land || "",
        straße: user?.address?.straße || "",
        apt: user?.address?.apt || "",
        stadt: user?.address?.stadt || "",
        state: user?.address?.state || "",
        postleitzahl: user?.address?.postleitzahl || "",
    });

    const [message, setMessage] = useState("");

    // **Fehlerbehebung:** Sicherstellen, dass die Werte immer Strings sind
    useEffect(() => {
        const updatedFormData = {
            name: user?.name || "",
            vorname: user?.vorname || "",
            nachname: user?.nachname || "",
            email: user?.email || "",
            telefonnummer: user?.telefonnummer || "",
            land: user?.address?.land || "",
            straße: user?.address?.straße || "",
            apt: user?.address?.apt || "",
            stadt: user?.address?.stadt || "",
            state: user?.address?.state || "",
            postleitzahl: user?.address?.postleitzahl || "",
        };
        setFormData(updatedFormData);
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async (field) => {
        setMessage("");

        try {
            const response = await fetch("http://localhost:3000/api/auth/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ [field]: formData[field] }),
            });

            const data = await response.json();
            if (response.ok) {
                setUser({ ...user, [field]: formData[field] });
                setMessage("Änderungen gespeichert!");
                setEditField(null);
            } else {
                setMessage(data.message || "Fehler beim Speichern.");
            }
        } catch (error) {
            console.error("Fehler beim Speichern:", error);
            setMessage("Serverfehler, bitte später erneut versuchen.");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
            
            // Benutzername 
            <div className="border-b pb-4">
                <h2 className="text-xl font-semibold">Benutzername</h2>
                {editField === "name" ? (
                    <>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-gray-100 p-2 rounded-md border mt-2"
                        />
                        <button onClick={() => handleSave("name")} className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md">
                            Speichern
                        </button>
                    </>
                ) : (
                    <div className="flex justify-between mt-3">
                        <p>{user?.name || "Kein Benutzername angegeben"}</p>
                        <button onClick={() => setEditField("name")} className="text-blue-600 hover:underline">
                            Bearbeiten
                        </button>
                    </div>
                )}
            </div>

            //Name 
            <div className="border-b pb-4">
                <h2 className="text-xl font-semibold">Legal Name</h2>
                <div className="flex space-x-4 mt-3">
                    <div className="w-1/2">
                        <label className="text-sm text-gray-500">Vorname</label>
                        {editField === "vorname" ? (
                            <input
                                type="text"
                                name="vorname"
                                value={formData.vorname}
                                onChange={handleChange}
                                className="w-full bg-gray-100 p-2 rounded-md border"
                            />
                        ) : (
                            <p className="font-semibold">{user?.vorname || "Nicht angegeben"}</p>
                        )}
                        <button onClick={() => setEditField("vorname")} className="text-blue-600 hover:underline mt-1">
                            Bearbeiten
                        </button>
                    </div>
                    <div className="w-1/2">
                        <label className="text-sm text-gray-500">Nachname</label>
                        {editField === "nachname" ? (
                            <input
                                type="text"
                                name="nachname"
                                value={formData.nachname}
                                onChange={handleChange}
                                className="w-full bg-gray-100 p-2 rounded-md border"
                            />
                        ) : (
                            <p className="font-semibold">{user?.nachname || "Nicht angegeben"}</p>
                        )}
                        <button onClick={() => setEditField("nachname")} className="text-blue-600 hover:underline mt-1">
                            Bearbeiten
                        </button>
                    </div>
                </div>
            </div>

            // E-Mail 
            <div className="border-b pb-4">
                <h2 className="text-xl font-semibold">E-Mail-Adresse</h2>
                <p>{user?.email}</p>
            </div>

            //Telefonnummer
            <div className="border-b pb-4">
                <h2 className="text-xl font-semibold">Telefonnummer</h2>
                {editField === "telefonnummer" ? (
                    <>
                        <input
                            type="text"
                            name="telefonnummer"
                            value={formData.telefonnummer}
                            onChange={handleChange}
                            className="w-full bg-gray-100 p-2 rounded-md border mt-2"
                        />
                        <button onClick={() => handleSave("telefonnummer")} className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md">
                            Speichern
                        </button>
                    </>
                ) : (
                    <div className="flex justify-between mt-3">
                        <p>{user?.telefonnummer || "Keine Nummer hinterlegt"}</p>
                        <button onClick={() => setEditField("telefonnummer")} className="text-blue-600 hover:underline">
                            Bearbeiten
                        </button>
                    </div>
                )}
            </div>

            //Adresse 
            <div className="border-b pb-4">
                <h2 className="text-xl font-semibold">Address</h2>
                <p className="text-gray-600">Use a permanent address where you can receive mail.</p>
                {editField === "address" ? (
                    <>
                        <select
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full bg-gray-100 p-2 rounded-md border mt-2"
                        >
                            <option>United States</option>
                            <option>Germany</option>
                            <option>France</option>
                        </select>
                        <input
                            type="text"
                            name="street"
                            placeholder="Street address"
                            value={formData.street}
                            onChange={handleChange}
                            className="w-full bg-gray-100 p-2 rounded-md border mt-2"
                        />
                        <input
                            type="text"
                            name="apt"
                            placeholder="Apt, suite (optional)"
                            value={formData.apt}
                            onChange={handleChange}
                            className="w-full bg-gray-100 p-2 rounded-md border mt-2"
                        />
                        <div className="flex space-x-2 mt-2">
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-1/2 bg-gray-100 p-2 rounded-md border"
                            />
                            <input
                                type="text"
                                name="state"
                                placeholder="State / Province / Region"
                                value={formData.state}
                                onChange={handleChange}
                                className="w-1/2 bg-gray-100 p-2 rounded-md border"
                            />
                        </div>
                        <input
                            type="text"
                            name="zip"
                            placeholder="ZIP code"
                            value={formData.zip}
                            onChange={handleChange}
                            className="w-full bg-gray-100 p-2 rounded-md border mt-2"
                        />
                        <button
                            onClick={() => handleSave("address")}
                            className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md"
                        >
                            Save
                        </button>
                    </>
                ) : (
                    <div className="flex justify-between mt-3">
                        {user?.address ? (
                            <p>{`${user.address.street}, ${user.address.city}, ${user.address.state}, ${user.address.zip}`}</p>
                        ) : (
                            <p className="text-gray-500">No address added</p>
                        )}
                        <button onClick={() => setEditField("address")} className="text-blue-600 hover:underline">
                            {user?.address ? "Edit" : "Add"}
                        </button>
                    </div>
                )}
            </div>

            {message && <p className="text-green-600">{message}</p>}
        </div>
    );
};

export default AccountDetails;
*/

import { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";

const countryCodes = [
    { code: "+49", name: "Deutschland" },
    { code: "+1", name: "USA" },
    { code: "+33", name: "Frankreich" },
    { code: "+44", name: "Großbritannien" },
    { code: "+55", name: "Brasilien" },
    { code: "+86", name: "China" },
    { code: "+91", name: "Indien" },
    { code: "+34", name: "Spanien" },
    { code: "+39", name: "Italien" },
    { code: "+81", name: "Japan" },
    { code: "+7", name: "Russland" },
    { code: "+61", name: "Australien" },
    { code: "+41", name: "Schweiz" },
    { code: "+43", name: "Österreich" },
    { code: "+32", name: "Belgien" },
    { code: "+31", name: "Niederlande" },
    { code: "+46", name: "Schweden" },
    { code: "+47", name: "Norwegen" },
    { code: "+45", name: "Dänemark" },
    { code: "+351", name: "Portugal" },
    { code: "+20", name: "Ägypten" },
    { code: "+52", name: "Mexiko" },
    { code: "+54", name: "Argentinien" },
    { code: "+62", name: "Indonesien" },
    { code: "+92", name: "Pakistan" },
    { code: "+27", name: "Südafrika" },
    { code: "+82", name: "Südkorea" },
    { code: "+971", name: "Vereinigte Arabische Emirate" },
    { code: "+966", name: "Saudi-Arabien" },
    { code: "+90", name: "Türkei" },
    { code: "+48", name: "Polen" },
    { code: "+30", name: "Griechenland" },
    { code: "+358", name: "Finnland" },
    { code: "+421", name: "Slowakei" },
    { code: "+420", name: "Tschechien" },
    { code: "+36", name: "Ungarn" },
    { code: "+380", name: "Ukraine" },
    { code: "+375", name: "Weißrussland" },
    { code: "+356", name: "Malta" },
    { code: "+386", name: "Slowenien" },
    { code: "+372", name: "Estland" },
    { code: "+371", name: "Lettland" },
    { code: "+370", name: "Litauen" },
    { code: "+57", name: "Kolumbien" },
    { code: "+56", name: "Chile" },
    { code: "+593", name: "Ecuador" },
    { code: "+502", name: "Guatemala" },
    { code: "+595", name: "Paraguay" },
    { code: "+51", name: "Peru" },
    { code: "+63", name: "Philippinen" },
    { code: "+64", name: "Neuseeland" },
    { code: "+98", name: "Iran" },
    { code: "+964", name: "Irak" },
    { code: "+856", name: "Laos" },
    { code: "+84", name: "Vietnam" },
    { code: "+977", name: "Nepal" },
    { code: "+972", name: "Israel" },
    { code: "+994", name: "Aserbaidschan" },
    { code: "+374", name: "Armenien" },
    { code: "+880", name: "Bangladesch" },
    { code: "+373", name: "Moldawien" },
    { code: "+256", name: "Uganda" },
    { code: "+255", name: "Tansania" },
    { code: "+233", name: "Ghana" },
    { code: "+234", name: "Nigeria" },
    { code: "+509", name: "Haiti" },
    { code: "+53", name: "Kuba" },
    { code: "+592", name: "Guyana" },
    { code: "+501", name: "Belize" },
    { code: "+268", name: "Eswatini" },
    { code: "+691", name: "Mikronesien" },
    { code: "+675", name: "Papua-Neuguinea" },
    { code: "+685", name: "Samoa" },
    { code: "+678", name: "Vanuatu" }
];


const AccountDetails = () => {
    const { user, setUser } = useContext(AuthContext);
    const [editField, setEditField] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        vorname: "",
        nachname: "",
        email: "",
        telefonnummer: "",
        landesvorwahl: "+49", // Standardwert
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
    
                    setUser(userData); // ✅ Benutzer in AuthContext speichern
                    
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        name: userData.name || prevFormData.name,
                        vorname: userData.vorname || prevFormData.vorname,
                        nachname: userData.nachname || prevFormData.nachname,
                        email: userData.email || prevFormData.email,
                        telefonnummer: userData.telefonnummer || prevFormData.telefonnummer,
                        landesvorwahl: userData.landesvorwahl || prevFormData.landesvorwahl,
                        address: userData.address || {  // 👈 **Sicherstellen, dass `address` existiert!**
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
                console.error(" Fehler beim Abrufen der Benutzerdaten:", error);
            }
        };
    
        if (!user?.vorname || !user?.nachname || !user?.telefonnummer) {
            fetchUserProfile();
        }
    }, [setUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name.startsWith("address.")) {
            // 🛠️ Falls die Adresse aktualisiert wird, verschachtelt speichern
            const field = name.split(".")[1]; 
            setFormData((prevData) => ({
                ...prevData,
                address: { 
                    ...prevData.address, 
                    [field]: value 
                },
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    

    const handleSave = async (fields) => {
        setMessage("");
        try {
            const response = await fetch("http://localhost:3000/api/auth/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(fields),
            });
    
            const data = await response.json();
            console.log("🔹 Server-Antwort nach Speicherung:", data); 
    
            if (response.ok) {
                setUser(prevUser => ({
                    ...prevUser,
                    ...fields,  
                }));
                setMessage("Änderungen gespeichert!");
                setEditField(null);
            } else {
                setMessage(data.message || "Fehler beim Speichern.");
            }
        } catch (error) {
            console.error("Fehler beim Speichern:", error);
            setMessage("Serverfehler, bitte später erneut versuchen.");
        }
    };
    
    

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
            
            {/* 1️⃣ Benutzername */}
            <div className="border-b pb-4">
                <h2 className="text-xl font-semibold">Benutzername</h2>
                {editField === "name" ? (
                    <>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-gray-100 p-2 rounded-md border mt-2"
                        />
                        <button onClick={() => handleSave({ name: formData.name })} className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md">
                            Speichern
                        </button>
                    </>
                ) : (
                    <div className="flex justify-between mt-3">
                        <p>{user?.name || "Kein Benutzername angegeben"}</p>
                        <button onClick={() => setEditField("name")} className="text-blue-600 hover:underline">
                            Bearbeiten
                        </button>
                    </div>
                )}
            </div>

            {/* 2️⃣ Name (Vorname & Nachname) */}
            <div className="border-b pb-4">
                <h2 className="text-lg font-semibold">Offizieller Name</h2>
                <p className="text-gray-500 text-sm">Achte darauf, dass diese Angabe mit deinem Ausweisdokument übereinstimmt.</p>
                {editField === "nameDetails" ? (
                    <>
                        <div className="flex space-x-4 mt-3">
                            <input
                                type="text"
                                name="vorname"
                                placeholder="Vorname"
                                value={formData.vorname}
                                onChange={handleChange}
                                className="w-1/2 bg-gray-100 p-2 rounded-md border"
                            />
                            <input
                                type="text"
                                name="nachname"
                                placeholder="Nachname"
                                value={formData.nachname}
                                onChange={handleChange}
                                className="w-1/2 bg-gray-100 p-2 rounded-md border"
                            />
                        </div>
                        <button onClick={() => handleSave({ vorname: formData.vorname, nachname: formData.nachname })} 
                            className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md">
                            Speichern
                        </button>
                    </>
                ) : (
                    <div className="flex justify-between mt-3">
                        <p>{user?.vorname || "Kein Vorname"} {user?.nachname || "Kein Nachname"}</p>
                        <button onClick={() => setEditField("nameDetails")} className="text-blue-600 hover:underline">
                            Bearbeiten
                        </button>
                    </div>
                )}
            </div>

            {/* 3️⃣ E-Mail */}
            <div className="border-b pb-4">
                <h2 className="text-xl font-semibold">E-Mail-Adresse</h2>
                {editField === "email" ? (
                    <>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-gray-100 p-2 rounded-md border mt-2"
                        />
                        <button onClick={() => handleSave({ email: formData.email })} className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md">
                            Speichern
                        </button>
                    </>
                ) : (
                    <div className="flex justify-between mt-3">
                        <p>{user?.email}</p>
                        <button onClick={() => setEditField("email")} className="text-blue-600 hover:underline">
                            Bearbeiten
                        </button>
                    </div>
                )}
            </div>

            {/* 4️⃣ Telefonnummer */}
            <div className="border-b pb-4">
                <h2 className="text-lg font-semibold">Telefonnummer</h2>
                {editField === "telefonnummer" ? (
                    <>
                        <div className="flex space-x-2 mt-3">
                            <select
                                name="landesvorwahl"
                                value={formData.landesvorwahl}
                                onChange={handleChange}
                                className="w-1/3 bg-gray-100 p-2 rounded-md border"
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
                                className="w-2/3 bg-gray-100 p-2 rounded-md border"
                            />
                        </div>
                        <button onClick={() => handleSave({ telefonnummer: formData.telefonnummer, landesvorwahl: formData.landesvorwahl })} 
                            className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md">
                            Speichern
                        </button>
                    </>
                ) : (
                    <div className="flex justify-between mt-3">
                        <p>{user?.landesvorwahl} {user?.telefonnummer || "Keine Nummer hinterlegt"}</p>
                        <button onClick={() => setEditField("telefonnummer")} className="text-blue-600 hover:underline">
                            Bearbeiten
                        </button>
                    </div>
                )}
            </div>
   
        {/* 5️⃣ Adresse */}
<div className="border-b pb-4">
    <h2 className="text-lg font-semibold">Adresse</h2>
    {editField === "address" ? (
        <>
            <div className="flex flex-col space-y-2 mt-3">
                <input
                    type="text"
                    name="land"
                    placeholder="Land"
                    value={formData.address.land}
                    onChange={handleChange}
                    className="w-full bg-gray-100 p-2 rounded-md border"
                />
                <input
                    type="text"
                    name="straße"
                    placeholder="Straße"
                    value={formData.address.straße}
                    onChange={handleChange}
                    className="w-full bg-gray-100 p-2 rounded-md border"
                />
                <input
                    type="text"
                    name="snummer"
                    placeholder="Apt, Suite (optional)"
                    value={formData.address.apt}
                    onChange={handleChange}
                    className="w-full bg-gray-100 p-2 rounded-md border"
                />
                <div className="flex space-x-2">
                    <input
                        type="text"
                        name="stadt"
                        placeholder="Stadt"
                        value={formData.address.stadt}
                        onChange={handleChange}
                        className="w-1/2 bg-gray-100 p-2 rounded-md border"
                    />
                </div>
                <input
                    type="text"
                    name="postleitzahl"
                    placeholder="Postleitzahl"
                    value={formData.address.postleitzahl}
                    onChange={handleChange}
                    className="w-full bg-gray-100 p-2 rounded-md border"
                />
            </div>
            <button onClick={() => handleSave({ address: formData.address })} 
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md">
                Speichern
            </button>
        </>
    ) : (
        <div className="flex justify-between mt-3">
            <p>
                {user?.address?.straße || "Keine Adresse"}{user?.address?.stadt ? `, ${user.address.stadt}` : ""}
            </p>
            <button onClick={() => setEditField("address")} className="text-blue-600 hover:underline">
                Bearbeiten
            </button>
        </div>
    )}
</div>

            {message && <p className="text-green-600">{message}</p>}
        </div>
    );
};

export default AccountDetails;
