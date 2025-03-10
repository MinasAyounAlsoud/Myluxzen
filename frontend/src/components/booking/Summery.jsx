import { IoMdInformationCircleOutline } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import { MdOutlineEuro } from "react-icons/md";
export const Summery = ({newBooking, completed})=>{
    const { houseType, guestFirstName, guestFamilyName, email, guestCount, startDate, endDate, price,mobileNumber, comments } = newBooking;        
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };
    // console.log(newBooking)
    const calculateTotalPrice = () => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const msPerDay = 1000 * 3600 * 24;
        const days = Math.round((end - start) / msPerDay); 
        const totalPrice = days * price;
        return totalPrice.toFixed(2); 
    };
    const calculateTotalDays = () => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const msPerDay = 1000 * 3600 * 24;
        const days = Math.round((end - start) / msPerDay); 
        return days; 
    };
    return (
    <div className="bg-white w-full p-4 border rounded-lg shadow border-gray-300 text-gray-500">
        <div className="text-2xl py-2 text-gray-700 font-bold">
            Reservation Summary
        </div>
        <div className="border-t border-gray-200 my-4"></div>
        {houseType ? (
        <>
            {completed &&
            (<div>
                <div className='text-gray-700 flex pt-4 flex justify-between'>
                <p>Booking ticket number : </p>
                <p> {newBooking.bookingNumber}</p>
                </div>
                <div className="border-t border-gray-200 my-4"></div>
            </div>)}
            <div className="flex justify-between items-center my-2">
                <div>{houseType}</div>
                <button className="px-4 py-2 rounded border border-gray-300 text-xs">More details</button>
            </div>
            <div className="border-t border-gray-200 my-4"></div>
            <div className='text-gray-700'>Date: </div>
            <div className='flex justify-between'>
                <div>{formatDate(startDate)} - {formatDate(endDate)}</div>
                <div>{calculateTotalDays()} Days</div>
            </div>
            <div>{guestCount} guest{guestCount > 1 ? 's' : ''}</div>
            <div className="border-t border-gray-200 my-4"></div>
            <div >
                <p className='text-gray-700'>Guest information: </p>
                <div className='flex items-center'>
                    <p className='pr-2'>{guestFirstName}</p>
                    <p>{guestFamilyName}</p>
                </div>
                <p>{email}</p>
                <p>{mobileNumber}</p>
                <p>{comments}</p>
            </div>
            <div className="border-t border-gray-200 my-4"></div>
            <div className="flex justify-between items-center">
                <p>House price: </p>
                <div className='flex items-center'><MdOutlineEuro />{price} per night </div>
            </div>
            <div className="text-xl py-2 text-gray-700 font-bold flex justify-between items-center">
                <p>Total Price: </p>
                <div className='flex items-center'><MdOutlineEuro />{calculateTotalPrice()} </div>
            </div>
            <div> 
                (excluding taxes)
            </div>
        </>
        ) : (
        <>
            <div className='text-gray-500'>No room selected</div>
            <div class="flex items-center p-4 rounded-lg text-gray-500">
                <div class="rounded-lg p-1 bg-gray-200">
                <CiImageOn size={24}/>
                </div>
                <p class="ml-4">No room selected</p>
            </div>
            <div className="border-t border-gray-200 my-4"></div>

            <div class="flex items-center p-4 bg-[#E8F3FE] rounded-lg text-gray-500">
                <div class="rounded-full p-2">
                    <IoMdInformationCircleOutline size={24} />
                </div>
                <p class="ml-4">You will see the summary after selecting a room in the "Room" step.</p>
            </div>
        </>
        )}
    </div>
    );
};