import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
export function QueryForm({ handleSearch }) { 
    const [formData, setFormData] = useState({
        bookingNum: "",
        email: '',
        guestFirstName: '',
        guestFamilyName: '',
        queryStartDate: '',
        queryEndDate: ''
    });
    useEffect(()=>{
        console.log("query form data", formData)
    },[formData]);
    const parseDate = (date) => {
        return date && date !== "" ? new Date(date) : "";
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleStartDateChange = (date) => {
        setFormData(prev => ({
            ...prev,
            queryStartDate: date === null ? "": date
        }));
    };
    const handleEndDateChange = (date) => {
        setFormData(prev => ({
            ...prev,
            queryEndDate: date === null ? "": date 
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch(formData); 
    };
    return (
    <form onSubmit={handleSubmit} className="space-y-4 px-10 py-2 lg:w-3/5 mx-auto my-10 px-10">
        <div>
            <label className="block text-sm font-medium text-gray-700">Buchung Nummer:</label>
            <input
                type="text"
                name="bookingNum"
                value={formData.bookingNum}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
        </div>
        <div className="flex justify-between space-x-4">
            <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">Vorname:</label>
                <input
                    type="text"
                    name="guestFirstName"
                    value= {formData.guestFirstName}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">Nachname:</label>
                <input
                    type="text"
                    name="guestFamilyName"
                    value={formData.guestFamilyName}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
        </div>
            <div className="flex flex-col lg:flex-row w-full justify-start lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
                <div className={`bg-white p-1 border rounded-lg shadow px-4 py-1 lg:flex-1 `}>
                <p className="text-sm text-gray-500">Startdatum</p>
                <DatePicker
                    selected={formData.queryStartDate}
                    onChange={handleStartDateChange}
                    maxDate={formData.queryEndDate} 
                    selectsStart
                //   startDate={parseDate(newBooking.startDate) || new Date()}
                //   endDate={parseDate(newBooking.endDate)}
                //   minDate={new Date()}
                    placeholderText="--"
                    className="text-black font-bold text-xl"
                    calendarClassName="datePickerCalendar"
                />
                </div>
                <div className={`bg-white p-1 border rounded-lg shadow px-4 py-1 lg:flex-1 `}>
                <p className="text-sm text-gray-500">Enddatum</p>
                <DatePicker
                    selected={formData.queryEndDate}
                    onChange={handleEndDateChange}
                    selectsEnd
                    startDate={formData.queryStartDate}
                //   endDate={parseDate(newBooking.endDate)}
                    minDate={formData.queryStartDate}
                    placeholderText="--"
                    className="text-black font-bold text-xl"
                    calendarClassName="datePickerCalendar"
                />
                </div>
            </div>
        <button type="submit" className='bg-gray-800 text-white px-4 py-1 rounded-sm cursor-pointer hover:text-[#FAE1A8]'>Suchen</button>
    </form>
    );
}