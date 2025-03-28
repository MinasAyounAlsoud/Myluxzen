import React from 'react';

export const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-200 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-8 md:p-8 rounded-lg shadow-xl mx-4">
                {children}
            </div>
        </div>
    );
};
