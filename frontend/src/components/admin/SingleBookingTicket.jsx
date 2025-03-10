import { useState } from 'react';

export function SingleBookingTicket({ singleBooking, onClose }) {
    const [bookingStatus, setBookingStatus]=useState(singleBooking.status);
    const handleEditStatus = async (inputStatus) => {
        try {
            const response = await fetch(`http://localhost:3000/booking/editStatus/${singleBooking.bookingNumber}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: inputStatus })  
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to update booking status');
            }
            console.log("data",data)
            setBookingStatus(data.booking.status);
        } catch (error) {
            console.error('Error updating booking status:', error.message);
        }
    };
    const handleDelete = async () => {
        if (window.confirm('Sind Sie sicher, dass Sie diese Buchung löschen möchten?')){
            try {
                const response = await fetch(`http://localhost:3000/booking/delete/${singleBooking.bookingNumber}`, {
                    method: 'DELETE'
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || 'Failed to delete booking');
                }
                onClose();
            } catch (error) {
                console.error('Error deleting booking:', error.message);
                setError(error.message);
            }
        }else{
            console.log('Löschvorgang abgebrochen');
        }
    };
    return (
    <div className='py-2 px-10 '>
        {singleBooking ? (
            <div className='border border-gray-300 p-2 rounded-lg'>
                <p>Vorname: {singleBooking.guestFirstName}</p>
                <p>Nachname: {singleBooking.guestFamilyName}</p>
                <p>E-Mail: {singleBooking.email}</p>
                <p>Anzahl der Gäste: {singleBooking.guestCount}</p>
                <p>Startdatum: {new Date(singleBooking.startDate).toLocaleDateString()}</p>
                <p>Enddatum: {new Date(singleBooking.endDate).toLocaleDateString()}</p>
                <p>Haus Typ: {singleBooking.houseType}</p>
                <p>Status: {bookingStatus}</p>
                <p>Preis: {singleBooking.price}</p>
                <p>Mobilnummer: {singleBooking.mobileNumber}</p>
                <p>Kommentare: {singleBooking.comments}</p>
            </div>
        ) : (
            <p>Buchung Number nicht gefunden.</p>
        )}
        <div className='my-20 flex space-x-6'>
            {bookingStatus === "Active" && 
            <button onClick={()=>handleEditStatus("CheckedIn")} className='bg-gray-800 text-white px-4 rounded-sm cursor-pointer hover:text-[#FAE1A8]'>Check in</button>}
            {bookingStatus === "Active" && 
            <button onClick={()=>handleEditStatus("Canceled")} className='bg-gray-800 text-white px-4 rounded-sm cursor-pointer hover:text-[#FAE1A8]'>Cancel</button>}
            {bookingStatus === "CheckedIn" && 
            <button onClick={()=>handleEditStatus("CheckedOut")} className='bg-gray-800 text-white px-4 rounded-sm cursor-pointer hover:text-[#FAE1A8]'>Check out</button>}
            <button onClick={handleDelete} className='bg-gray-800 text-white px-4 rounded-sm cursor-pointer hover:text-[#FAE1A8]'>Delete</button>
            <button onClick={onClose} className='bg-gray-800 text-white px-4 rounded-sm cursor-pointer hover:text-[#FAE1A8]'>Schließen</button>
        </div>
    </div>
    );
}

