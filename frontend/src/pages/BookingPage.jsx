import React, { useState, useEffect } from 'react';
import { DateSelect } from '../components/booking/DateSelect';
import { HouseSelect } from '../components/booking/HouseSelect';
import { Contact } from '../components/booking/Contact';
import { Payment } from '../components/booking/Payment';
import { ProcessBar } from '../components/booking/ProcessBar';
import { ButtonBar } from '../components/booking/ButtonBar';
import { SummeryBar } from '../components/booking/SummaryBar';
import { Summery } from '../components/booking/Summery';
import { SuccessBooking } from '../components/booking/SuccessBooking';

export const BookingPage = ()=>{
    const [gotoNextStep, setGotoNextStep] = useState(false);
    const [isStepCompleted, setStepCompleted] = useState(false);
    const [step, setStep] = useState(1);
    const loggedInUser = {
        email: "jane.doe@example.com",
        guestFirstName: "Jane",
        guestFamilyName: "Doe",
        mobileNumber: "",
      };
    const userNull = null;
    const user = loggedInUser;
    const initState = {
        guestFirstName : user !== null ?user.guestFirstName : "",
        guestFamilyName: user !== null ?user.guestFamilyName : "",
        email: user !== null ?user.email : "",
        guestCount: 1,
        startDate: "",
        endDate: "",
        houseType:"",
        price: "",
        mobileNumber: user !== null ?user.mobileNumber : "",
        comments:""
    };
    const [newBooking, setNewBooking] = useState(initState);
    const [successBookingNumber, setSuccessBookingNumber] = useState("");
    const totalSteps = 4;

    
    // useEffect(() => {
    //     if (user) {
    //         console.log("user",user)
    //       setNewBooking(prevBooking => ({
    //         ...prevBooking,
    //         email: user.email !== prevBooking.email ? user.email : prevBooking.email,
    //         guestFirstName: user.firstName !== prevBooking.guestFirstName ? user.firstName : prevBooking.guestFirstName,
    //         guestFamilyName: user.lastName !== prevBooking.guestFamilyName ? user.lastName : prevBooking.guestFamilyName,
    //         mobileNumber: user.phoneNumber !== prevBooking.mobileNumber ? user.phoneNumber : prevBooking.mobileNumber,
    //         comments: prevBooking.comments || ''  // 保留已有的comments或初始化为空
    //       }));
    //     }
    //   }, [user]);  // 依赖仅包括user
    useEffect(()=>{
        if(isStepCompleted===true){
            setStep(prev=>prev + 1);
            setStepCompleted(false);
        }
    },[isStepCompleted]);
    useEffect(()=>{
        console.log("newBooking changed", newBooking);
    },[newBooking]);
    // const setNextStep = ()=>{
    //     // this will trigger StepComponent to varify input data.
    //     setGotoNextStep(true);
    // };

    // const encodeEmailForOrder = (email) => {
    //     return btoa(email).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_'); // Base64 编码后清除结尾的=，并替换URL非法字符
    //   };
    
    //   const generateOrderNumber = (email) => {
    //     const dateStr = new Date().toISOString().replace(/[-T:.Z]/g, ''); // 生成基于ISO日期的字符串，无分隔符
    //     const encodedEmail = encodeEmailForOrder(email); // 对电子邮件地址进行Base64编码
    //     const randomNum = Math.floor(1000 + Math.random() * 9000); // 生成四位随机数
    //     return `ORD-${dateStr}-${encodedEmail}-${randomNum}`;
    //   };


    const setNextStep = async () => {
        console.log("step:", step);

        if (step < totalSteps) {
            setGotoNextStep(true); // 继续下一步
        } else {
            // 如果是最后一步，提交预订信息
            try {
    
                const response = await fetch("http://localhost:3000/create-booking", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        guestFirstName: newBooking.guestFirstName, // 这里可以修改，前端可以传真实姓名
                        guestFamilyName: newBooking.guestFamilyName,
                        guestCount: newBooking.guestCount,
                        startDate: newBooking.startDate,
                        endDate: newBooking.endDate,
                        houseType: newBooking.houseType,
                        status: "Active", // 预订创建时默认为 Active
                        bookingDay: new Date().toISOString(), // 预订日期设为当前日期
                        price: newBooking.price,
                        email:newBooking.email,
                        mobileNumber: newBooking.mobileNumber,
                        comments: newBooking.comments
                    }),
                });

                if (!response.ok) {
                    throw new Error("Failed to create booking");
                }
    
                const result = await response.json();
                console.log("Booking created successfully:", result);
                setSuccessBookingNumber(result.booking.bookingNumber);

                // alert("Booking created successfully!");
            } catch (error) {
                console.error("Error creating booking:", error);
                alert("Failed to create booking. Please try again.");
            }
        }
    };
    
    const setPrevStep = ()=>{
        setStepCompleted(false);
        setStep(prev=>prev - 1);
    };

    useEffect(()=>{
        console.log("successBookingNumber",successBookingNumber);
    },[successBookingNumber]);
    return (
        <>
        {successBookingNumber==="" ? (
        <div>
        {/* <div>Booking Page</div> */}
<ProcessBar        step={step} setStep={setStep}></ProcessBar>
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
        {/* <button onClick={setPrevStep} 
        disabled={step <= 1} >
            prev
        </button>
        <button onClick={setNextStep} 
        disabled={step > totalSteps} >
            next
        </button> */}

    </div>
</div>

<div className="fixed bottom-0 w-full bg-gray-100 shadow py-10 px-12 font-bold">
<div className="w-full block lg:hidden bg-gray-400">
    <SummeryBar  newBooking={newBooking} ></SummeryBar>
</div>

    <ButtonBar step={step} setPrevStep={setPrevStep} setNextStep={setNextStep}></ButtonBar>
</div>
</div>

        )
        : (
            <SuccessBooking successBookingNumber={successBookingNumber}></SuccessBooking>
        )}
        </>
    );
};