import { useState } from 'react';
import { fetchRequestNoRes } from "../../utils/commenBookFunc.js";
import { RxCross2 } from "react-icons/rx";
import { WarningModal } from './Modal.jsx';

export function SingleBookingTicket({ singleBooking, setBookingData, onClose }) {
    const [houses, setHouses] = useState([]);
    const [selectedHouseNum,setSelectedHouseNum] = useState("");
    const [showHouses,setShowHouses] = useState(false);
    const [showWarningMsg, setShowWarningMsg] = useState(false);
    console.log("SingleBookingTicket SingleBookingTicket",singleBooking)
    const handleCancel = async()=>{
        try {
            const requestBody = {
                houseNum: singleBooking.houseNum,
                status: "Canceled",
                email: singleBooking.email // add email for cancel email
            };
            // console.log("handleCancel,requestBody", requestBody)
            const url = `${import.meta.env.VITE_SERVER_URL}/booking/cancel-or-checkout/${singleBooking.bookingNumber}`;
            // const url = `http://localhost:3000/booking/cancel-or-checkout/${singleBooking.bookingNumber}`;
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody)
            });
            if (!response.ok) throw new Error('canceled failed');
            setBookingData((prev)=>({
                ...prev,
                status: "Canceled"
            }));  
            setSelectedHouseNum("");

            setShowHouses(false);

        } catch (err) {
            // setError("VerFügbar Häuser nicht gefunden.");
            console.log("handleCancel, error", err);
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
            const url = `${import.meta.env.VITE_SERVER_URL}/singleHouse/checkin-get-houses/${singleBooking.houseType}`;
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
        if(selectedHouseNum=== "") return;
        const url = `${import.meta.env.VITE_SERVER_URL}/singleHouse/house-checkin/${selectedHouseNum}`;
        const requestBody = {
            houseNum: selectedHouseNum,
            bookingNum: singleBooking.bookingNumber,
            startDate: singleBooking.startDate,
            endDate: singleBooking.endDate,
            guestName: []
        };
        console.log("selectedHouseNum",selectedHouseNum);
        console.log("requestBody",requestBody);
        try {
            const data = await fetchRequestNoRes(url, 'PUT', requestBody);
  
            setBookingData((prev)=>({
                ...prev,
                houseNum: selectedHouseNum,
                status: "CheckedIn"
            }));  
            setSelectedHouseNum("");

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
            const url = `${import.meta.env.VITE_SERVER_URL}/booking/cancel-or-checkout/${singleBooking.bookingNumber}`;
            // const url = `http://localhost:3000/booking/cancel-or-checkout/${singleBooking.bookingNumber}`;
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody)
            });
            if (!response.ok) throw new Error('canceled failed');
            setBookingData((prev)=>({
                ...prev,
                houseNum: "",
                status: "CheckedOut"
            })); 
        } catch (err) {
            // setError("VerFügbar Häuser nicht gefunden.");
            console.log("handleCancel, error", err)
        }
    }
    const handleSelectHouse = (houseNum)=>{
        // setBookingData(prev=>({
        //     ...prev,
        //     houseNum: num
        // }));
        // setBookingData((prev) => ({
        //     ...prev,
        //     houseNumber: house.houseNum,
        //   }));
        console.log("handleSelectHouse,houseNum",houseNum)
        setSelectedHouseNum(houseNum);
    };
    const handleDelete =  () => {
        setShowWarningMsg(true);
    }
    const handleDeleteConfirm = async () => {
        try {
            const url = `${import.meta.env.VITE_SERVER_URL}/booking/delete/${singleBooking.bookingNumber}`;
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
      };
    return (
    <div className='py-2 px-10 relative text-gray-600'>
        <button className="text-[#064236] hover:text-black text-xl cursor-pointer hover:bg-gray-300 p-1 rounded-md absolute right-0 top-0" onClick={onClose}>
            <RxCross2 />
        </button>
        {singleBooking ? (
            <div className='border border-gray-300 p-2 rounded-lg'>
                <p><span className='text-gray-400 text-sm'>Buchung Nummer: </span> {singleBooking.bookingNumber}</p>
                <p><span className='text-gray-400 text-sm'>Gast Name: </span>{singleBooking.guestFirstName} {singleBooking.guestFamilyName}</p>
                <p><span className='text-gray-400 text-sm'>E-Mail:</span> {singleBooking.email}</p>
                <p><span className='text-gray-400 text-sm'>Anzahl der Gäste: </span>{singleBooking.guestCount}</p>
                <p><span className='text-gray-400 text-sm'>Startdatum:</span> {new Date(singleBooking.startDate).toLocaleDateString('de-DE')}</p>
                <p><span className='text-gray-400 text-sm'>Enddatum:</span> {new Date(singleBooking.endDate).toLocaleDateString('de-DE')}</p>
                <p><span className='text-gray-400 text-sm'>Haus Nummer:</span> {singleBooking.houseNum}</p>
                <p><span className='text-gray-400 text-sm'>Haus Typ:</span> {singleBooking.houseType}</p>
                <p><span className='text-gray-400 text-sm'>Status:</span> {singleBooking.status}</p>
                <p><span className='text-gray-400 text-sm'>Preis:</span> {singleBooking.price}</p>
                <p><span className='text-gray-400 text-sm'>Dauert Tage:</span> {singleBooking.totalDays}</p>
                <p><span className='text-gray-400 text-sm'>Total Preis:</span> {singleBooking.totalPrice}</p>
                <p><span className='text-gray-400 text-sm'>Erstellt um:</span> {new Date(singleBooking.createdAt).toLocaleDateString('de-DE')}</p>
                {singleBooking.mobileNumber !=="" && <p><span className='text-gray-400 text-sm'>Mobilnummer:</span> {singleBooking.mobileNumber}</p>}
                {singleBooking.comments!== "" && <p><span className='text-gray-400 text-sm'>Kommentare:</span> {singleBooking.comments}</p>}
            </div>
        ) : (
            <p>Buchung Number nicht gefunden.</p>
        )}
                <WarningModal isOpen={showWarningMsg} >
            <p className='mb-4'>Möchten Sie diesen Auftrag wirklich löschen?</p>
            <div className='flex gap-6 justify-around mb-2'>
                <button onClick={onClose} className='bg-gray-600 text-white p-1 px-2 rounded-full cursor-pointer hover:text-[#fae1a8]'>Abbrechen</button>
                <button onClick={handleDeleteConfirm} className='bg-gray-600 text-white p-1 px-2 rounded-full cursor-pointer hover:text-[#fae1a8]'>Bestätigen</button>
            </div>
            </WarningModal>

        <div className='mt-10 mb-4 flex space-x-6'>
            {singleBooking.status === "Active" && 
            <button onClick={handleCheckIn} className='bg-teal-dark text-white px-4 rounded-full cursor-pointer hover:text-[#FAE1A8]'>Check in</button>}
            {singleBooking.status === "Active" && 
            <button onClick={handleCancel} className='bg-teal-dark text-white px-4 rounded-full cursor-pointer hover:text-[#FAE1A8]'>Cancel</button>}
            {singleBooking.status === "CheckedIn" && 
            <button onClick={handleCheckOut} className='bg-teal-dark text-white px-4 rounded-full cursor-pointer hover:text-[#FAE1A8]'>Check out</button>}
            {singleBooking.status !== "CheckedIn" && 
            <button onClick={handleDelete} className='bg-teal-dark text-white px-4 rounded-full cursor-pointer hover:text-[#FAE1A8]'>Delete</button>}
            {/* <button onClick={onClose} className='bg-teal-dark text-white px-4 rounded-full cursor-pointer hover:text-[#FAE1A8]'>Schließen</button> */}
        </div>

        { showHouses && <>{(houses.length === 0 ) ? (
            <p className='text-[#9C785E]'>Keine verfügbare Häuser</p>
        ) : (
            // <ul className='flex flex-col space-y-2 '>
            //     {houses.map((house, index) => (
            //         <li key={index} className={`border border-gray-300 py-1 px-1 rounded-md flex justify-between px-4 text-gray-600 `}
            //         >
            //             <div>
            //                 <p>Hause Nummer: {house.houseNum}</p>
            //                 <p>House Type: {house.houseType}</p>
            //             </div>
            //             {/* <p>Gast Name: {house.guestFirstName} {house.guestFamilyName}</p>
            //             <p>Date: {house.startDate} to {house.endDate}</p> */}
            //             <button className={`text-white  py-1 px-1 h-8 rounded-md  text-sm bg-gray-600 ` }
            //             onClick={() => handleSelectHouse(house)}
            //             >
            //                 Auswahlen
            //             </button>
            //         </li>
            //     ))}
            // </ul>
            <select className="border mt-2 border-gray-300 py-2 px-4 rounded-md text-gray-600" onChange={e => handleSelectHouse(e.target.value)}>
                <option value="">Bitte ein Haus auswählen</option>
                {houses.map((house, index) => (
                    <option key={index} value={house.houseNum}>
                    Haus Nummer: {house.houseNum}
                    </option>
                ))}
            </select>
        )}</>}
        {(selectedHouseNum) && (
            <div className='mb-10 mt-10 flex gap-4 items-center'>
                <p>Sie haben Haus {selectedHouseNum} ausgewahlt. </p>
                <button className='bg-teal-dark text-white px-4 rounded-full cursor-pointer hover:text-[#FAE1A8]'
                    onClick={()=>handleCheckInConfirm(selectedHouseNum)}>Checkin Bestätigen</button>
                {/* <div className='flex space-x-10 items-center'>
                    <p>Click hier zu checkin</p>
                    <button className='text-white bg-gray-700 py-1 px-1 h-8 rounded-md cursor-pointer text-sm'
                    onClick={()=>handleCheckInConfirm(selectedHouseNum)}>Bestätigen</button>
                </div> */}
            </div>
        )}
    </div>
    );
}

