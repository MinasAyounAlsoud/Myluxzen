import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';

export const Contact = ({newBooking, setNewBooking,gotoNextStep,setStepCompleted,setGotoNextStep})=>{
    const loggedInUser = {
        email: "jane.doe@example.com",
        firstName: "Jane",
        lastName: "Doe",
        phoneNumber: "123-456-7890",
        comments:""
      };
    const userNull = null;
    const [errorMessage, setErrorMessage] = useState({
        email: "",
        firstName: "",
        lastName:""
    });
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
        <div>
                <div class="text-2xl py-2 text-gray-700 font-bold">
                    Your contact details
                </div>

                <ContactForm user={loggedInUser} newBooking={newBooking} setNewBooking={setNewBooking}></ContactForm>

        </div>
    );
};