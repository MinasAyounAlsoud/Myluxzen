import { useState } from 'react';
import { AdminReserveForm } from './AdminReserveForm';


export function SingleHouseCard({ house, seHouse, onClose }) {
    console.log("SingleHouseCard , house",house)
    const [showAdminReserveForm, setShowAdminReserveForm] = useState(false);
    const [inUsePeriods, setInUsePeriods] = useState(house.inUsePeriods);
    const handleAdminReserve = () => {
        setShowAdminReserveForm(true);
    };
    const handleAdminReserveConfirm = async ()=>{
        try {
            const requestBody = {
                inUsePeriods:inUsePeriods
            };
            console.log("handleCheckOut,requestBody", requestBody);
            const url = `${import.meta.env.VITE_SERVER_URL}/singleHouse/admin-reserve/${house.houseNum}`;
            // const url = `http://localhost:3000/singleHouse/admin-reserve/${house.houseNum}`;
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
    return (
    <>
<div className='py-2 px-10 '>
        { house ? (
            <div className='border border-gray-300 p-2 rounded-lg'>
                <p><span className='text-gray-500 text-sm'>Haus Nummer: </span> {house.houseNum}</p>
                <p><span className='text-gray-500 text-sm'>Haus Type: </span>{house.houseType}</p>
                {house.bookingNum && 
                <div>
                    <span className='text-gray-500'>Gäste CheckedIn</span>
                    <p> {house.bookingNum}</p>
                    <p><span className='text-gray-500 text-sm'>Startdatum:</span> {new Date(house.startDate).toLocaleDateString()}</p>
                    <p><span className='text-gray-500 text-sm'>Enddatum:</span> {new Date(house.endDate).toLocaleDateString()}</p>
                </div>}
                {house.bookingReservePeriods.length > 0 && 
                <div>
                    <span className='text-gray-500'>Gast eingecheckt : </span>
                    <ul>
                    {
                        house.bookingReservePeriods.map((booking)=>(
                            <li key={booking.bookingNum} >
                                <p><span className='text-gray-500 text-sm'>Buchungsnummer: </span>{booking.bookingNum}</p>
                                <p><span className='text-gray-500 text-sm'>Zeitraum: </span>
                                {new Date(booking.startDate).toLocaleDateString('de-DE')}  
                                <span className='text-gray-500 text-sm'> bis </span>
                                {new Date(booking.endDate).toLocaleDateString('de-DE')}</p>
                                
                            </li>
                        ))
                    }
                    </ul>
                </div>}
                {house.inUsePeriods.length > 0 && 
                <div>
                    <span className='text-gray-500'>Reserviert von Admin, Zeiträume und Buchungsnummern</span>
                    <ul>
                    {
                        house.inUsePeriods.map((inUse,index)=>(
                            <li key={index} className=''>
                                <p><span className='text-sm, text-gray-500'>Grund:</span>{inUse.reason}</p>
                                 <p><span>Zeitraum:</span>{new Date(inUse.startDate).toLocaleDateString('de-DE')} bis  
                                 {new Date(inUse.endDate).toLocaleDateString('de-DE')}</p>
                                 
                            </li>
                        ))
                    }
                    </ul>
                </div>}
            </div>
        ) : (
            <p>Haus nicht gefunden.</p>
        )}
        <div className='mt-10 mb-4 flex space-x-6'>
            <button onClick={handleAdminReserve} className='bg-gray-800 text-white px-4 rounded-sm cursor-pointer hover:text-[#FAE1A8]'>Admin Reservieren </button>
            <button onClick={onClose} className='bg-gray-800 text-white px-4 rounded-sm cursor-pointer hover:text-[#FAE1A8]'>Schließen</button>
        </div>
    </div> 
    { showAdminReserveForm &&       <div>
        <AdminReserveForm inUsePeriods={inUsePeriods} setInUsePeriods={setInUsePeriods} onClose={()=>setShowAdminReserveForm(false)} handleAdminReserveConfirm={handleAdminReserveConfirm}></AdminReserveForm>
    </div>
    }
    </>
    );

}
