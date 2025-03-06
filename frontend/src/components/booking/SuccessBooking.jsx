import React, { useState, useEffect } from 'react';
import { Summery } from './Summery';

export const SuccessBooking = ({successBookingNumber})=>{
    console.log("SuccessBooking",successBookingNumber)
   const [bookingTicket, setBookingTicket] = useState({});
       const [errorMessage, setErrorMessage] = useState("");
   
    useEffect(() => {
        const fetchBookingTicket = async () => {
          if (successBookingNumber === "") {
            setErrorMessage("No such booking ticket.");
            return;
          }
    
          try {
            const response = await fetch(`http://localhost:3000/booking/${successBookingNumber}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
    
            if (!response.ok) {
              throw new Error("Failed to fetch this booking ticket");
            }
    
            const data = await response.json();
            console.log("received booking ticket" ,data);
                setBookingTicket(data);
                
              setErrorMessage("");
              console.log("received booking ticket" ,data);
          } catch (error) {
            console.error("Error fetching booking ticket:", error);
            setErrorMessage("An error occurred while fetching booking ticket.");
          }
        };
        
        fetchBookingTicket();
      }, [successBookingNumber]); // 依赖 newBooking，在组件加载时获取数据

    useEffect(()=>{
        console.log("bookingTicket",bookingTicket);
    },[bookingTicket]);
    return (
        <div className='flex flex-col items-center justify-center h-full pb-20'>
 
            <div className='w-2/3 py-4'>
            <Summery newBooking={bookingTicket} completed={true}></Summery>

            </div>
            <div className='w3/5 py-4 px-6 lg:px-20 text-gray-700'>
                <p>Vielen Dank für Ihre Buchung.</p><br></br>
                <p>Die Details Ihrer Bestellung werden an Ihre E-Mail-Adresse gesendet.</p><br></br>
                <p>Falls Sie bereits registriert und angemeldet sind, können Sie Ihre Bestellung in Ihrem Benutzerkonto auf unserer Webseite einsehen und bei Bedarf auch stornieren.</p><br></br>
                <p>Sollten Sie nicht angemeldet sein, können Sie direkt mit dem Verwaltungspersonal des Hotels in Kontakt treten, indem Sie uns unter der Telefonnummer ... anrufen oder eine E-Mail an ... senden.</p>
                <p>Wir freuen uns darauf, Sie bald willkommen zu heißen und stehen Ihnen jederzeit gerne zur Verfügung, um Ihren Aufenthalt so angenehm wie möglich zu gestalten.</p><br></br>
            </div>
            <button 
            className="bg-[#064236] text-white text-lg text-gray-600 py-4 px-16 cursor-pointer rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed">
                close
            </button>
        </div>
    );
};