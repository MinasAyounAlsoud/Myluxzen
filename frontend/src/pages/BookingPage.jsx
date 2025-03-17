import { useState, useEffect, useContext } from 'react';
import { DateSelect } from '../components/booking/DateSelect';
import { HouseSelect } from '../components/booking/HouseSelect';
import { Contact } from '../components/booking/Contact';
import { Payment } from '../components/booking/Payment';
import { ProcessBar } from '../components/booking/ProcessBar';
import { ButtonBar } from '../components/booking/ButtonBar';
import { SummeryBar } from '../components/booking/SummaryBar';
import { Summery } from '../components/booking/Summery';
import { SuccessBooking } from '../components/booking/SuccessBooking';
import AuthContext from '../context/AuthContext';
import { BookingNavBar } from '../components/booking/BookingNavBar';

export const BookingPage = ()=>{
    const [gotoNextStep, setGotoNextStep] = useState(false);
    const [isStepCompleted, setStepCompleted] = useState(false);
    const [step, setStep] = useState(1);
    const [newBooking, setNewBooking] = useState({});
    const [successBookingNumber, setSuccessBookingNumber] = useState("");
    const totalSteps = 4;
    const {user} = useContext(AuthContext);
    useEffect(()=>{
        if(user !== null){
            const initState = {
                guestFirstName : user !== null ?user.vorname : "",
                guestFamilyName: user !== null ?user.nachname : "",
                email: user !== null ?user.email : "",
                guestCount: 1,
                startDate: null,
                endDate: null,
                houseType:"",
                price: "",
                mobileNumber: "",
                comments:"",
                houseNum: "",
                totalPrice: 0,
                totalDays:0
            };
            setNewBooking(initState);
        }else{
            const initState = {
                guestFirstName : "",
                guestFamilyName: "",
                email: "",
                guestCount: 1,
                startDate: null,
                endDate: null,
                houseType:"",
                price: "",
                mobileNumber: "",
                comments:"",
                houseNum: "",
                totalPrice: 0,
                totalDays:0
            };
            setNewBooking(initState);
        }
        console.log("useContext, user",user);
    },[user]);
    useEffect(()=>{
        if(isStepCompleted===true){
            setStep(prev=>prev + 1);
            setStepCompleted(false);
        }
    },[isStepCompleted]);
    useEffect(()=>{
        console.log("newBooking changed", newBooking);
    },[newBooking]);
    const setNextStep = async () => {
        if (step < totalSteps) {
            setGotoNextStep(true); 
        } else {//last step, send API and create booking ticket 
            try {
                const response = await fetch("http://localhost:3000/booking/create-booking", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        guestFirstName: newBooking.guestFirstName,                         guestFamilyName: newBooking.guestFamilyName,
                        guestCount: newBooking.guestCount,
                        startDate: newBooking.startDate,
                        endDate: newBooking.endDate,
                        houseType: newBooking.houseType,
                        status: "Active",
                        price: newBooking.price,
                        email:newBooking.email,
                        mobileNumber: newBooking.mobileNumber,
                        comments: newBooking.comments,
                        houseNum: "",
                        totalPrice: newBooking.totalPrice,
                        totalDays:newBooking.totalDays
                    }),
                });
                if (!response.ok) {
                    throw new Error("Failed to create booking");
                }
                const result = await response.json();
                console.log("Booking created successfully:", result);
                setSuccessBookingNumber(result.booking.bookingNumber);
            } catch (error) {
                console.error("Error creating booking:", error);
            }
        }
    };
    const setPrevStep = ()=>{
        setStepCompleted(false);
        setStep(prev=>prev - 1);
    };
    return (
    <div>
        <BookingNavBar></BookingNavBar>
        {successBookingNumber==="" ? (
        <div>
            <div   className='pb-10 lg:px-20'>
                <ProcessBar step={step} setStep={setStep}></ProcessBar>
                <div  className="py-10 px-12 overflow-auto">
                    <div onClick={e => e.stopPropagation()}
                        className="flex lg:flex-row w-full lg:space-x-30 min-h-screen">
                        <div className="lg:w-3/5 w-full">
                            {step === 1 && <DateSelect gotoNextStep={gotoNextStep} setStepCompleted={setStepCompleted} setGotoNextStep={setGotoNextStep} newBooking={newBooking} setNewBooking={setNewBooking}></DateSelect >}
                            {step === 2 && <HouseSelect gotoNextStep={gotoNextStep} setStepCompleted={setStepCompleted} setGotoNextStep={setGotoNextStep} newBooking={newBooking} setNewBooking={setNewBooking}></HouseSelect>}
                            {step === 3 && <Contact gotoNextStep={gotoNextStep} setStepCompleted={setStepCompleted} setGotoNextStep={setGotoNextStep} newBooking={newBooking} setNewBooking={setNewBooking}></Contact>}
                            {step === 4 && <Payment gotoNextStep={gotoNextStep} setStepCompleted={setStepCompleted} setGotoNextStep={setGotoNextStep} newBooking={newBooking} setNewBooking={setNewBooking}></Payment>}
                        </div>
                        <div className="hidden lg:block w-full lg:w-2/5 ">
                            <Summery newBooking={newBooking} completed={false}></Summery>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed bottom-14 w-full block lg:hidden py-1">
                <SummeryBar  newBooking={newBooking} ></SummeryBar>
            </div>
            <div className="fixed bottom-0 w-full bg-gray-100 shadow pb-4 lg:py-4 px-4 space-y-2">
            <ButtonBar step={step} setPrevStep={setPrevStep} setNextStep={setNextStep}></ButtonBar>
            </div>
        </div>
        )
        : (
        <SuccessBooking successBookingNumber={successBookingNumber}></SuccessBooking>
        )}
    </div>
    );
};