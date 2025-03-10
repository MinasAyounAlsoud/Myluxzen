import { useState, useEffect } from 'react';

export const HouseSelect = ({newBooking, setNewBooking,gotoNextStep,setStepCompleted,setGotoNextStep})=>{
  const [availableRooms, setAvailableRooms] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
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
            setAvailableRooms(data);
            setErrorMessage("");
            console.log(data)
          } else {
            setErrorMessage("No available rooms for the selected dates.");
          }
        } catch (error) {
          setErrorMessage("No available rooms for the selected dates.");
        }
      };
      fetchAvailableRooms();
    }, [newBooking]); 
    const handleSelectHouse = (houseType, price) => {
      setNewBooking((prev) => ({ ...prev, 
                                  houseType: houseType,
                                  price: price
        }));
    };
    return (
    <>
      <div class="text-2xl py-2 text-gray-700 font-bold">
          Häuser
      </div>
      <h2 class="pb-1">Wählen Sie das perfekte Zimmer für Ihren Aufenthalt.</h2>
      {errorMessage !== "" ? <p className='text-red-500 text-sm'>{errorMessage}</p>
          : <p className="text-transparent text-sm">Placeholder</p>}
      {availableRooms.length > 0 ? (
      <ul>
          {availableRooms.map((room, index) => (
              <li key={index} style={{ padding: "10px", border: "1px solid black", marginBottom: "5px",
                  backgroundColor: newBooking.houseType === room.houseType ? "#cce5ff" : "white" }}>
              <h3>{room.houseType}</h3>
              <p>Available Rooms: {room.availableCount}</p>
              <p>Price: {room.price}</p>
              <button onClick={() => handleSelectHouse(room.houseType, room.price)}>
                  {newBooking.houseType === room.houseType ? "Selected" : "Select"}
              </button>
              </li>
          ))}
      </ul>
      ) : (
      <p></p>
      )}
    </>
    );
};