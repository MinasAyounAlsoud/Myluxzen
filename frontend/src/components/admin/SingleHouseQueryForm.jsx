import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
export function SingleHouseQueryForm({ handleSearch }) { 
    const [formData, setFormData] = useState({
        houseType: '',
        adminReservedInuse: '',
        guestReserved: "",
        houseNum: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch(formData); 
    };
    useEffect(()=>{
        console.log("SingleHouseQueryForm",formData)
    },[formData]);
    return (
        <form onSubmit={handleSubmit} className="space-y-4 px-10 py-2 lg:w-4/5 mx-auto my-10 px-10">
            <div>
                <label className="block text-sm font-medium text-gray-700">Haus Type:</label>
                <select name="houseType" value={formData.houseType} onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                    <option value=""></option>
                    <option value="HouseType1">HouseType1</option>
                    <option value="HouseType2">HouseType2</option>
                    <option value="HouseType3">HouseType3</option>
                    <option value="HouseType4">HouseType4</option>
                    <option value="HouseType5">HouseType5</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Admin Reseviert:</label>
                <div className='flex space-x-4'>
                    <label>
                        <input
                            type="radio"
                            name="adminReservedInuse"
                            value="true"
                            checked={formData.adminReservedInuse === 'true'}
                            onChange={handleChange}
                        /> Ja
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="adminReservedInuse"
                            value="false"
                            checked={formData.adminReservedInuse === 'false'}
                            onChange={handleChange}
                        /> Nein
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="adminReservedInuse"
                            value=""
                            checked={formData.adminReservedInuse === ''}
                            onChange={handleChange}
                        /> Alle
                    </label>
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Gäste Reseviert:</label>
                <div className='flex space-x-4'>
                    <label>
                        <input
                            type="radio"
                            name="guestReserved"
                            value="true"
                            checked={formData.guestReserved === 'true'}
                            onChange={handleChange}
                        /> Ja
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="guestReserved"
                            value="false"
                            checked={formData.guestReserved === 'false'}
                            onChange={handleChange}
                        /> Nein
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="guestReserved"
                            value=""
                            checked={formData.guestReserved === ''}
                            onChange={handleChange}
                        /> Alle
                    </label>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Haus Nummer:</label>
                <input
                    type="text"
                    name="houseNum"
                    value={formData.houseNum}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <button type="submit" 
            className='bg-gray-800 text-white px-4 py-1 rounded-sm cursor-pointer hover:text-[#FAE1A8]'>Suchen</button>
        </form>
    );   
}