import { useState } from 'react';
import { fetchRequestNoRes } from "../../utils/commenBookFunc.js";

export function SingleBookingTicket({ singleBooking, setBookingData, onClose }) {
    const [houses, setHouses] = useState([]);
    const [selectedHouse,setSelectedHouse] = useState(null);
    const [showHouses,setShowHouses] = useState(false);
    console.log("SingleBookingTicket SingleBookingTicket",singleBooking)
    const handleCancel = async()=>{
        try {
            const requestBody = {
                houseNum: singleBooking.houseNum,
                status: "Canceled",
                email: singleBooking.email // add email for cancel email
            };
            // console.log("handleCancel,requestBody", requestBody)
            const url = `${import.meta.env.VITE_SERVER_URL}:${import.meta.env.VITE_SERVER_PORT}/booking/cancel-or-checkout/${singleBooking.bookingNumber}`;
            // const url = `http://localhost:3000/booking/cancel-or-checkout/${singleBooking.bookingNumber}`;
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody)
            });
            if (!response.ok) throw new Error('canceled failed');
        } catch (err) {
            // setError("VerFügbar Häuser nicht gefunden.");
            console.log("handleCancel, error", err)
        }
    };

    //when click "checkin", fetch singlehouses to choose
    const handleCheckIn = async()=>{
        try {
            const requestBody = {
                startDate: singleBooking.startDate,
                endDate: singleBooking.endDate,
                bookingNum: singleBooking.bookingNumber,
                houseNum: singleBooking.houseNum
            };
            console.log("handleCheckIn,requestBody", requestBody)
            const url = `${import.meta.env.VITE_SERVER_URL}:${import.meta.env.VITE_SERVER_PORT}/singleHouse/checkin-get-houses/${singleBooking.houseType}`;
            // const url = `http://localhost:3000/singleHouse/checkin-get-houses/${singleBooking.houseType}`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody)
            });
            if (!response.ok) throw new Error('no available houses.');
            const data = await response.json();
            if(data === null) throw new Error('no available houses.');
            if (data.returnHouses === false){
                setHouses([]);
            }else{

                setHouses(data);
                setShowHouses(true);            
            }
        } catch (err) {
            // setError("VerFügbar Häuser nicht gefunden.");
            setHouses([]);
        }
    };
    const handleCheckInConfirm = async()=>{
        if(selectedHouse=== null) return;
        const url = `${import.meta.env.VITE_SERVER_URL}:${import.meta.env.VITE_SERVER_PORT}/booking/delete/${singleBooking.bookingNumber}`;
        // const url = `http://localhost:3000/booking/delete/${singleBooking.bookingNumber}`;
        const requestBody = {
            houseNum: selectedHouse.houseNum,
            bookingNum: singleBooking.bookingNumber,
            startDate: singleBooking.startDate,
            endDate: singleBooking.endDate,
            guestName: []
        };
        console.log("selectedHouse.houseNum",selectedHouse.houseNum);
        console.log("requestBody",requestBody);
        try {
            const data = await fetchRequestNoRes(url, 'PUT', requestBody);
            setSelectedHouse(null);
            setBookingData((prev)=>({
                ...prev,
                houseNum: selectedHouse.houseNum,
                status: "CheckedIn"
            }));  
            setShowHouses(false);

        } catch (error) {
            console.error('Error in handleCheckInConfirm:', error);
        }
    }
    const handleCheckOut = async()=>{
        try {
            const requestBody = {
                houseNum: singleBooking.houseNum,
                status: "CheckedOut"
            };
            console.log("handleCheckOut,requestBody", requestBody)
            const url = `${import.meta.env.VITE_SERVER_URL}:${import.meta.env.VITE_SERVER_PORT}/booking/cancel-or-checkout/${singleBooking.bookingNumber}`;
            // const url = `http://localhost:3000/booking/cancel-or-checkout/${singleBooking.bookingNumber}`;
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody)
            });
            if (!response.ok) throw new Error('canceled failed');
        } catch (err) {
            // setError("VerFügbar Häuser nicht gefunden.");
            console.log("handleCancel, error", err)
        }
    }
    const handleSelectHouse = (house)=>{
        // setBookingData(prev=>({
        //     ...prev,
        //     houseNum: num
        // }));
        // setBookingData((prev) => ({
        //     ...prev,
        //     houseNumber: house.houseNum,
        //   }));
        setSelectedHouse(house);
    };
    const handleDelete = async () => {
        if (window.confirm('Sind Sie sicher, dass Sie diese Buchung löschen möchten?')){
            try {
                const url = `${import.meta.env.VITE_SERVER_URL}:${import.meta.env.VITE_SERVER_PORT}/booking/delete/${singleBooking.bookingNumber}`;
                // const url = `http://localhost:3000/booking/delete/${singleBooking.bookingNumber}`;
                const response = await fetch(url, {
                    method: 'DELETE'
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || 'Failed to delete booking');
                }
                onClose();
            } catch (error) {
                console.error('Error deleting booking:', error.message);
                // setError(error.message);
            }
        }else{
            console.log('Löschvorgang abgebrochen');
        }
    };
    return (
    <div className='py-2 px-10 '>
        {singleBooking ? (
            <div className='border border-gray-300 p-2 rounded-lg'>
                <p><span className='text-gray-500 text-sm'>Buchung Nummer: </span> {singleBooking.bookingNumber}</p>
                <p><span className='text-gray-500 text-sm'>Gast Name: </span>{singleBooking.guestFirstName} {singleBooking.guestFamilyName}</p>
                <p><span className='text-gray-500 text-sm'>E-Mail:</span> {singleBooking.email}</p>
                <p><span className='text-gray-500 text-sm'>Anzahl der Gäste: </span>{singleBooking.guestCount}</p>
                <p><span className='text-gray-500 text-sm'>Startdatum:</span> {new Date(singleBooking.startDate).toLocaleDateString()}</p>
                <p><span className='text-gray-500 text-sm'>Enddatum:</span> {new Date(singleBooking.endDate).toLocaleDateString()}</p>
                <p><span className='text-gray-500 text-sm'>Haus Nummer:</span> {singleBooking.houseNum}</p>
                <p><span className='text-gray-500 text-sm'>Haus Typ:</span> {singleBooking.houseType}</p>
                <p><span className='text-gray-500 text-sm'>Status:</span> {singleBooking.status}</p>
                <p><span className='text-gray-500 text-sm'>Preis:</span> {singleBooking.price}</p>
                <p><span className='text-gray-500 text-sm'>Dauert Tage:</span> {singleBooking.totalDays}</p>
                <p><span className='text-gray-500 text-sm'>Total Preis:</span> {singleBooking.totalPrice}</p>
                {singleBooking.mobileNumber !=="" && <p><span className='text-gray-500 text-sm'>Mobilnummer:</span> {singleBooking.mobileNumber}</p>}
                {singleBooking.comments!== "" && <p><span className='text-gray-500 text-sm'>Kommentare:</span> {singleBooking.comments}</p>}
            </div>
        ) : (
            <p>Buchung Number nicht gefunden.</p>
        )}
        <div className='mt-10 mb-4 flex space-x-6'>
            {singleBooking.status === "Active" && 
            <button onClick={handleCheckIn} className='bg-gray-800 text-white px-4 rounded-sm cursor-pointer hover:text-[#FAE1A8]'>Check in</button>}
            {singleBooking.status === "Active" && 
            <button onClick={handleCancel} className='bg-gray-800 text-white px-4 rounded-sm cursor-pointer hover:text-[#FAE1A8]'>Cancel</button>}
            {singleBooking.status === "CheckedIn" && 
            <button onClick={handleCheckOut} className='bg-gray-800 text-white px-4 rounded-sm cursor-pointer hover:text-[#FAE1A8]'>Check out</button>}
            {singleBooking.status !== "CheckedIn" && 
            <button onClick={handleDelete} className='bg-gray-800 text-white px-4 rounded-sm cursor-pointer hover:text-[#FAE1A8]'>Delete</button>}
            <button onClick={onClose} className='bg-gray-800 text-white px-4 rounded-sm cursor-pointer hover:text-[#FAE1A8]'>Schließen</button>
        </div>
        {(selectedHouse) && (
            <div className='pb-10'>
                <p>Sie haben Haus {selectedHouse.houseNum} ausgewahlt. </p>
                <div className='flex space-x-10 items-center'>
                    <p>Click hier zu checkin</p>
                    <button className='text-white bg-gray-700 py-1 px-1 h-8 rounded-md cursor-pointer text-sm'
                    onClick={()=>handleCheckInConfirm(selectedHouse)}>Bestätigen</button>
                </div>
            </div>
        )}
        { showHouses && <>{(houses.length === 0 ) ? (
            <p>Keine verfügbare Häuser</p>
        ) : (
            <ul className='flex flex-col space-y-2 '>
                {houses.map((house, index) => (
                    <li key={index} className={`border border-gray-300 py-1 px-1 rounded-md flex justify-between px-4 text-gray-600 `}
                    >
                        <div>
                            <p>Hause Nummer: {house.houseNum}</p>
                            <p>House Type: {house.houseType}</p>
                            <p>House Status: {house.status}</p>
                        </div>
                        {/* <p>Gast Name: {house.guestFirstName} {house.guestFamilyName}</p>
                        <p>Date: {house.startDate} to {house.endDate}</p> */}
                        <button className={`text-white  py-1 px-1 h-8 rounded-md  text-sm bg-gray-600 ` }
                        onClick={() => handleSelectHouse(house)}
                        >
                            Auswahlen
                        </button>
                    </li>
                ))}
            </ul>
        )}</>}

    </div>
    );
}

