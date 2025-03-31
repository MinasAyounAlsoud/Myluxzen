import { useState, useContext, useEffect, useRef } from "react";
import AuthContext from "../../context/AuthContext";
import { motion } from "framer-motion";

const BookingDetails = () => {
  const { user } = useContext(AuthContext);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [view, setView] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 4;
  const bookingContainerRef = useRef(null);

  useEffect(() => { 
    if (!user) {
      setError(" Nicht eingeloggt! Bitte melden Sie sich an.");
      setLoading(false);
      return;
    }

    fetch("http://localhost:3000/api/auth/my-bookings", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        const now = new Date();
        const upcoming = data
          .filter((b) => b.status !== "Canceled" && new Date(b.startDate) >= now)
          .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
        const past = data
          .filter((b) => b.status === "Canceled" || new Date(b.startDate) < now)
          .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
        setBookings([...upcoming, ...past]);
        setLoading(false);
      })
      .catch((err) => {
        setError("Fehler beim Laden der Buchungen.");
        setLoading(false);
      });
  }, [user]);

  const filteredBookings = bookings.filter((booking) => {
    if (view === "canceled") return booking.status === "Canceled";
    if (view === "active") return booking.status !== "Canceled" && booking.status !== "CheckedOut";

    return true;
  });

  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [view, filteredBookings.length]);

  const currentBookings = filteredBookings.slice(
    (currentPage - 1) * bookingsPerPage,
    currentPage * bookingsPerPage
  );


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
      const requestBody = {
        houseNum: selectedBooking.houseNum,
        status: "Canceled",
      };

      const response = await fetch(
        `http://localhost:3000/booking/cancel-or-checkout/${selectedBooking.bookingNumber}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) throw new Error("❌ Fehler beim Stornieren der Buchung.");

      setBookings((prev) =>
        prev.map((booking) =>
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
    <div className="max-w-5xl mx-auto p-8">
      <h2
        className="text-4xl font-semibold mb-10 mt-5 text-[#0e5756] text-center"
        style={{ fontFamily: "Merriweather, serif" }}
      >
        Ihre Buchungen
      </h2>

      {/* Filterbuttons */}
      <div className="flex justify-center mb-10">
  <div className="inline-flex shadow-md rounded-md overflow-hidden border border-gray-300">
    <button
      className={`px-4 py-2 transition-all duration-200 ${
        view === "all"
          ? "bg-[#116769] text-white"
          : "bg-white text-gray-700 hover:bg-gray-100"
      }`}
      onClick={() => {
        setView("all");
        setCurrentPage(1);
      }}
      style={{ fontFamily: "Merriweather, serif" }}
    >
      Alle
    </button>
    <button
      className={`px-4 py-2 transition-all duration-200 ${
        view === "active"
          ? "bg-[#116769] text-white"
          : "bg-white text-gray-700 hover:bg-gray-100"
      }`}
      onClick={() => {
        setView("active");
        setCurrentPage(1);
      }}
      style={{ fontFamily: "Merriweather, serif" }}
    >
      Aktiv
    </button>
    <button
      className={`px-4 py-2 transition-all duration-200 ${
        view === "canceled"
          ? "bg-[#116769] text-white"
          : "bg-white text-gray-700 hover:bg-gray-100"
      }`}
      onClick={() => {
        setView("canceled");
        setCurrentPage(1);
      }}
      style={{ fontFamily: "Merriweather, serif" }}
    >
      Storniert
    </button>
  </div>
</div>


      {/* Lade-/Fehlerzustand */}
      {loading ? (
        <p className="text-gray-600 text-center">⏳ Lade Buchungen...</p>
      ) : error ? (
        <div className="p-6 bg-gray-100 text-center rounded-lg shadow-md">
          <p className="text-gray-700 text-lg font-medium" style={{ fontFamily: "Merriweather, serif" }}>
            {error}
          </p>
          {error.includes("noch keine Buchungen") && (
            <button
              className="mt-4 px-5 py-2 bg-[#116769] text-white rounded-md hover:bg-[#0e5756] transition duration-200"
              style={{ fontFamily: "Merriweather, serif" }}
              onClick={() => window.location.href = "/booking"}
            >
              Jetzt eine Unterkunft buchen 🏡
            </button>
          )}
        </div>
      ) : (
        <div ref={bookingContainerRef} className="space-y-6">
          {currentBookings.map((booking) => (
            <div
              key={booking.bookingNumber}
              className="p-6 bg-white shadow-lg border-gray-200 rounded-none mb-6"
            >
              <div>
                <p className="font-medium text-gray-600" style={{ fontFamily: "Merriweather, serif" }}>
                  <strong>Buchungsnummer:</strong> {booking.bookingNumber}
                </p>
                <p className="text-gray-600" style={{ fontFamily: "Merriweather, serif" }}>
                  <strong>Unterkunft:</strong> {booking.houseType}
                </p>
                <p className="text-gray-600" style={{ fontFamily: "Merriweather, serif" }}>
                  <strong>Gästeanzahl:</strong> {booking.guestCount}
                </p>
                <p className="text-gray-600" style={{ fontFamily: "Merriweather, serif" }}>
                  <strong>Tagen:</strong> {booking.totalDays}
                </p>
                <p className="text-gray-600" style={{ fontFamily: "Merriweather, serif" }}>
                  <strong>Startdatum:</strong> {formatDate(booking.startDate)}
                </p>
                <p className="text-gray-600" style={{ fontFamily: "Merriweather, serif" }}>
                  <strong>Enddatum:</strong> {formatDate(booking.endDate)}
                </p>
                <p className="text-gray-600" style={{ fontFamily: "Merriweather, serif" }}>
                  <strong>Preis pro Nacht:</strong> {booking.price} €
                </p>
                <p className="text-gray-600" style={{ fontFamily: "Merriweather, serif" }}>
                  <strong>Gesamtpreis:</strong> {booking.totalPrice} €
                </p>
                <p className="text-gray-600" style={{ fontFamily: "Merriweather, serif" }}>
                  <strong>Status:</strong> {booking.status}
                </p>
              </div>

              {booking.status !== "Canceled" && booking.status !== "CheckedOut" && (
                <div className="flex justify-end">
                  <button
                    onClick={() => handleCancelClick(booking)}
                    className="px-4 py-2 bg-[#116769] text-white border border-[#0e5756] rounded-md hover:bg-[#0e5756] transition duration-200"
                    style={{ fontFamily: "Merriweather, serif" }}
                  >
                    Stornieren
                  </button>
                </div>
              )}

              {booking.status === "Canceled" && (
                <div className="mt-4 p-2 bg-[#e6f2f1] text-[#0e5756] rounded-md" style={{ fontFamily: "Merriweather, serif" }}>
                  <p className="font-bold">Sie haben diese Buchung storniert.</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Bestätigung Popup */}
      {showConfirm && selectedBooking && (
        <div className="fixed inset-0 flex items-center justify-center p-5" style={{ fontFamily: "Merriweather, serif" }}>
          <div className="bg-[#e6f2f1] p-6 rounded-xl shadow-xl border border-gray-200 max-w-sm w-full text-center">
            <h3 className="text-xl font-semibold text-gray-700">Buchung stornieren?</h3>
            <p className="text-gray-600 mt-3">Sind Sie sicher, dass Sie die Buchung stornieren möchten?</p>
            <div className="flex justify-center mt-5 space-x-3">
              <button
                onClick={handleCancelYes}
                className="px-5 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
              >
                Stornieren
              </button>
              <button
                onClick={handleCancelNo}
                className="px-5 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
              >
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      {filteredBookings.length > bookingsPerPage && (
  <div className="flex justify-center items-center mt-6 gap-3">
    <button
      onClick={() => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
        window.scrollTo(0, 0);
      }}
      disabled={currentPage === 1}
    >
      ‹
    </button>

    <span className="text-gray-600 font-medium">
      Seite {currentPage} von {totalPages}
    </span>

    <button
      onClick={() => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
        window.scrollTo(0, 0);
      }}
      disabled={currentPage === totalPages}
    >
      ›
    </button>
  </div>
)}

    </div>
  );
};

export default BookingDetails;
