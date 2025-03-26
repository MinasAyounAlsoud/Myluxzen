//Zahra src/components/SuccessPopup.jsx
import React from "react";

const SuccessPopup = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 shadow-lg max-w-md w-[90%] text-center">
        <h3 className="text-xl font-semibold mb-4">{message}</h3>
        <button
          onClick={onClose}
          className="bg-teal-dark text-white px-4 py-2 rounded hover:bg-teal-light"
        >
          Schließen
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
