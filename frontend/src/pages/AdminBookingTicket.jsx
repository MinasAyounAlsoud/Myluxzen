import React, { useState } from 'react';
import {SingleBookingTicket} from '../components/admin/SingleBookingTicket'; // 确保路径正确

export function AdminBookingTicket() {
    const [bookingNumber, setBookingNumber] = useState('');
    const [bookingData, setBookingData] = useState(null);
    const [error, setError] = useState('');
    const [showDetails, setShowDetails] = useState(false);

    const fetchBooking = async () => {
        try {
            const response = await fetch(`http://localhost:3000/booking/byBookingNum/${bookingNumber}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              });
            if (!response.ok) throw new Error('Buchung Number nicht gefunden.');
            const data = await response.json();
            setBookingData(data);
            setShowDetails(true);
            setError('');
        } catch (err) {
            setError(err.message);
            setBookingData(null);
            setShowDetails(false);
        }
    };

    return (
        <div className='py-4 px-10 '>
            {!showDetails ? (
                <div className='flex space-x-6 py-2'>
                    <label htmlFor="bookingNumber">Buchung Number:</label>
                    <input
                        type="text"
                        id="bookingNumber"
                        value={bookingNumber}
                        onChange={(e) => setBookingNumber(e.target.value)}
                        placeholder="Buchung Number eingeben"
                        className='border border-gray-300 px-2 rounded-sm'
                    />
                    <button onClick={fetchBooking}
                    className='bg-gray-800 text-white px-4 rounded-sm cursor-pointer hover:text-[#FAE1A8]'>Suchen</button>
                    {error && <p>{error}</p>}
                </div>
            ) : (
                <SingleBookingTicket
                singleBooking={bookingData}
                    onClose={() => setShowDetails(false)}
                />
            )}
        </div>
    );
}

