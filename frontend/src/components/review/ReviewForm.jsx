import { useState } from "react";

export function ReviewForm({ onReviewAdded }) {
  const [review, setReview] = useState({
    name: "",
    email: "",
    rating: 0, // Anfangswert auf 0 setzen
    month: "January", // Standardmonat
    year: new Date().getFullYear(), // Standardjahr
    guestType: "Guest",
    title: "",
    comment: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/reviews/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    });

    if (response.ok) {
      setSuccess(true);
      onReviewAdded(); // Optional: Diese Funktion sorgt dafür, dass nach erfolgreichem Hinzufügen die Liste der Reviews neu geladen wird.
    } else {
      console.error("Fehler beim Senden der Bewertung:", response.statusText);
    }
  };

  const handleRatingChange = (value) => {
    setReview({ ...review, rating: value });
  };

  return (
    <div className="container mx-auto px-4">
      <div className="p-6 bg-white shadow rounded-lg w-full max-w-lg mx-auto">
        {success && (
          <div className="bg-green-500 text-white p-2 mb-4">
            Your review request was sent successfully!
          </div>
        )}
        {/* Rating: Stars */}
        <div className="flex flex-wrap space-x-2 mb-4">
          <h3 className="text-2xl font-semibold text-gray-600 mr-3">Rating</h3>

          {[1, 2, 3, 4, 5].map((r) => (
            <div
              key={r}
              className={`cursor-pointer text-2xl ${
                review.rating >= r ? "text-[#a98162]" : "text-gray-300"
              } hover:text-[#a98162]`}
              onClick={() => handleRatingChange(r)} // Setzt die Bewertung auf den angeklickten Wert
            >
              ★
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="name"
            onChange={handleChange}
            value={review.name}
            placeholder="Name"
            className="w-full bg-gray-50 p-3 rounded-md border border-gray-300 mt-2"
            required
          />
          <input
            name="email"
            onChange={handleChange}
            value={review.email}
            placeholder="Email"
            className="w-full bg-gray-50 p-3 rounded-md border border-gray-300 mt-2"
            required
          />
          {/* Monat-Auswahl */}
          <select
            name="month"
            value={review.month}
            onChange={handleChange}
            className="w-full bg-gray-50 p-3 rounded-md border border-gray-300 mt-2"
          >
            <option value="" disabled>
              Select a month
            </option>
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          {/* Jahr-Auswahl */}
          <select
            name="year"
            value={review.year}
            onChange={handleChange}
            className="w-full bg-gray-50 p-3 rounded-md border border-gray-300 mt-2"
          >
            <option value="" disabled>
              Select a year
            </option>
            {Array.from(
              { length: 10 },
              (_, i) => new Date().getFullYear() - i
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <input
            name="title"
            onChange={handleChange}
            value={review.title}
            placeholder="Review Title"
            className="w-full bg-gray-50 p-3 rounded-md border border-gray-300 mt-2"
            required
          />
          <textarea
            name="comment"
            onChange={handleChange}
            value={review.comment}
            placeholder="Your comment"
            className="w-full bg-gray-50 p-3 rounded-md border border-gray-300 mt-2"
            required
          />
          <button
            type="submit"
            className="px-5 py-2 bg-neutral-400 text-white rounded-md hover:bg-[#064236] mt-4"
          >
            Add Review
          </button>
        </form>
      </div>
    </div>
  );
}
