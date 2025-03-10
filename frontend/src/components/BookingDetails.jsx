import { useState, useEffect } from "react";

const BookingDetails = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/api/auth/my-bookings", {
            method: "GET",
            credentials: "include",
        })
            .then((response) => {
                console.log(" Antwortstatus:", response.status);
                if (!response.ok) {
                    throw new Error("Fehler beim Laden der Buchungen");
                }
                return response.json();
            })
            .then((data) => {
                console.log("✅ Buchungen geladen:", data);
                setBookings(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(" Fehler beim Abrufen der Buchungen:", error);
                setError("Fehler beim Laden der Buchungen.");
                setLoading(false);
            });
    }, []);
    

    /**
     * 🔹 Stornierung einer Buchung
     */
    const cancelBooking = async (bookingNumber) => {
        try {
            const response = await fetch(`http://localhost:3000/api/auth/cancel-booking/${bookingNumber}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (!response.ok) throw new Error("Fehler beim Stornieren der Buchung.");

            const updatedBooking = await response.json();

            // ✅ Buchungsliste aktualisieren
            setBookings(prevBookings =>
                prevBookings.map(booking =>
                    booking.bookingNumber === bookingNumber
                        ? { ...booking, status: "Canceled" }
                        : booking
                )
            );
        } catch (error) {
            console.error("❌ Fehler beim Stornieren:", error);
            alert("Stornierung fehlgeschlagen.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
            <h2 className="text-2xl font-semibold">Meine Buchungen</h2>

            {loading ? (
                <p className="text-gray-600">Lade Buchungen...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : bookings.length === 0 ? (
                <p className="text-gray-600">Keine Buchungen gefunden.</p>
            ) : (
                <ul className="space-y-4">
                    {bookings.map((booking) => (
                        <li key={booking.bookingNumber} className="border-b pb-4">
                            <p><strong>Buchungsnummer:</strong> {booking.bookingNumber}</p>
                            <p><strong>Haus:</strong> {booking.houseType}</p>
                            <p><strong>Startdatum:</strong> {new Date(booking.startDate).toLocaleDateString()}</p>
                            <p><strong>Enddatum:</strong> {new Date(booking.endDate).toLocaleDateString()}</p>
                            <p><strong>Preis:</strong> {booking.price} €</p>
                            <p><strong>Status:</strong> {booking.status}</p>

                            {booking.status !== "Canceled" && (
                                <button
                                    onClick={() => cancelBooking(booking.bookingNumber)}
                                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md"
                                >
                                    Buchung stornieren
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BookingDetails;
