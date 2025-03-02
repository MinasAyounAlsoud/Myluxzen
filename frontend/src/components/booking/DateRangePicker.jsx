import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function DateRangePicker({ newBooking = {}, setNewBooking, errStartDate, errEndDate}) {
  // 解析日期（如果是空字符串或者 undefined，就设为 null）
  const parseDate = (date) => {
    return date && date !== "" ? new Date(date) : null;
  };

  // 初始化 state
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // 当 `newBooking` 发生变化时，更新 `startDate` 和 `endDate`
  useEffect(() => {
    setStartDate(parseDate(newBooking.startDate) || new Date());
    setEndDate(parseDate(newBooking.endDate));
  }, [newBooking.startDate, newBooking.endDate]); // 监听 newBooking 变化

  // 更新 `newBooking`，但只在 `startDate` 或 `endDate` 改变时执行
  useEffect(() => {
    setNewBooking((prev) => ({
      ...prev,
      startDate: startDate ? startDate.toISOString() : prev.startDate,
      endDate: endDate ? endDate.toISOString() : prev.endDate,
    // startDate: startDate ? startDate.toISOString() : "",
    // endDate: endDate ? endDate.toISOString() : "",

    }));
  }, [startDate, endDate, setNewBooking]);

  return (
    <div class="flex flex-col lg:flex-row w-full justify-start lg:justify-between  space-y-10 lg:space-y-0 lg:space-x-4 ">

      <div className={`bg-white p-1 border rounded-lg shadow px-4 py-1 lg:flex-1 ${errStartDate ? 'border-red-500' : 'border-gray-300'}`}>
      <p class="text-sm text-gray-500">Check-In</p>

          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            placeholderText="--"
            className="text-black fond-bold text-xl"
          />
      </div>
      <div className={`bg-white p-1 border rounded-lg shadow px-4 py-1 lg:flex-1 ${errEndDate ? 'border-red-500' : 'border-gray-300'}`}>
            <p class="text-sm text-gray-500">Check-out</p>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate ? new Date(startDate.getTime() + 24 * 60 * 60 * 1000) : new Date()}
            placeholderText="--"
            className="text-black fond-bold text-xl"
          />
      </div>
    </div>
  );
}
