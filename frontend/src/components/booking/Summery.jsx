import { IoMdInformationCircleOutline } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import { MdOutlineEuro } from "react-icons/md";
export const Summery = ({newBooking, completed})=>{
    // const { houseType, guestFirstName, guestFamilyName, email, guestCount, startDate, endDate, price,mobileNumber, comments } = newBooking;        
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };
    return (
    <div className="bg-white w-full p-4 border rounded-lg shadow border-gray-300 text-gray-500">
        <div className="text-2xl py-2 text-gray-700 font-bold">
        Reservierungszusammenfassung
        </div>
        <div className="border-t border-gray-200 my-4"></div>
        {newBooking.houseType ? (
        <>
            {completed &&
            (<div>
                <div className='text-gray-700 flex pt-4 flex justify-between'>
                <p>Buchungs-Ticketnummer : </p>
                <p> {newBooking.bookingNumber}</p>
                </div>
                <div className="border-t border-gray-200 my-4"></div>
            </div>)}
            <div className="flex justify-between items-center my-2">
                <div>{newBooking.houseTitle}</div>
                {newBooking.houseNum && <div className="flex space-x-2"><p>Hausnummer: </p><p>{newBooking.houseNum}</p></div>}
                {/* <button className="px-4 py-2 rounded border border-gray-300 text-xs">More details</button> */}
            </div>
            <div className="border-t border-gray-200 my-4"></div>
            <div className='text-gray-700'>Datum: </div>
            {(newBooking.startDate && newBooking.endDate )&&<div className='flex justify-between'>
                <div>{formatDate(newBooking.startDate)} - {formatDate(newBooking.endDate)}</div>
                {newBooking.totalDays} {newBooking.totalDays === 1 ? 'Tag' : 'Tage'}
            </div>}
            <div>{newBooking.guestCount} Gast{newBooking.guestCount > 1 ? 'e' : ''}</div>
            <div className="border-t border-gray-200 my-4"></div>
            <div >
                <p className='text-gray-700'>Gastinformationen: </p>
                <div className='flex items-center'>
                    <p className='pr-2'>{newBooking.guestFirstName}</p>
                    <p>{newBooking.guestFamilyName}</p>
                </div>
                <p>{newBooking.email}</p>
                <p>{newBooking.mobileNumber}</p>
                <p>{newBooking.comments}</p>
            </div>
            <div className="border-t border-gray-200 my-4"></div>
            <div className="flex justify-between items-center">
                <p>Price: </p>
                <div className='flex items-center'><MdOutlineEuro />{newBooking.price} per Nacht </div>
            </div>
            <div className="text-xl py-2 text-gray-700 font-bold flex justify-between items-center">
                <p>Gesamtpreis: </p>
                <div className='flex items-center'><MdOutlineEuro />{newBooking.totalPrice} </div>
            </div>
            <div> 
                (inklusive Steuern)
            </div>
        </>
        ) : (
        <>
            <div className='text-gray-500'>Kein Haus ausgewählt</div>
            <div class="flex items-center p-4 rounded-lg text-gray-500">
                <div class="rounded-lg p-1 bg-gray-200">
                <CiImageOn size={24}/>
                </div>
                <p class="ml-4">Kein Haus ausgewählt</p>
            </div>
            <div className="border-t border-gray-200 my-4"></div>

            <div class="flex items-center p-4 bg-[#E8F3FE] rounded-lg text-gray-500">
                <div class="rounded-full p-2">
                    <IoMdInformationCircleOutline size={24} />
                </div>
                <p class="ml-4">Sie werden die Zusammenfassung sehen, nachdem Sie im Schritt 'Häuser' ein Haus ausgewählt haben.</p>
            </div>
        </>
        )}
    </div>
    );
};