import React, { useState, useEffect } from 'react';

export const HouseSelect = ({newBooking, setNewBooking,gotoNextStep,setStepCompleted,setGotoNextStep})=>{
    const [availableRooms, setAvailableRooms] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    
    // const startDate = newBooking.startDate;
    // const endDate = newBooking.endDate;
    // const guestCount = newBooking.guestCount;
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
            // setStepCompleted(true);
            // setGotoNextStep(false);
            // console.log("go to next step")

        }
    },[gotoNextStep]);
    useEffect(() => {
        const fetchAvailableRooms = async () => {
          if (!newBooking?.startDate || !newBooking?.endDate || !newBooking?.guestCount) {
            setErrorMessage("Missing parameters.");
            return;
          }
    
          try {
            const response = await fetch("http://localhost:3000/check-availability", {
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
            // console.error("Error fetching available rooms:", error);
            // setErrorMessage("An error occurred while fetching available rooms.");
            setErrorMessage("No available rooms for the selected dates.");

          }
        };
        
        fetchAvailableRooms();
      }, [newBooking]); // 依赖 newBooking，在组件加载时获取数据
      const handleSelectHouse = (houseType, price) => {
        setNewBooking((prev) => ({ ...prev, 
                                    houseType: houseType,
                                    price: price

         }));
      };
    return (
        <>
                <div class="text-2xl py-2 text-gray-700 font-bold">
                    Houses
                    </div>
                <h2 class="pb-1">Select the perfect room for your stay.</h2>
                {/* {errorMessage && <p className='text-red-500 text-sm'>{errorMessage}</p>} */}

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