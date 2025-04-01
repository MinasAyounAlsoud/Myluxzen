import { useState, useEffect } from 'react';

export const SingleHousesList = ({houses,setNewBooking,newBooking})=>{
    const [selectedHouseNum, setSelectedHouseNum] = useState(newBooking.houseNum); 
    console.log("SingleHousesList,houses",houses)
    const handleSelectChange = (event) => {
        const houseNum = event.target.value;
        setSelectedHouseNum(houseNum);
        setNewBooking(prev => ({
            ...prev,
            houseNum: houseNum
        }));
    };
        return (
        <div>
            <div className="text-gray-500 border-t border-gray-100 my-4 w-full cursor-pointer "></div>
            <div className='flex'>
                {/* {
                    houses.map((house)=>(
                        <li key={house.houseNum}
                            onClick={()=>handleSelectSingleHouse(house.houseNum)}
                            className={`px-1 rounded cursor-pointer hover:scale-120 ${house.houseNum === selectedHouseNum ? 'bg-[#116769] text-white' : 'bg-gray-300'}`}>
                            <p>{house.houseNum}</p>
                        </li>
                    ))
                } */}
                <select
                value={selectedHouseNum}
                onChange={handleSelectChange}
                className="bg-white text-gray-600 border border-[#116769] rounded-lg cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out w-60 p-2 text-gray-600"
                    >
                <option value="" >Bitte Haus Auswahlen</option>
                {houses.map((house) => (
                    <option key={house.houseNum} value={house.houseNum}>
                        {house.houseNum}
                    </option>
                ))}
                </select>
            </div>
            </div>
    );
}