import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

const AccountDetails = () => {
    const { user, setUser } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: user?.name || "",
        vorname: user?.vorname || "",
        nachname: user?.nachname || "",
        telefonnummer: user?.telefonnummer || "",
        land: user?.address?.land || "",
        straße: user?.address?.straße || "",
        stadt: user?.address?.stadt || "",
        postleitzahl: user?.address?.postleitzahl || "",
    });

    const [message, setMessage] = useState("");
    const [editField, setEditField] = useState(null); // Aktives Bearbeitungsfeld

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await fetch("http://localhost:3000/api/users/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                setUser({ ...user, ...data.user });
                setMessage("Profil erfolgreich aktualisiert!");
                setEditField(null);
            } else {
                setMessage(data.message || "Fehler beim Aktualisieren.");
            }
        } catch (error) {
            console.error("Fehler beim Speichern:", error);
            setMessage("Serverfehler, bitte versuche es später erneut.");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-3xl font-semibold mb-6">Persönliche Daten</h2>

            {message && <p className="text-green-600">{message}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
                {[
                    { label: "Offizieller Name", field: "name" },
                    { label: "Bevorzugter Vorname", field: "vorname" },
                    { label: "Telefonnummer", field: "telefonnummer" },
                    { label: "Straße & Hausnummer", field: "straße" },
                    { label: "Stadt", field: "stadt" },
                    { label: "Postleitzahl", field: "postleitzahl" }
                ].map(({ label, field }) => (
                    <div key={field} className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-600">{label}</p>
                            {editField === field ? (
                                <input
                                    type="text"
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    className="w-full bg-gray-100 p-2 rounded-md outline-none"
                                />
                            ) : (
                                <p className="text-lg">{formData[field] || "Nicht angegeben"}</p>
                            )}
                        </div>
                        <button 
                            type="button" 
                            onClick={() => setEditField(field)} 
                            className="text-blue-600 hover:underline"
                        >
                            {formData[field] ? "Bearbeiten" : "Hinzufügen"}
                        </button>
                    </div>
                ))}

                <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg mt-4 hover:bg-green-700 transition">
                    Speichern
                </button>
            </form>
        </div>
    );
};

export default AccountDetails;
