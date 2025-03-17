import { useState, useEffect } from 'react';
import { ApartmentCard,ApartmentModal } from "./ApartmentCard";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaArrowTurnUp } from "react-icons/fa6";
export const HouseSelect = ({newBooking, setNewBooking,gotoNextStep,setStepCompleted,setGotoNextStep})=>{
  const [availableRooms, setAvailableRooms] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedApartment, setSelectedApartment] = useState(null);
  
  useEffect(()=>{
      if(gotoNextStep=== true){
          //varify if important information has been inputed
          if(newBooking.houseType === ""){
              setErrorMessage("You need to select an available house for booking.");
              setStepCompleted(false);
              setGotoNextStep(false);
          }else{
              setErrorMessage("");
              setStepCompleted(true);
              setGotoNextStep(false);
          }
      }
  },[gotoNextStep]);
  const calculateTotalPrice = (booking, price) => {
    const start = new Date(booking.startDate);
    const end = new Date(booking.endDate);
    const msPerDay = 1000 * 3600 * 24;
    // const days = Math.round((end - start) / msPerDay); 
    const totalPrice = booking.totalDays * price;
    return totalPrice.toFixed(2); 
};

// const calculateTotalDays = (booking) => {
//   const start = new Date(booking.startDate);
//   const end = new Date(booking.endDate);
//   const msPerDay = 1000 * 3600 * 24;
//   const days = Math.round((end - start) / msPerDay); 
//   return days; 
// };
  useEffect(() => {
      const fetchAvailableRooms = async () => {
        if (!newBooking?.startDate || !newBooking?.endDate || !newBooking?.guestCount) {
          setErrorMessage("Missing parameters.");
          return;
        }
        try {
          const response = await fetch("http://localhost:3000/booking/check-availability", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              startDate: newBooking.startDate,
              endDate: newBooking.endDate,
              guestCount: newBooking.guestCount,
            }),
          });
          if (!response.ok) {
            throw new Error("Failed to fetch available rooms");
          }
          const data = await response.json();
          if (data.length > 0) {
            const sortedData = data.sort((a, b) => a.guests - b.guests);
            console.log("sortedData[0]",sortedData[0])
            setAvailableRooms(sortedData);
            if(sortedData.length>0){  setNewBooking((prev) => ({ ...prev, 
              houseType: sortedData[0].houseType,
              price: sortedData[0].pricePerNight,
              houseTitle: sortedData[0].title,
              totalPrice: calculateTotalPrice(prev, sortedData[0].pricePerNight),
              // totalDays:calculateTotalDays(prev)
            }));}
            setErrorMessage("");
            console.log("available houses", data)
          } else {
            setErrorMessage("No available rooms for the selected dates.");
          }
        } catch (error) {
          setErrorMessage("No available rooms for the selected dates.");
        }
      };
      fetchAvailableRooms();
    }, [newBooking.guestCount,newBooking.startDate,newBooking.endDate]); 

    const handleSelectHouse = (houseType, price, title) => {
      setNewBooking((prev) => ({ ...prev, 
                                  houseType: houseType,
                                  price: price,
                                  houseTitle: title,
                                  totalPrice: calculateTotalPrice(prev, price),
                                  // totalDays:calculateTotalDays(prev)
        }));
    };
    return (
    <>
      <div className="text-2xl py-2 text-gray-700 font-bold">
          Häuser
      </div>
      <h2 className="pb-1">Wählen Sie das perfekte Zimmer für Ihren Aufenthalt.</h2>
      {errorMessage !== "" ? <p className='text-red-500 text-sm'>{errorMessage}</p>
          : <p className="text-transparent text-sm">Placeholder</p>}
      {availableRooms.length > 0 ? (
      <ul className="flex flex-col gap-6 items-center pb-10">
          {availableRooms.map((room, index) => (
              // <li key={index} style={{ padding: "10px", border: "1px solid black", marginBottom: "5px",
              //     backgroundColor: newBooking.houseType === room.houseType ? "#cce5ff" : "white" }}>
              // <h3>{room.houseType}</h3>
              // <p>Available Rooms: {room.availableCount}</p>
              // <p>Price: {room.price}</p>
              // <button onClick={() => handleSelectHouse(room.houseType, room.price)}>
              //     {newBooking.houseType === room.houseType ? "Selected" : "Select"}
              // </button>
              // </li>
              <div key={index} >
              <ApartmentCard
                apartment={room} onClick={() => handleSelectHouse(room.houseType, room.pricePerNight, room.title)}  selected={newBooking.houseType === room.houseType}
              />
                <div className='flex items-center text-sm space-x-3'>
                  <p>noch <span className='text-base font-bold text-[#064236]'>{room.availableCount} </span>verfügbar</p>
                <button onClick={() => setSelectedApartment(room)} 
                className="px-2 py-2 rounded border border-gray-300 text-xs flex space-x-2 cursor-pointer hover:scale-120">
                  <p>More details </p></button>
                  <FaArrowTurnUp />
                </div>
              </div>

          ))}
      </ul>
      ) : (
      <p></p>
      )}
      {selectedApartment && (
        <ApartmentModal
          apartment={selectedApartment}
          onClose={() => setSelectedApartment(null)}
        />
      )}
    </>
    );
};