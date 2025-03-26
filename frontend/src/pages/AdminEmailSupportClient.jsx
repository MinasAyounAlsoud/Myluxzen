import React, { useEffect, useState } from "react";

const AdminEmailSupportClient = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/contact/all", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setMessages(data.reverse()));
  }, []);

  const handleReplySubmit = async () => {
    if (!selectedMessage || !responseText) return;

    setLoading(true);

    await fetch("http://localhost:3000/api/contact/reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        id: selectedMessage._id,
        email: selectedMessage.email,
        responseText,
      }),
    });

    setMessages((prev) =>
      prev.map((msg) =>
        msg._id === selectedMessage._id
          ? { ...msg, status: "replied", reply: responseText }
          : msg
      )
    );

    setSelectedMessage(null);
    setResponseText("");
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto text-teal-dark">
      <h1 className="text-3xl font-bold mb-6">E-Mail Support - Kundenanfragen</h1>

      {messages.length === 0 && (
        <p className="text-gray-500">Keine Nachrichten vorhanden.</p>
      )}

      <ul className="space-y-4">
        {messages.map((msg) => (
          <li
            key={msg._id}
            className="border rounded-xl p-4 shadow hover:shadow-lg transition bg-white"
          >
            <p className="text-sm text-gray-400">
              {new Date(msg.createdAt).toLocaleString("de-DE")}
            </p>
            <p>
              <strong>Von:</strong> {msg.name} ({msg.email})
            </p>
            <p className="my-2">
              <strong>Nachricht:</strong> {msg.message}
            </p>
            <p className="text-sm italic text-teal-dark">
              Status:{" "}
              <span
                className={`font-semibold ${
                  msg.status === "replied" ? "text-green-600" : "text-red-500"
                }`}
              >
                {msg.status === "replied" ? "Beantwortet" : "Offen"}
              </span>
            </p>

            {msg.status !== "replied" && (
              <button
                onClick={() => setSelectedMessage(msg)}
                className="mt-3 bg-teal-dark text-white px-4 py-2 rounded hover:bg-teal-light"
              >
                Antworten
              </button>
            )}

            {msg.reply && (
              <div className="mt-3 text-sm text-gray-700">
                <strong>Gesendete Antwort:</strong>
                <div className="bg-gray-100 p-2 mt-1 rounded">{msg.reply}</div>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Modal zum Antworten */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md relative text-teal-dark">
            <button
              onClick={() => setSelectedMessage(null)}
              className="absolute top-3 right-4 text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-2">
              Antwort an {selectedMessage.name}
            </h2>
            <textarea
              rows="5"
              className="w-full border p-2 rounded"
              placeholder="Ihre Antwort..."
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
            ></textarea>
            <button
              onClick={handleReplySubmit}
              disabled={loading}
              className="mt-4 bg-teal-dark text-white px-4 py-2 rounded hover:bg-teal-light"
            >
              {loading ? "Senden..." : "Antwort senden"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEmailSupportClient;
