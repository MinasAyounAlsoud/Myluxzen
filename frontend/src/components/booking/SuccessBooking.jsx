import React, { useState, useEffect } from 'react';
import { Summery } from './Summery';
import { useNavigate } from 'react-router-dom';
import { convertUtcToLocal } from '../../utils/commenBookFunc';

export const SuccessBooking = ({successBookingNumber})=>{
  console.log("SuccessBooking",successBookingNumber)
  const [bookingTicket, setBookingTicket] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
      const fetchBookingTicket = async () => {
        if (successBookingNumber === "") {
          setErrorMessage("No such booking ticket.");
          return;
        }
        try {
          const response = await fetch(`http://localhost:3000/booking/bybookingnum/${successBookingNumber}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            throw new Error("Failed to fetch this booking ticket");
          }
          const booking = await response.json();
          // console.log("received booking ticket" ,data);
          //add convert UTC(from server) to local
          booking.startDate = convertUtcToLocal(booking.startDate);
          booking.endDate = convertUtcToLocal(booking.endDate);
          setBookingTicket(booking);
          setErrorMessage("");
            // console.log("received booking ticket" ,data);
        } catch (error) {
          console.error("Error fetching booking ticket:", error);
          setErrorMessage("An error occurred while fetching booking ticket.");
        }
      };
      fetchBookingTicket();
    }, [successBookingNumber]); 
    // useEffect(()=>{
    //     console.log("bookingTicket",bookingTicket);
    // },[bookingTicket]);
    const handleClose=()=>{
      navigate("/");
    }
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
        <button onClick={handleClose}
        className="bg-[#116769] text-[#FAE1A8] text-lg py-2 px-10 cursor-pointKer rounded-md hover:text-white">
            schließen
        </button>
    </div>
    );
};