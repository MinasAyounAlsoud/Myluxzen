import { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export function DateRangePicker({ newBooking, setNewBooking, errStartDate, errEndDate }) {
  const parseDate = (date) => {
    return date && date !== "" ? new Date(date) : null;
  };
  const calculateTotalDays = (booking) => {
    if (booking.startDate===null || booking.endDate===null) return 0;
    const start = new Date(booking.startDate);
    const end = new Date(booking.endDate);
    const msPerDay = 1000 * 3600 * 24;
    const days = Math.round((end - start) / msPerDay); 
    return days; 
  };
  const handleStartDateChange = (date) => {    
    if (date) {
      date.setHours(14, 0, 0, 0);  // Set time to 14:00:00
    }
    setNewBooking(prev => {
      const newBooking = {
        ...prev,
        startDate: date ? date.toISOString() : null
      };
      return {
        ...newBooking,
        totalDays: calculateTotalDays(newBooking) 

      };
    });
  };
  useEffect(()=>{
    if(newBooking.startDate > newBooking.endDate)
    setNewBooking(prev => ({
      ...prev,
      endDate: null,
      totalDays : 0
    }));
  },[newBooking.startDate])
  const handleEndDateChange = (date) => {
    if (date) {
      date.setHours(11, 0, 0, 0);  // Set time to 11:00:00
    }
    setNewBooking(prev => {
      const newBooking = {
        ...prev,
        endDate: date ? date.toISOString() : null
      };
      return {
        ...newBooking,
        totalDays: calculateTotalDays(newBooking)
      };
    });
  };
  return (
    <div className="flex flex-col lg:flex-row w-full justify-start lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
      <div className={`bg-white p-1 border rounded-lg shadow px-4 py-1 lg:flex-1 ${errStartDate ? 'border-red-500' : 'border-gray-300'}`}>
        <p className="text-sm text-gray-500">Check-In</p>
        <DatePicker
          selected={parseDate(newBooking.startDate)}
          onChange={handleStartDateChange}
          selectsStart
          startDate={parseDate(newBooking.startDate) || new Date()}
          endDate={parseDate(newBooking.endDate)}
          minDate={new Date()}
          // maxDate={parseDate(newBooking.endDate)}
          placeholderText="--"
          className="text-black font-bold text-xl"
          calendarClassName="datePickerCalendar"
        />
      </div>
      <div className={`bg-white p-1 border rounded-lg shadow px-4 py-1 lg:flex-1 ${errEndDate ? 'border-red-500' : 'border-gray-300'}`}>
        <p className="text-sm text-gray-500">Check-out</p>
        <DatePicker
          selected={parseDate(newBooking.endDate)}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={parseDate(newBooking.startDate)}
          endDate={parseDate(newBooking.endDate)}
          minDate={newBooking.startDate ? new Date(newBooking.startDate) : new Date()}
          placeholderText="--"
          className="text-black font-bold text-xl"
          calendarClassName="datePickerCalendar"
        />
      </div>
    </div>
  );
}
