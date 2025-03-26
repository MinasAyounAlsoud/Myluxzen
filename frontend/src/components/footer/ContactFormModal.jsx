//zahra

import React, { useState } from "react";
import SuccessPopup from "./SuccessPopup"; // 

const ContactFormModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [showSuccess, setShowSuccess] = useState(false); // 🆕

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include"
    });

    setShowSuccess(true); // 🎉 Affiche le message de succès
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    onClose(); // ferme la modal d'origine ensuite
  };

  return (
    <>
      <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-2xl w-[90%] max-w-lg shadow-xl text-teal-dark relative">
          <button onClick={onClose} className="absolute top-3 right-3 text-xl">&times;</button>
          <h2 className="text-2xl font-bold mb-4">Kontaktieren Sie uns</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="E-Mail-Adresse"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <textarea
              name="message"
              placeholder="Ihre Nachricht"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            ></textarea>
            <button type="submit" className="bg-teal-dark text-white px-4 py-2 rounded hover:bg-teal-light">
              Senden
            </button>
          </form>
        </div>
      </div>

      {showSuccess && (
        <SuccessPopup
          message="Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet."
          onClose={handleCloseSuccess}
        />
      )}
    </>
  );
};

export default ContactFormModal;
