import React, { useState, useEffect } from 'react';

export const Payment = ({newBooking, setNewBooking,gotoNextStep,setStepCompleted,setGotoNextStep})=>{
    useEffect(()=>{
        if(gotoNextStep=== true){
            //varify if important information has been inputed
            // if(newBooking.title === "" || newBooking.type===""){
            //     setStepCompleted(false);
            //     setGotoNextStep(false);
            // }else{
            //     setStepCompleted(true);
            //     setGotoNextStep(false);
            // }
            setStepCompleted(true);
            setGotoNextStep(false);
        }
    },[gotoNextStep]);


    return (
        <>
                <div>Payment</div>

        </>
    );
};