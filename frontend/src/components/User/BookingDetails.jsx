import { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";

const BookingDetails = () => {
    const { user } = useContext(AuthContext); // ✅ user aus AuthContext holen

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);

    useEffect(() => {
        if (!user) {
            console.log("❌ Kein Benutzer gefunden. Anfrage wird nicht gesendet.");
            setError("Nicht eingeloggt! Bitte melden Sie sich an.");
            setLoading(false);
            return;
        }
    
        console.log("📡 Anfrage an Backend wird gesendet...");
    
        fetch("http://localhost:3000/api/auth/my-bookings", {
            method: "GET",
            credentials: "include",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Fehler beim Laden der Buchungen");
                }
                return response.json();
            })
            .then((data) => {
                console.log("📡 Empfangenes Backend-Daten:", data);
                setBookings(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("❌ Fehler beim Laden der Buchungen:", error.message);
                setError(`Fehler beim Laden der Buchungen: ${error.message}`);
                setLoading(false);
            });
    }, [user]);
    

    const handleCancelClick = (booking) => {
        setSelectedBooking(booking);
        setShowConfirm(true);
    };

    const handleCancelNo = () => {
        setShowConfirm(false);
        setSelectedBooking(null);
    };

    const handleCancelYes = async () => {
        if (!selectedBooking) return;

        try {
            const response = await fetch(`http://localhost:3000/api/auth/cancel-booking/${selectedBooking.bookingNumber}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Fehler beim Stornieren der Buchung.");

            setBookings(prevBookings =>
                prevBookings.map(booking =>
                    booking.bookingNumber === selectedBooking.bookingNumber
                        ? { ...booking, status: "Canceled" }
                        : booking
                )
            );

            setShowConfirm(false);
            setSelectedBooking(null);
        } catch (error) {
            console.error("❌ Fehler beim Stornieren:", error.message);
            alert("Stornierung fehlgeschlagen. Versuchen Sie es später erneut.");
        }
    };

    const formatDate = (dateString) => {
        const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
        return new Date(dateString).toLocaleDateString("de-DE", options);
    };

    return (
        <div className="max-w-5xl mx-auto p-8 bg-white shadow-md rounded-lg">
            <h2 className="text-4xl font-semibold mb-10 text-[#0e5756] text-center"
                style={{ fontFamily: 'Merriweather, serif' }}>
                Ihre Buchungen
            </h2>

            {loading ? (
                <p className="text-gray-600 text-center">Lade Buchungen...</p>
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : bookings.length === 0 ? (
                <p className="text-gray-600 text-center">Keine Buchungen gefunden.</p>
            ) : (
                <div className="space-y-6">
                    {bookings.map((booking) => (
                        <div key={booking.bookingNumber} className="p-6 bg-gray-50 rounded-lg shadow-md">
                            <div>
                                <p className="font-medium text-gray-600">
                                    Buchungsnummer: <span className="font-normal">{booking.bookingNumber}</span>
                                </p>
                                <p className="text-gray-600"><strong>Unterkunft:</strong> {booking.houseType}</p>
                                <p className="text-gray-600"><strong>Gästeanzahl:</strong> {booking.guestCount}</p>
                                <p className="text-gray-600"><strong>Startdatum:</strong> {formatDate(booking.startDate)}</p>
                                <p className="text-gray-600"><strong>Enddatum:</strong> {formatDate(booking.endDate)}</p>
                                <p className="text-gray-600"><strong>Total Preis:</strong> {booking.price} €</p>
                                <p className="font-medium text-gray-600">Status: {booking.status}</p>
                            </div>

                            {booking.status !== "Canceled" && (
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => handleCancelClick(booking)}
                                        className="px-4 py-2 bg-[#116769] text-white border border-[#0e5756] rounded-md hover:bg-[#0e5756] transition duration-200"
                                    >
                                        Stornieren
                                    </button>
                                </div>
                            )}

                            {booking.status === "Canceled" && (
                                <div className="mt-4 p-2 bg-[#e6f2f1] text-[#0e5756] rounded-md">
                                    <p className="font-medium">Sie haben diese Buchung storniert.</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* ✅ Bestätigungs-Popup für Stornierung */}
            {showConfirm && selectedBooking && (
                <div className="fixed inset-0 flex items-center justify-center p-5">
                    <div className="bg-[#e6f2f1] p-6 rounded-xl shadow-xl border border-gray-200 max-w-sm w-full text-center">
                        <h3 className="text-xl font-semibold text-gray-700">Buchung stornieren?</h3>
                        <p className="text-gray-600 mt-3">
                            Sind Sie sicher, dass Sie die Buchung stornieren möchten?
                        </p>
                        <div className="flex justify-center mt-5 space-x-3">
                            <button
                                onClick={handleCancelYes}
                                className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 shadow-sm"
                            >
                                Stornieren
                            </button>
                            <button
                                onClick={handleCancelNo}
                                className="px-5 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-200 shadow-sm"
                            >
                                Abbrechen
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingDetails;
