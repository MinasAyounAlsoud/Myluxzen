import { useState, useEffect } from 'react';
import { DateRangePicker } from './DateRangePicker';
import { GuestPicker } from './GuestPicker';

export const DateSelect = ({newBooking, setNewBooking,gotoNextStep,setStepCompleted,setGotoNextStep})=>{
    const [dateErrorMsg, setDateErrorMsg] = useState("");
    const [errStartDate, setErrStartDate] = useState(false);
    const [errEndDate, setEndStartDate] = useState(false);
    useEffect(()=>{
        if(gotoNextStep=== true){
            //varify if important information has been inputed
            if(newBooking.startDate === null || newBooking.endDate===null){
                setDateErrorMsg("Arrival and departure dates are required");
                setErrStartDate(newBooking.startDate===null);
                setEndStartDate(newBooking.endDate===null);
                setStepCompleted(false);
                setGotoNextStep(false);
            }else{
                setDateErrorMsg("");
                setErrStartDate(false);
                setEndStartDate(false);
                setStepCompleted(true);
                setGotoNextStep(false);
                console.log("go to next step")
            }
        }
    },[gotoNextStep]);
    return (
    <div>
        <div class="text-2xl py-2 text-gray-700 font-bold">
            Daten
        </div>
        <div className="w-full space-y-4">
            <DateRangePicker newBooking={newBooking} setNewBooking={setNewBooking} errStartDate={errStartDate} errEndDate={errEndDate}
            className="flex-1"></DateRangePicker >
            {dateErrorMsg !== "" ? <p className='text-red-500 text-sm'>{dateErrorMsg}</p>
            : <p className="text-transparent text-sm">Placeholder</p>}
            <GuestPicker newBooking={newBooking} setNewBooking={setNewBooking} className="flex-1"></GuestPicker>
        </div>
    </div>
    );
};