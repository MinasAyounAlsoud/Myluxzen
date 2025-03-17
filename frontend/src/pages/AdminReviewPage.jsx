import { useEffect, useState } from "react";

export function AdminReviewPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/reviews/admin")
      .then((res) => res.json())
      .then(setReviews);
  }, []);
  const updateReview = (id, isApproved) => {
    fetch(`http://localhost:3000/api/reviews/admin/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isApproved }),
    }).then(() => setReviews(reviews.filter((r) => r._id !== id)));
  };

  const handleReject = async (id) => {
    await fetch(`http://localhost:3000/api/reviews/${id}`, {
      method: "DELETE",
    });
    setReviews(reviews.filter((r) => r._id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Admin Review Page</h2>
      {reviews.map((review) => (
        <div key={review._id} className="p-4 bg-white rounded">
          <p>{review.name}</p>
          <p>{review.email}</p>
          <p>{review.title}</p>
          <p>{review.comment}</p>
          <button
            onClick={() => updateReview(review._id, true)}
            className="bg-green-400 p-2 m-2 rounded"
          >
            Approve
          </button>
          <button
            onClick={() => handleReject(review._id)}
            className="bg-gray-400 p-2 m-2 rounded"
          >
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}
