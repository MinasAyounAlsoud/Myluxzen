import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
export function GuestPicker({ newBooking = {}, setNewBooking }) {
  const maxGuestsNumber = 6;

  // 初始化 guestCount，默认使用 newBooking.guestCount，如果没有，则默认为 1
  const [guestCount, setGuestCount] = useState(newBooking.guestCount || 1);

  // 监听 guestCount 变化，更新 newBooking
  useEffect(() => {
    if (guestCount !== newBooking.guestCount) {
      setNewBooking((prev) => ({
        ...prev,
        guestCount: guestCount,
      }));
    }
  }, [guestCount, newBooking.guestCount, setNewBooking]);

  // 增加人数
  const handleIncrease = () => {
    setGuestCount((prev) => Math.min(prev + 1, maxGuestsNumber));
  };

  // 减少人数
  const handleDecrease = () => {
    setGuestCount((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="bg-white w-full border rounded-lg shadow border-gray-300 ">

    <div className="guest-picker flex items-center items-center">
      <button
        onClick={handleDecrease}
        disabled={guestCount <= 1}
        className={`flex items-center text-2xl p-4 ${guestCount <= 1 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-200 hover:cursor-pointer'}`}
        // style={{ marginLeft: '-1rem', paddingLeft: '1rem' }}  // 确保按钮紧靠左边
      >
        <FaMinus />
      </button>
      <span className="guest-count text-gray-700 font-bold text-xl flex-auto text-center">
        {guestCount} {guestCount > 1 ? "Gäste" : "Gast"}
      </span>

      <button
        onClick={handleIncrease}
        disabled={guestCount >= maxGuestsNumber}
        className={`flex items-center text-2xl p-4 ${guestCount >= maxGuestsNumber ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-200 hover:cursor-pointer'}`}
        // style={{ marginRight: '-1rem', paddingRight: '1rem' }} 
      >
        <FaPlus />
      </button>
    </div>
    </div>

  );
}
